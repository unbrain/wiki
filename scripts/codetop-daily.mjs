#!/usr/bin/env node
/**
 * codetop 每日题单生成器
 *
 * 数据源：codetop.cc 前端岗（job=4）题库，按 frequency 降序
 * 组成：2 道高频新题 + 2 道复盘题（从 vault 已刷笔记中按轮换池抽取）
 *
 * 用法：
 *   node scripts/codetop-daily.mjs                 # 生成今日题单 + 刷新总览页（读本地缓存 codetop-data.json）
 *   node scripts/codetop-daily.mjs --overview-only # 仅刷新 每日题单总览.md（不生成新题单、不推进游标）
 *   node scripts/codetop-daily.mjs --refresh       # 先拉全量最新数据再生成（频率是月级指标，偶尔跑即可）
 *   node scripts/codetop-daily.mjs --dry-run       # 只打印，不写文件
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
const OVERVIEW_PATH = path.join(OUT_DIR, '每日题单总览.md')
const STATE_FILE = path.join(ROOT, 'scripts', '.codetop-state.json')
const DATA_FILE = path.join(ROOT, 'scripts', 'codetop-data.json')

// Algo Lab（byte-sized-algorithms.vercel.app）机制动画映射：题号 -> [lessonId, 中文标签]
const ALGO_LAB_BASE = 'https://byte-sized-algorithms.vercel.app/#/'
const ALGO_LAB_BY_ID = {
  1: ['hash-tables', '哈希表'],
  2: ['linked-lists', '单链表'],
  3: ['sliding-window', '滑动窗口'],
  5: ['two-pointers', '双指针'],
  11: ['two-pointers', '双指针'],
  15: ['two-pointers', '双指针'],
  17: ['subsets', '回溯决策树'],
  19: ['fast-slow', '快慢指针'],
  20: ['balanced-brackets', '括号匹配'],
  21: ['merge-sorted-lists', '合并有序链表'],
  22: ['permutations', '回溯生成'],
  23: ['priority-queues', '优先队列 / 堆'],
  25: ['reversing-a-list', '反转链表'],
  26: ['two-pointers', '双指针'],
  27: ['two-pointers', '双指针'],
  28: ['kmp', 'KMP 匹配'],
  33: ['binary-search', '二分查找'],
  34: ['binary-search', '二分查找'],
  35: ['binary-search', '二分查找'],
  39: ['subsets', '回溯组合'],
  42: ['monotonic-stack', '单调栈'],
  45: ['interval-scheduling', '区间贪心'],
  46: ['permutations', '全排列回溯'],
  48: ['matrices', '二维矩阵'],
  49: ['hash-tables', '哈希分组'],
  53: ['maximum-subarray', '最大子数组和'],
  54: ['matrices', '二维矩阵'],
  55: ['interval-scheduling', '贪心'],
  56: ['merge-intervals', '合并区间'],
  57: ['merge-intervals', '合并区间'],
  62: ['grid-paths', '网格路径 DP'],
  63: ['grid-paths', '网格路径 DP'],
  64: ['grid-paths', '网格路径 DP'],
  70: ['memoization', '记忆化 / 递推'],
  71: ['stacks', '栈'],
  72: ['edit-distance', '编辑距离'],
  73: ['matrices', '二维矩阵'],
  74: ['binary-search', '二分查找'],
  75: ['two-pointers', '双指针分区'],
  76: ['sliding-window', '滑动窗口'],
  77: ['subsets', '回溯组合'],
  78: ['subsets', '子集回溯'],
  79: ['maze', '网格回溯'],
  82: ['linked-lists', '链表'],
  83: ['linked-lists', '链表'],
  84: ['monotonic-stack', '单调栈'],
  88: ['two-pointers', '双指针'],
  92: ['reversing-a-list', '反转链表'],
  93: ['subsets', '回溯分割'],
  94: ['tree-traversals', '树遍历'],
  98: ['binary-search-trees', '二叉搜索树'],
  100: ['binary-trees', '二叉树'],
  101: ['binary-trees', '二叉树'],
  102: ['tree-traversals', '层序遍历'],
  103: ['tree-traversals', '层序遍历'],
  104: ['binary-trees', '二叉树'],
  105: ['tree-traversals', '树遍历构造'],
  108: ['binary-search-trees', '二叉搜索树'],
  110: ['balanced-trees', '平衡二叉树'],
  111: ['breadth-first-search', 'BFS 最短深度'],
  112: ['depth-first-search', 'DFS 路径'],
  114: ['tree-traversals', '树遍历'],
  121: ['maximum-subarray', '一次遍历 / 状态'],
  124: ['tree-traversals', '树形递归'],
  125: ['two-pointers', '对撞双指针'],
  128: ['sets-and-maps', '集合与映射'],
  129: ['depth-first-search', 'DFS 路径'],
  136: ['bit-tricks', '位运算异或'],
  139: ['tabulation', '制表法 DP'],
  141: ['fast-slow', '快慢指针判环'],
  142: ['fast-slow', '快慢指针找环'],
  146: ['lru-cache', 'LRU 缓存'],
  148: ['merge-sort', '归并排序'],
  150: ['stacks', '栈求值'],
  153: ['binary-search', '二分查找'],
  155: ['stacks', '栈'],
  160: ['two-pointers', '双指针'],
  162: ['binary-search', '二分查找'],
  167: ['two-pointers', '对撞双指针'],
  169: ['hash-tables', '哈希计数'],
  189: ['arrays', '数组'],
  190: ['bits-and-masks', '位与掩码'],
  191: ['bit-tricks', '位运算技巧'],
  198: ['tabulation', '制表法 DP'],
  199: ['tree-traversals', '层序遍历'],
  200: ['breadth-first-search', 'BFS / 连通块'],
  206: ['reversing-a-list', '反转链表'],
  207: ['topological-sort', '拓扑排序'],
  208: ['tries', '前缀树'],
  209: ['sliding-window', '滑动窗口'],
  215: ['quickselect', '快速选择'],
  217: ['sets-and-maps', '集合去重'],
  219: ['sliding-window', '滑动窗口 + 哈希'],
  221: ['grid-paths', '二维 DP'],
  224: ['stacks', '栈'],
  226: ['binary-trees', '二叉树'],
  230: ['binary-search-trees', '二叉搜索树'],
  232: ['queues', '栈与队列'],
  234: ['fast-slow', '快慢指针 + 反转'],
  235: ['lowest-common-ancestor', '最近公共祖先'],
  236: ['lowest-common-ancestor', '最近公共祖先'],
  238: ['prefix-sums', '前缀积思想'],
  239: ['monotonic-queue', '单调队列'],
  240: ['binary-search', '二分 / 矩阵搜索'],
  242: ['hash-tables', '哈希计数'],
  279: ['coin-change', '完全背包 DP'],
  283: ['two-pointers', '双指针'],
  287: ['fast-slow', '快慢指针'],
  295: ['median-of-a-stream', '数据流中位数'],
  297: ['tree-traversals', '树序列化'],
  300: ['longest-increasing-subsequence', '最长递增子序列'],
  322: ['coin-change', '零钱兑换 DP'],
  347: ['top-k', 'Top-K 堆'],
  349: ['sets-and-maps', '集合交集'],
  374: ['binary-search', '二分查找'],
  392: ['two-pointers', '双指针'],
  394: ['stacks', '栈解码'],
  409: ['hash-tables', '哈希计数'],
  416: ['knapsack', '0-1 背包 DP'],
  437: ['prefix-sums', '前缀和 + DFS'],
  438: ['sliding-window', '滑动窗口'],
  452: ['interval-scheduling', '区间贪心'],
  455: ['interval-scheduling', '贪心'],
  461: ['bit-tricks', '位运算'],
  494: ['knapsack', '背包 DP'],
  530: ['binary-search-trees', '二叉搜索树'],
  543: ['binary-trees', '二叉树'],
  560: ['prefix-sums', '前缀和 + 哈希'],
  617: ['binary-trees', '二叉树'],
  621: ['priority-queues', '优先队列调度'],
  637: ['tree-traversals', '层序遍历'],
  647: ['two-pointers', '双指针'],
  695: ['connected-components', '连通分量'],
  704: ['binary-search', '二分查找'],
  876: ['fast-slow', '快慢指针'],
  912: ['quick-sort', '快速排序'],
  973: ['top-k', 'Top-K 堆'],
  1143: ['sequences', '最长公共子序列'],
  补充题4: ['quick-sort', '快速排序'],
  '剑指 Offer 10- I': ['memoization', '记忆化 / 递推'],
  '剑指 Offer 22': ['fast-slow', '快慢指针'],
}
const ALGO_LAB_BY_FILE = [
  ['滑动窗口', ['sliding-window', '专题：滑动窗口']],
  ['双指针', ['two-pointers', '专题：双指针']],
  ['二叉搜索树', ['binary-search-trees', '专题：二叉搜索树']],
  ['二叉树', ['binary-trees', '专题：二叉树']],
  ['前缀树', ['tries', '专题：前缀树']],
  ['动态规划', ['tabulation', '专题：动态规划']],
  ['堆', ['binary-heaps', '专题：堆']],
  ['栈', ['stacks', '专题：栈']],
  ['链表', ['linked-lists', '专题：链表']],
  ['矩阵', ['matrices', '专题：矩阵']],
  ['二分', ['binary-search', '专题：二分查找']],
  ['位运算', ['bits-and-masks', '专题：位运算']],
  ['区间', ['merge-intervals', '专题：区间']],
  ['回溯', ['subsets', '专题：回溯']],
  ['哈希', ['hash-tables', '专题：哈希表']],
  ['分治', ['divide-and-conquer', '专题：分治']],
]

// ---------- 参数解析 ----------
const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const refresh = args.includes('--refresh')
const overviewOnly = args.includes('--overview-only')
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
const escCell = (s) => String(s).replace(/\|/g, '\\|')

function resolveAlgoLab(id, fallbackFile = '') {
  if (ALGO_LAB_BY_ID[id]) return ALGO_LAB_BY_ID[id]
  if (fallbackFile) {
    for (const [kw, target] of ALGO_LAB_BY_FILE) {
      if (fallbackFile.includes(kw)) return target
    }
  }
  return null
}

function formatAlgoLab(id, fallbackFile = '') {
  const hit = resolveAlgoLab(id, fallbackFile)
  return hit ? `[${hit[1]}](${ALGO_LAB_BASE}${hit[0]})` : '—'
}

/** 扫描已有每日题单，提取每期打卡进度与已打卡题目（用于总览页） */
function scanDailyNotes() {
  if (!fs.existsSync(OUT_DIR)) return { notes: [], checkedById: new Map(), checkedBySlug: new Map() }
  const files = fs
    .readdirSync(OUT_DIR)
    .filter((f) => /^每日题单 \d{4}-\d{2}-\d{2}\.md$/.test(f))
    .sort()
    .reverse()

  const checkedById = new Map()
  const checkedBySlug = new Map()
  const notes = []

  const parseRows = (section) =>
    [...section.matchAll(/^\|\s*\[([^\]]+)\]\((https:\/\/leetcode\.cn\/problems\/([^/)]+)\/?)\)/gm)].map((m) => {
      const label = m[1].trim()
      const idMatch = label.match(/^([^\s.]+)\.\s*(.+)$/)
      return {
        label,
        id: idMatch ? idMatch[1] : null,
        title: idMatch ? idMatch[2].trim() : label,
        url: m[2],
        slug: m[3],
      }
    })

  for (const f of files) {
    const noteDate = f.match(/(\d{4}-\d{2}-\d{2})/)[1]
    const noteName = path.basename(f, '.md')
    const text = read(path.join(OUT_DIR, f))

    const newPart = text.split(/^## .*复盘/m)[0] ?? ''
    const revPart = (text.split(/^## .*复盘/m)[1] ?? '').split(/^## 完成打卡/m)[0] ?? ''
    const checkPart = text.split(/^## 完成打卡/m)[1] ?? ''

    const newItems = parseRows(newPart)
    const revItems = parseRows(revPart)

    const checkedLines = [...checkPart.matchAll(/^- \[x\]\s*(.+)$/gm)].map((m) => m[1])
    const uncheckedCount = (checkPart.match(/^- \[ \]/gm) || []).length
    const checkedCount = checkedLines.length
    const totalCount = checkedCount + uncheckedCount

    for (const line of checkedLines) {
      const slotMatch = line.match(/^(新题|复盘)\s*(\d+)/)
      let item = null
      if (slotMatch) {
        const idx = Number(slotMatch[2]) - 1
        item = slotMatch[1] === '新题' ? newItems[idx] : revItems[idx]
      }
      const inlineId = line.match(/\[([^\s.\]]+)\./)?.[1]
      const inlineSlug = line.match(/https:\/\/leetcode\.cn\/problems\/([^/)]+)/)?.[1]
      const id = item?.id ?? inlineId
      const slug = item?.slug ?? inlineSlug
      if (id && !checkedById.has(id)) checkedById.set(id, noteName)
      if (slug && !checkedBySlug.has(slug)) checkedBySlug.set(slug, noteName)
    }

    notes.push({
      date: noteDate,
      noteName,
      checkedCount,
      totalCount,
      newItems,
      revItems,
    })
  }

  return { notes, checkedById, checkedBySlug }
}

/** 生成每日题单总览页（Top 30 覆盖率 + 打卡记录） */
function buildOverview({ questions, done, pool, state }) {
  const { notes, checkedById, checkedBySlug } = scanDailyNotes()
  const top30 = questions.slice(NEW_FROM - 1, NEW_FROM - 1 + NEW_RANGE)

  const filesById = new Map()
  for (const p of pool) {
    if (!filesById.has(p.id)) filesById.set(p.id, [])
    const list = filesById.get(p.id)
    if (!list.includes(p.file)) list.push(p.file)
  }

  let archivedTop30 = 0
  let coveredTop30 = 0
  const top30Rows = top30.map((q, idx) => {
    let statusText = '⬜ 待刷'
    if (done.has(q.id)) {
      archivedTop30++
      coveredTop30++
      const files = filesById.get(q.id) ?? []
      if (files.length) {
        const shown = files.slice(0, 2).map((f) => `[[${f}]]`).join('、')
        statusText = files.length > 2 ? `✅ ${shown} 等 ${files.length} 处` : `✅ ${shown}`
      } else {
        statusText = '✅ 已归档'
      }
    } else {
      const dailyNote = checkedById.get(q.id) ?? checkedBySlug.get(q.slug)
      if (dailyNote) {
        coveredTop30++
        statusText = `☑️ [[${dailyNote}]]（待归档）`
      }
    }
    return `| ${idx + 1} | [${q.id}. ${escCell(q.title)}](https://leetcode.cn/problems/${q.slug}/) | ${levelName(q.level)} | ${q.freq} | ${statusText} | ${formatAlgoLab(q.id)} |`
  })

  const totalChecked = notes.reduce((s, n) => s + n.checkedCount, 0)
  const totalTasks = notes.reduce((s, n) => s + n.totalCount, 0)
  const pct = Math.round((coveredTop30 / top30.length) * 100)

  const historyRows = notes.map((n) => {
    const badge =
      n.totalCount === 0
        ? '—'
        : n.checkedCount === n.totalCount
          ? `✅ ${n.checkedCount}/${n.totalCount}`
          : n.checkedCount > 0
            ? `🟡 ${n.checkedCount}/${n.totalCount}`
            : `⬜ 0/${n.totalCount}`
    const newText = n.newItems.map((x) => escCell(x.label)).join(' / ') || '—'
    const revText = n.revItems.map((x) => escCell(x.label)).join(' / ') || '—'
    return `| [[${n.noteName}\\|${n.date}]] | ${badge} | ${newText} | ${revText} |`
  })

  return `---
title: 每日题单总览
tags:
  - LeetCode
  - 每日题单
description: codetop 前端岗 Top 30 覆盖率、vault 复盘池进度与每日打卡统计
aliases:
  - 每日算法总览
---

# 每日题单总览

> [!info] 自动生成说明
> 本页由 \`scripts/codetop-daily.mjs\` 自动统计生成（数据源：\`codetop-data.json\` + 四大系列笔记 + 每日题单打卡记录）。
> 机制动画链接指向 [Algo Lab](https://byte-sized-algorithms.vercel.app/)，卡住超过 10 分钟时可先看 1 分钟步进演示建立直觉，再回来手写 JS。

## 📊 进度概览

| 指标 | 当前进度 | 说明 |
| --- | --- | --- |
| codetop 前端 Top ${top30.length} 覆盖 | **${coveredTop30} / ${top30.length}（${pct}%）** | Vault 已归档 ${archivedTop30} 题${coveredTop30 > archivedTop30 ? `，另有 ${coveredTop30 - archivedTop30} 题已在每日题单打卡待归档` : ''} |
| Vault 四大系列收录 | **${done.size} 题** | 复盘轮换池共 ${pool.length} 条出处记录 |
| 每日题单累计打卡 | **${totalChecked} / ${totalTasks} 项** | 共 ${notes.length} 期每日题单 |
| 轮换游标位置 | 新题 \`${state.newCursor}/${top30.length}\` · 复盘 \`${state.reviewIdx}/${pool.length}\` | 下次运行将从此处继续轮换 |

## 🔥 codetop 前端岗 Top ${top30.length} 覆盖清单

| # | 题目 | 难度 | 频率 | 状态 / 出处 | 机制动画 |
| --- | --- | --- | --- | --- | --- |
${top30Rows.join('\n')}

## 📅 每日题单打卡记录

| 日期 | 打卡 | 新题 | 复盘 |
| --- | --- | --- | --- |
${historyRows.join('\n')}
`
}

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

if (overviewOnly) {
  const overview = buildOverview({ questions, done, pool, state })
  if (dryRun) {
    console.log('（overview-only + dry-run，未写入）')
  } else {
    fs.mkdirSync(OUT_DIR, { recursive: true })
    fs.writeFileSync(OVERVIEW_PATH, overview)
    console.log(`📊 已刷新总览: ${path.relative(ROOT, OVERVIEW_PATH)}`)
  }
  process.exit(0)
}

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
  const newIds = new Set(newQuestions.map((q) => q.id))
  reviewQuestions = []
  let step = 0
  while (reviewQuestions.length < Math.min(REVIEW_COUNT, pool.length) && step < pool.length) {
    const candidate = pool[(state.reviewIdx + step) % pool.length]
    if (!newIds.has(candidate.id)) {
      reviewQuestions.push(candidate)
    }
    step++
  }
  state.reviewIdx = pool.length ? (state.reviewIdx + step) % pool.length : 0
}

// --- 生成笔记 ---
const fmtNew = (q) => {
  const mark = done.has(q.id) ? '🔁（已刷过，重做）' : '🆕'
  return `| [${q.id}. ${q.title}](https://leetcode.cn/problems/${q.slug}/) | ${levelName(q.level)} | ${q.freq} | ${formatAlgoLab(q.id)} | ${mark} |`
}
const fmtReview = (r) => {
  const q = byId.get(r.id)
  const lv = q ? levelName(q.level) : '—'
  const freq = q ? q.freq : '—'
  return `| [${r.title}](${r.url}) | ${lv} | ${freq} | ${formatAlgoLab(r.id, r.file)} | 复盘 · 出处：[[${r.file}]] |`
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
> 卡住超过 10 分钟可先点「机制动画」看 1 分钟步进演示建立直觉，再回来手写 JS。
> 复盘题不写新笔记，直接在原文出处下方追加「二刷日期 + 一句话卡点」。

## 🆕 新题（codetop 前端岗频率榜）

| 题目 | 难度 | 频率 | 机制动画 | 状态 |
| --- | --- | --- | --- | --- |
${newQuestions.map(fmtNew).join('\n')}

## 🔁 复盘（vault 轮换池）

| 题目 | 难度 | 频率 | 机制动画 | 备注 |
| --- | --- | --- | --- | --- |
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
  fs.writeFileSync(OVERVIEW_PATH, buildOverview({ questions, done, pool, state }))
  console.log(`📝 已写入: ${path.relative(ROOT, outPath)}`)
  console.log(`📊 已刷新总览: ${path.relative(ROOT, OVERVIEW_PATH)}`)
}
