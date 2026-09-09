#!/usr/bin/env node
/**
 * codetop 每日题单生成器
 *
 * 数据源：codetop.cc 前端岗（job=4）题库，按 frequency 降序
 * 组成：2 道高频新题 + 2 道复盘题（从 vault 已刷笔记中按轮换池抽取）
 *
 * 用法：
 *   node scripts/codetop-daily.mjs              # 生成今日题单（读本地缓存 codetop-data.json）
 *   node scripts/codetop-daily.mjs --refresh    # 先拉全量最新数据再生成（频率是月级指标，偶尔跑即可）
 *   node scripts/codetop-daily.mjs --dry-run    # 只打印，不写文件
 *   node scripts/codetop-daily.mjs --date 2026-09-10
 *
 * codetop 全量数据缓存在 scripts/codetop-data.json（进 git）；只有 --refresh 需要有效 Token，
 * 日常生成完全离线，不存在 Token 过期问题。Token 过期时：改这里或 export CODETOP_TOKEN=xxx
 */
import fs from 'node:fs'
import path from 'node:path'

// ---------- 配置 ----------
const TOKEN = process.env.CODETOP_TOKEN || '622884e05ac11f093862149935b67483c037f314'
const API = 'https://codetop.cc/api/questions/'
const HEADERS = {
  Accept: 'application/json',
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36',
  authorization: `Token ${TOKEN}`,
}
const NEW_COUNT = 2   // 每日新题数
const REVIEW_COUNT = 2 // 每日复盘数
const NEW_FROM = 1     // 新题从频率榜第几名开始
const NEW_RANGE = 30   // 候选窗口（前 30 名内轮换）

// 相对仓库根目录
const ROOT = path.resolve(import.meta.dirname, '..')
const SERIES = ['GRD', 'LeetCode Hot100', '经典 150', '算法基础'].map((d) =>
  path.join(ROOT, 'content', 'JavaScript 算法', d),
)
const OUT_DIR = path.join(ROOT, 'content', 'JavaScript 算法', '每日题单')
const STATE_FILE = path.join(ROOT, 'scripts', '.codetop-state.json')
const DATA_FILE = path.join(ROOT, 'scripts', 'codetop-data.json')

// ---------- 参数解析 ----------
const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const refresh = args.includes('--refresh')
const dateIdx = args.indexOf('--date')
const date = dateIdx > -1 ? args[dateIdx + 1] : new Date().toISOString().slice(0, 10)

// ---------- 工具 ----------
const read = (p) => fs.readFileSync(p, 'utf8')
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** 拉取 codetop 前端岗题库（按频率降序，job=4），返回扁平列表 */
async function fetchCodetop() {
  const all = []
  for (let page = 1; ; page++) {
    const url = `${API}?job=4&page=${page}&search=&ordering=-frequency`
    const res = await fetch(url, { headers: HEADERS })
    if (!res.ok) throw new Error(`codetop API ${res.status} ${res.statusText}（Token 可能过期）`)
    const data = await res.json()
    all.push(...data.list)
    if (all.length >= data.count || data.list.length === 0) break
    await sleep(500) // 限速，别打太快
  }
  return all
}

/** 扫描 vault 各系列笔记，提取做过的题号集合 + 每题所在文件（复盘池） */
function scanVault() {
  const done = new Set()
  const pool = [] // [{ id, title, file }]
  const linkRe = /\[(\d+)\.\s*([^\]]+)\]\((https:\/\/leetcode\.cn\/problems\/[^)]+)\)/g
  for (const dir of SERIES) {
    if (!fs.existsSync(dir)) continue
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith('.md') || f.startsWith('LeetCode Hot100.md')) continue // 汇总页是正文副本，不算独立来源
      const fp = path.join(dir, f)
      const text = read(fp)
      for (const m of text.matchAll(linkRe)) {
        const id = m[1]
        if (!done.has(id)) done.add(id)
        pool.push({ id, title: m[2].trim(), url: m[3], file: path.basename(f, '.md') })
      }
    }
  }
  return { done, pool }
}

/** 拉取全量后精简成 {id,title,level,freq,slug} 列表，写入缓存文件（dry-run 时跳过写入） */
async function refreshCache() {
  const all = await fetchCodetop()
  const questions = all.map((q) => ({
    id: String(q.leetcode.frontend_question_id),
    title: q.leetcode.title,
    level: q.leetcode.level,
    freq: q.value,
    slug: q.leetcode.slug_title,
  }))
  if (!dryRun) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ fetchedAt: new Date().toISOString(), questions }, null, 2))
  }
  return questions
}

/** 读本地缓存；无缓存/空数据返回 null */
function loadCache() {
  try {
    const d = JSON.parse(read(DATA_FILE))
    return d.questions?.length ? d : null
  } catch {
    return null
  }
}

/** 读轮换状态（无状态文件则初始化） */
function loadState() {
  try {
    return JSON.parse(read(STATE_FILE))
  } catch {
    return { newCursor: 0, reviewIdx: 0, history: [] }
  }
}
const saveState = (s) => fs.writeFileSync(STATE_FILE, JSON.stringify(s, null, 2))

const levelName = (l) => ({ 1: '简单', 2: '中等', 3: '困难' })[l] ?? l

// ---------- 主流程：codetop 数据走本地缓存，日常运行完全离线 ----------
let questions
if (refresh) {
  questions = await refreshCache()
  console.log(`🔄 已刷新 codetop 缓存：${questions.length} 题 → scripts/codetop-data.json`)
} else {
  const cache = loadCache()
  if (cache) {
    questions = cache.questions
    console.log(`📦 使用本地缓存（${cache.fetchedAt.slice(0, 10)} 拉取，${questions.length} 题；想更新跑 --refresh）`)
  } else {
    console.log('缓存不存在，自动拉取一次全量数据…')
    questions = await refreshCache()
  }
}
const byId = new Map(questions.map((q) => [q.id, q]))
const { done, pool } = scanVault()
const state = loadState()

// --- 幂等：同一天重跑复用已选题，游标不重复推进 ---
const lastToday = state.history.find((h) => h.date === date)
let newQuestions, reviewQuestions
if (lastToday) {
  newQuestions = lastToday.new.map((id) => byId.get(id)).filter(Boolean)
  reviewQuestions = lastToday.review.map((id) => pool.find((p) => p.id === id)).filter(Boolean)
} else {
  // 新题：频率窗口内轮换（不过滤已做，每题标注刷过与否）
  const window = questions.slice(NEW_FROM - 1, NEW_FROM - 1 + NEW_RANGE)
  newQuestions = []
  for (let i = 0; i < NEW_COUNT; i++) {
    newQuestions.push(window[(state.newCursor + i) % window.length])
  }
  state.newCursor = (state.newCursor + NEW_COUNT) % window.length

  // 复盘题：从 vault 复盘池轮换，缺的补到 pool 尾部（复用 codetop 标题）
  const missing = [...done].filter((id) => !pool.some((p) => p.id === id))
  for (const id of missing) {
    const q = byId.get(id)
    if (q) pool.push({ id, title: q.title, url: `https://leetcode.cn/problems/${q.slug}/`, file: '（vault 笔记待补）' })
  }
  reviewQuestions = []
  for (let i = 0; i < Math.min(REVIEW_COUNT, pool.length); i++) {
    reviewQuestions.push(pool[(state.reviewIdx + i) % pool.length])
  }
  state.reviewIdx = pool.length ? (state.reviewIdx + REVIEW_COUNT) % pool.length : 0
}

// --- 生成笔记 ---
const fmtNew = (q) => {
  const mark = done.has(q.id) ? '🔁（已刷过，重做）' : '🆕'
  return `| [${q.id}. ${q.title}](https://leetcode.cn/problems/${q.slug}/) | ${levelName(q.level)} | ${q.freq} | ${mark} |`
}
const fmtReview = (r) => {
  const q = byId.get(r.id)
  const lv = q ? levelName(q.level) : '—'
  const freq = q ? q.freq : '—'
  return `| [${r.title}](${r.url}) | ${lv} | ${freq} | 复盘 · 出处：[[${r.file}]] |`
}

const note = `---
title: 每日题单 - ${date}
tags:
  - LeetCode
  - 每日题单
description: codetop 前端岗频率榜驱动：${NEW_COUNT} 新题 + ${REVIEW_COUNT} 复盘
aliases:
  - 题单${date}
---

# 每日题单 · ${date}

> [!tip] 用法
> 每题先自己写 25 分钟（时间盒），卡住就找我要档位提示；做完把 [x] 勾上。
> 复盘题不写新笔记，直接在原文出处下方追加「二刷日期 + 一句话卡点」。

## 🆕 新题（codetop 前端岗频率榜）

| 题目 | 难度 | 频率 | 状态 |
| --- | --- | --- | --- |
${newQuestions.map(fmtNew).join('\n')}

## 🔁 复盘（vault 轮换池）

| 题目 | 难度 | 频率 | 备注 |
| --- | --- | --- | --- |
${reviewQuestions.map(fmtReview).join('\n')}

## 完成打卡

- [ ] 新题 1
- [ ] 新题 2
- [ ] 复盘 1
- [ ] 复盘 2
`

// --- 输出 ---
const outPath = path.join(OUT_DIR, `每日题单 ${date}.md`)
const pickId = (q) => q.id
console.log(`✅ 新题: ${newQuestions.map((q) => `${q.id}.${q.title}${done.has(q.id) ? '(重做)' : ''}`).join(' / ')}`)
console.log(`🔁 复盘: ${reviewQuestions.map((r) => `${r.title} ← ${r.file}`).join(' / ')}`)

if (dryRun) {
  console.log('（dry-run，未写入）')
} else {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  fs.writeFileSync(outPath, note)
  if (!lastToday) {
    state.history.push({ date, new: newQuestions.map(pickId), review: reviewQuestions.map((r) => r.id) })
  }
  if (state.history.length > 90) state.history = state.history.slice(-90)
  saveState(state)
  console.log(`📝 已写入: ${path.relative(ROOT, outPath)}`)
}
