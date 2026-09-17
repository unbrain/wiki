---
title: unbrain · 资深前端工程师 & 算法知识库
description: 资深前端开发工程师 · WebGL / Vue.js · JavaScript 算法体系与工程沉淀
aliases: []
tags:
  - index
---

<div class="noise"></div>
<div class="cursor" id="ub-cursor"></div>
<div class="cursor-follower" id="ub-cursorFollower"></div>
<div class="progress-bar" id="ub-progressBar"></div>

<!-- HUD NAVIGATION BAR -->
<nav class="ub-nav" id="ub-nav">
<div class="ub-nav-logo">
<span class="ub-logo-bracket">[</span>UNBRAIN<span class="ub-logo-bracket">]</span>
</div>
<div class="ub-nav-links">
<a href="/关于我" data-no-popover="true">关于我/简历</a>
<a href="#ub-about" data-router-ignore="true" data-no-popover="true">个人档案</a>
<a href="#ub-quests" data-router-ignore="true" data-no-popover="true">履历历程</a>
<a href="#ub-builds" data-router-ignore="true" data-no-popover="true">核心作品</a>
<a href="#ub-knowledge" data-router-ignore="true" data-no-popover="true">知识卷轴</a>
<a href="/朝花夕拾/" data-no-popover="true">朝花夕拾</a>
<a href="#ub-stats" data-router-ignore="true" data-no-popover="true">量化数据</a>
<a href="#ub-terminal" data-router-ignore="true" data-no-popover="true">交互终端</a>
<a href="#ub-arcade" data-router-ignore="true" data-no-popover="true">赛博游戏</a>
</div>
<button class="ub-nav-toggle" id="ub-nav-toggle" aria-label="切换导航菜单">
<span></span>
<span></span>
<span></span>
</button>
</nav>

<!-- MOBILE NAVIGATION DRAWER -->
<div class="ub-nav-drawer" id="ub-nav-drawer">
<div class="ub-drawer-header">
<span class="ub-drawer-title">[ 导航中心 · NAVIGATION HUB ]</span>
<button class="ub-drawer-close" id="ub-drawer-close" aria-label="关闭导航">✕</button>
</div>
<div class="ub-drawer-links">
<a class="ub-drawer-link" href="/关于我" data-no-popover="true"><span class="ub-drawer-num">00</span> 简历专页 · RESUME</a>
<a class="ub-drawer-link" href="#ub-about" data-router-ignore="true" data-no-popover="true"><span class="ub-drawer-num">01</span> 个人档案 · PROFILE</a>
<a class="ub-drawer-link" href="#ub-quests" data-router-ignore="true" data-no-popover="true"><span class="ub-drawer-num">02</span> 履历历程 · QUEST LOG</a>
<a class="ub-drawer-link" href="#ub-builds" data-router-ignore="true" data-no-popover="true"><span class="ub-drawer-num">03</span> 核心作品 · BUILDS</a>
<a class="ub-drawer-link" href="#ub-knowledge" data-router-ignore="true" data-no-popover="true"><span class="ub-drawer-num">04</span> 知识卷轴 · KNOWLEDGE</a>
<a class="ub-drawer-link" href="/朝花夕拾/" data-no-popover="true"><span class="ub-drawer-num">05</span> 朝花夕拾 · ARCHIVES</a>
<a class="ub-drawer-link" href="#ub-stats" data-router-ignore="true" data-no-popover="true"><span class="ub-drawer-num">06</span> 量化数据 · TELEMETRY</a>
<a class="ub-drawer-link" href="#ub-terminal" data-router-ignore="true" data-no-popover="true"><span class="ub-drawer-num">07</span> 交互终端 · TERMINAL</a>
<a class="ub-drawer-link" href="#ub-arcade" data-router-ignore="true" data-no-popover="true"><span class="ub-drawer-num">08</span> 赛博游戏 · ARCADE</a>
</div>
</div>

<button class="ub-floating-top" id="ub-floating-top" aria-label="返回顶部">
<span>▲ 顶部</span>
</button>

<!-- HERO SECTION -->
<section class="ub-hero" id="ub-hero">
<canvas id="ub-particleCanvas"></canvas>
<div class="ub-hero-slash ub-hero-slash-1"></div>
<div class="ub-hero-slash ub-hero-slash-2"></div>

<div class="ub-hero-content">
<div class="ub-hero-ticker notranslate" translate="no">
<span class="ub-ticker-item">坐标: 39.90° N, 116.40° E (北京)</span>
<span class="ub-ticker-sep">/</span>
<span class="ub-ticker-item">技术栈: VUE 3 · TS · NODE</span>
<span class="ub-ticker-sep">/</span>
<span class="ub-ticker-item">工程经验: 7+ 年</span>
</div>
<div class="ub-hero-tag notranslate" translate="no">
<span class="ub-tag-bracket">[</span> 资深前端开发工程师 · WebGL / Vue.js · 算法探索者 <span class="ub-tag-bracket">]</span>
</div>
<h1 class="ub-hero-name">
<span class="ub-line-wrap"><span class="ub-reveal-line" id="ub-hero-glitch">unbrain.</span></span>
</h1>
<p class="ub-hero-sub reveal-fade">构筑高并发前端系统 · 研磨算法知识卷轴 · 探索生成式交互代码</p>
<div class="ub-hero-actions reveal-fade">
<a class="ub-btn ub-btn--primary" href="/关于我" data-no-popover="true">个人简历 · RESUME ↗</a>
<a class="ub-btn ub-btn--primary" href="#ub-builds" data-router-ignore="true" data-no-popover="true">浏览核心工程 ↗</a>
<a class="ub-btn ub-btn--outline" href="#ub-knowledge" data-router-ignore="true" data-no-popover="true">查阅知识库 ↓</a>
<a class="ub-btn ub-btn--ghost" href="#ub-terminal" data-router-ignore="true" data-no-popover="true">打开终端 >_</a>
</div>
<div class="ub-hero-scroll-hint">
<span>▼ 向下滚动探索 ▼</span>
</div>
</div>

<div class="ub-hud-corner ub-hud-tl"></div>
<div class="ub-hud-corner ub-hud-tr"></div>
<div class="ub-hud-corner ub-hud-bl"></div>
<div class="ub-hud-corner ub-hud-br"></div>
</section>

<!-- MARQUEE STRIP -->
<div class="ub-marquee-strip notranslate" translate="no">
<div class="ub-marquee-inner">
VUE 3 · 响应式原理 · TYPESCRIPT · WEBGL · 算法与数据结构 · LEETCODE HOT100 · 高并发架构 · NODE.JS · VITE · 虚拟滚动 · 性能调优 · 组件库设计 · VUE 3 · 响应式原理 · TYPESCRIPT · WEBGL · 算法与数据结构 · LEETCODE HOT100 · 高并发架构 · NODE.JS · VITE · 虚拟滚动 · 性能调优 · 组件库设计 ·&nbsp;
</div>
</div>

<!-- 01 CHARACTER PROFILE -->
<section class="ub-about" id="ub-about">
<div class="ub-container">
<div class="ub-section-label ub-scroll-reveal"><span class="ub-label-num">01</span> 个人档案 · CHARACTER PROFILE</div>
<div class="ub-about-grid">
<div class="ub-about-left ub-scroll-reveal">
<h2 class="ub-section-title">构建高扩展<br/>前端架构与<br/>交互系统。</h2>
<div class="ub-char-stats">
<div class="ub-char-stat-row">
<div class="ub-stat-head">
<span class="ub-char-stat-name">VUE.JS — 响应式内核与工程架构</span>
<span class="ub-stat-val">95%</span>
</div>
<div class="ub-stat-bar"><div class="ub-stat-bar-fill" data-width="95"></div></div>
</div>
<div class="ub-char-stat-row">
<div class="ub-stat-head">
<span class="ub-char-stat-name">ALGORITHMS — 数据结构与算法推演</span>
<span class="ub-stat-val">85%</span>
</div>
<div class="ub-stat-bar"><div class="ub-stat-bar-fill" data-width="85"></div></div>
</div>
<div class="ub-char-stat-row">
<div class="ub-stat-head">
<span class="ub-char-stat-name">TYPESCRIPT — 高级类型体操与工程规范</span>
<span class="ub-stat-val">88%</span>
</div>
<div class="ub-stat-bar"><div class="ub-stat-bar-fill" data-width="88"></div></div>
</div>
<div class="ub-char-stat-row">
<div class="ub-stat-head">
<span class="ub-char-stat-name">NODE.JS — 高并发服务与 Redis 缓存</span>
<span class="ub-stat-val">86%</span>
</div>
<div class="ub-stat-bar"><div class="ub-stat-bar-fill" data-width="86"></div></div>
</div>
</div>
</div>
<div class="ub-about-right">
<p class="ub-about-text ub-scroll-reveal">
拥有 7 年以上一线生产工程经验的资深前端开发工程师。精通现代 Vue 3 生态、Vite 工具链体系、高性能渲染管线以及高可维护的组件体系架构。
</p>
<p class="ub-about-text ub-scroll-reveal">
曾长期担任新浪微博核心业务的前端主力开发——主导并推进了<strong>微博 PC 主站</strong>、<strong>PC 创作者中心</strong>以及<strong>高并发私信消息箱</strong>的前端架构设计与演进，稳定承载数亿级用户的高并发访问。
</p>
<p class="ub-about-text ub-scroll-reveal">
持续深耕算法推演、计算机图形学与生成式 WebGL 交互实验。本站作为开放的数字花园与算法知识库，系统性沉淀技术探索与解题智慧。
</p>
<div class="ub-about-badges ub-scroll-reveal">
<span class="ub-badge">#Vue3</span>
<span class="ub-badge">#TypeScript</span>
<span class="ub-badge">#WebGL</span>
<span class="ub-badge">#算法沉淀</span>
<span class="ub-badge">#工程化</span>
<span class="ub-badge">#Node.js</span>
</div>
<div class="ub-about-actions ub-scroll-reveal">
<a href="/关于我" class="ub-btn ub-btn--primary" data-no-popover="true">查看完整求职简历专页 ↗</a>
<a href="https://rxresu.me/unbrain/cv" target="_blank" class="ub-btn ub-btn--ghost" data-no-popover="true">在线 PDF 简历 ↗</a>
</div>
</div>
</div>
</div>
</section>

<!-- 02 QUEST LOG (CAREER JOURNEY) -->
<section class="ub-quests" id="ub-quests">
<div class="ub-container">
<div class="ub-section-label ub-scroll-reveal"><span class="ub-label-num">02</span> 履历历程 · QUEST LOG</div>
<h2 class="ub-section-title ub-scroll-reveal">工程进阶与<br/>技术足迹。</h2>
<div class="ub-timeline">
<div class="ub-timeline-item ub-scroll-reveal">
<div class="ub-timeline-node"><span class="ub-node-icon">✓</span></div>
<div class="ub-timeline-content">
<div class="ub-timeline-meta">
<span class="ub-timeline-year">2019</span>
<span class="ub-timeline-tag">启程 · QUEST_START</span>
</div>
<h3 class="ub-timeline-title">启程 · 加入新浪微博核心前端团队</h3>
<p class="ub-timeline-desc">
计算机专业毕业，加入新浪微博核心 Web 团队，投身超大流量平台的现代前端架构开发，深耕 JavaScript 编译工具链与超大型 Web 工程治理。
</p>
</div>
</div>
<div class="ub-timeline-item ub-scroll-reveal">
<div class="ub-timeline-node"><span class="ub-node-icon">✓</span></div>
<div class="ub-timeline-content">
<div class="ub-timeline-meta">
<span class="ub-timeline-year">2021</span>
<span class="ub-timeline-tag">规模拓展 · SCALE_EXPANSION</span>
</div>
<h3 class="ub-timeline-title">规模化 · 微博 PC 创作者中心与核心富媒体发布器</h3>
<p class="ub-timeline-desc">
主导微博 PC 创作者平台及全站核心富文本发布器开发（涵盖音视频流管线、定时发布调度、抽奖运营矩阵、数据分析看板），在热点脉冲级峰值流量下保障系统高可用。
</p>
</div>
</div>
<div class="ub-timeline-item ub-scroll-reveal">
<div class="ub-timeline-node"><span class="ub-node-icon">✓</span></div>
<div class="ub-timeline-content">
<div class="ub-timeline-meta">
<span class="ub-timeline-year">2023</span>
<span class="ub-timeline-tag">高并发通讯 · CONCURRENCY_IM</span>
</div>
<h3 class="ub-timeline-title">架构演进 · 高并发私信系统与跨端同构体系</h3>
<p class="ub-timeline-desc">
重构微博 PC 私信消息箱（WebChat），攻克海量数据虚拟滚动渲染、高频推送解耦与移动端同构跨平台架构，大幅降低内存占用并消减长列表白屏率。
</p>
</div>
</div>
<div class="ub-timeline-item ub-scroll-reveal">
<div class="ub-timeline-node"><span class="ub-node-icon">★</span></div>
<div class="ub-timeline-content">
<div class="ub-timeline-meta">
<span class="ub-timeline-year">2025 - 至今</span>
<span class="ub-timeline-tag">资深进阶 · SENIOR_ARCHITECT</span>
</div>
<h3 class="ub-timeline-title">资深沉淀 · 全栈进阶与算法知识图谱</h3>
<p class="ub-timeline-desc">
作为资深前端开发，持续推进 Node.js 服务端、WebGL Shader 创意实验与前沿图形渲染，建立系统化算法解题体系，打造长效数字花园与知识底座。
</p>
</div>
</div>
</div>
</div>
</section>

<!-- 03 BUILDS & FEATS -->
<section class="ub-builds" id="ub-builds">
<div class="ub-container">
<div class="ub-section-label ub-scroll-reveal"><span class="ub-label-num">03</span> 核心作品 · PRODUCTION BUILDS</div>
<h2 class="ub-section-title ub-scroll-reveal">代表性工程<br/>与实战成果。</h2>
<div class="ub-projects-grid">
<div class="ub-project-card ub-scroll-reveal" data-tilt>
<div class="ub-project-img-wrap">
<img src="/static/projects/weibo.png" alt="PC 微博主站" class="ub-project-img" />
<div class="ub-project-badge">核心门户 · Core Portal</div>
</div>
<div class="ub-project-body">
<div class="ub-project-header">
<h3 class="ub-project-name">PC 微博主站</h3>
<a href="https://weibo.com" target="_blank" class="ub-project-ext" aria-label="访问 PC 微博主站">↗</a>
</div>
<p class="ub-project-desc">
新浪微博 PC 旗舰级门户。负责核心富媒体发布器、音视频直传管线、全局抽屉消息、动态 Feed 卡片矩阵以及定时内容调度流的系统级工程实现。
</p>
<div class="ub-project-tags">
<span>Vue.js</span>
<span>Vite</span>
<span>音视频管线</span>
<span>高并发架构</span>
</div>
</div>
</div>
<div class="ub-project-card ub-scroll-reveal" data-tilt>
<div class="ub-project-img-wrap">
<img src="/static/projects/me.jpg" alt="PC 微博创作者中心" class="ub-project-img" />
<div class="ub-project-badge">创作者中台 · Creator Hub</div>
</div>
<div class="ub-project-body">
<div class="ub-project-header">
<h3 class="ub-project-name">PC 微博创作者中心</h3>
<a href="https://me.weibo.com/" target="_blank" class="ub-project-ext" aria-label="访问 PC 微博创作者中心">↗</a>
</div>
<p class="ub-project-desc">
一站式创作者运营中台。主导落地抽奖中心、视频资源托管分发、粉丝众测模块、多维商业化收益看板及定时内容调度中心等核心业务链路。
</p>
<div class="ub-project-tags">
<span>Vue 3</span>
<span>TypeScript</span>
<span>数据看板</span>
<span>运营矩阵</span>
</div>
</div>
</div>
<div class="ub-project-card ub-scroll-reveal" data-tilt>
<div class="ub-project-img-wrap">
<img src="/static/projects/webchat.jpg" alt="微博 PC 消息箱" class="ub-project-img" />
<div class="ub-project-badge">实时即时通讯 · IM</div>
</div>
<div class="ub-project-body">
<div class="ub-project-header">
<h3 class="ub-project-name">微博 PC 消息箱 & WebChat</h3>
<a href="https://m.weibo.cn/c/wbox?id=qgb2672tlf" target="_blank" class="ub-project-ext" aria-label="访问微博消息箱">↗</a>
</div>
<p class="ub-project-desc">
亿级规模实时通讯平台。完成系统架构全面重构，攻克长列表虚拟滚动、会话状态机解耦与低延迟消息推送流，带来丝滑流畅的交互体验。
</p>
<div class="ub-project-tags">
<span>WebSocket</span>
<span>虚拟列表</span>
<span>IM 架构</span>
<span>端同构设计</span>
</div>
</div>
</div>
<div class="ub-project-card ub-scroll-reveal" data-tilt>
<div class="ub-project-img-wrap">
<img src="/static/projects/creator.jpg" alt="移动端组件与瀑布流体系" class="ub-project-img" />
<div class="ub-project-badge">物料体系 · Material Solution</div>
</div>
<div class="ub-project-body">
<div class="ub-project-header">
<h3 class="ub-project-name">移动端工程化与瀑布流物料体系</h3>
<a href="/瀑布流项目/项目骨架搭建" class="ub-project-ext" data-no-popover="true" aria-label="查看项目文档">↗</a>
</div>
<p class="ub-project-desc">
高性能自适应瀑布流与现代化移动端组件库解决方案。专为移动端/PC 双端自适应渲染量身设计，集成 Vite 构建加速与 Tailwind CSS 样式引擎。
</p>
<div class="ub-project-tags">
<span>Vite</span>
<span>Tailwind CSS</span>
<span>通用组件库</span>
<span>工程化规范</span>
</div>
</div>
</div>
</div>
</div>
</section>

<!-- 04 SKILL SCROLLS & KNOWLEDGE VAULT -->
<section class="ub-knowledge" id="ub-knowledge">
<div class="ub-container">
<div class="ub-section-label ub-scroll-reveal"><span class="ub-label-num">04</span> 知识卷轴 · SKILL SCROLLS</div>
<h2 class="ub-section-title ub-scroll-reveal">算法推演与<br/>源码知识库。</h2>
<div class="ub-writing-list">
<a class="ub-writing-item ub-scroll-reveal" data-no-popover="true" href="/JavaScript 算法/算法基础/JavaScript 算法基础第一天">
<span class="ub-writing-num">01</span>
<div class="ub-writing-info">
<span class="ub-writing-title">算法基础 — 数据结构与算法体系核心</span>
<span class="ub-writing-sub">从复杂度分析、链表、树、图到堆与动态规划，11 天建立完整算法思维骨架</span>
</div>
<span class="ub-writing-meta">11 篇</span>
<span class="ub-writing-arrow">↗</span>
</a>
<a class="ub-writing-item ub-scroll-reveal" data-no-popover="true" href="/JavaScript 算法/LeetCode Hot100/LeetCode Hot100">
<span class="ub-writing-num">02</span>
<div class="ub-writing-info">
<span class="ub-writing-title">LeetCode Hot 100 — 经典高频面试真题</span>
<span class="ub-writing-sub">按高频面试专题系统化归类，逐题推导最优解法与 JavaScript 核心实现</span>
</div>
<span class="ub-writing-meta">20 篇</span>
<span class="ub-writing-arrow">↗</span>
</a>
<a class="ub-writing-item ub-scroll-reveal" data-no-popover="true" href="/JavaScript 算法/经典 150/经典 150 数字 字符串">
<span class="ub-writing-num">03</span>
<div class="ub-writing-info">
<span class="ub-writing-title">经典 150 题 — LeetCode 经典题库精讲</span>
<span class="ub-writing-sub">全面涵盖双指针、滑动窗口、Kadane 算法、矩阵与区间合并等核心技巧</span>
</div>
<span class="ub-writing-meta">20 篇</span>
<span class="ub-writing-arrow">↗</span>
</a>
<a class="ub-writing-item ub-scroll-reveal" data-no-popover="true" href="/JavaScript 算法/GRD/GRD 数组">
<span class="ub-writing-num">04</span>
<div class="ub-writing-info">
<span class="ub-writing-title">GRD 刷题 — 黄金代表性题目实战解析</span>
<span class="ub-writing-sub">精选高代表性考题深度拆解，包含完整时空复杂度推导与边界易错点防御</span>
</div>
<span class="ub-writing-meta">11 篇</span>
<span class="ub-writing-arrow">↗</span>
</a>
<a class="ub-writing-item ub-scroll-reveal" data-no-popover="true" href="/Vue 源码/Reactive 与 Effect 原理实现">
<span class="ub-writing-num">05</span>
<div class="ub-writing-info">
<span class="ub-writing-title">Vue 3 源码解析 — 核心底层运作机制剖析</span>
<span class="ub-writing-sub">深度手写 Reactive 响应式系统、Readonly 体系、双端对比 Diff (LIS) 与编译器状态机</span>
</div>
<span class="ub-writing-meta">4 篇</span>
<span class="ub-writing-arrow">↗</span>
</a>
<a class="ub-writing-item ub-scroll-reveal" data-no-popover="true" href="/前端工程/强缓存与协商缓存">
<span class="ub-writing-num">06</span>
<div class="ub-writing-info">
<span class="ub-writing-title">前端工程化与网络协议 — 体系规范与架构设计</span>
<span class="ub-writing-sub">深入 HTTP 强缓存与协商缓存、Retina 1px 像素适配、跨域机制与架构设计</span>
</div>
<span class="ub-writing-meta">2 篇</span>
<span class="ub-writing-arrow">↗</span>
</a>
<a class="ub-writing-item ub-scroll-reveal" data-no-popover="true" href="/JavaScript 算法/解题思路/322 零钱兑换">
<span class="ub-writing-num">07</span>
<div class="ub-writing-info">
<span class="ub-writing-title">解题思维拆解 — 算法重难点深度复盘</span>
<span class="ub-writing-sub">股票买卖动态规划全系列状态机推导、零钱兑换完全背包与螺旋矩阵全流程复盘</span>
</div>
<span class="ub-writing-meta">3 篇</span>
<span class="ub-writing-arrow">↗</span>
</a>
<a class="ub-writing-item ub-scroll-reveal" data-no-popover="true" href="/朝花夕拾/">
<span class="ub-writing-num">08</span>
<div class="ub-writing-info">
<span class="ub-writing-title">朝花夕拾 — 早期足迹与技术成长档案</span>
<span class="ub-writing-sub">记录 2017-2019 年校招求职、进入新浪微博前后所写下的 78 篇早期博文与面试真题</span>
</div>
<span class="ub-writing-meta">78 篇</span>
<span class="ub-writing-arrow">↗</span>
</a>
</div>
</div>
</section>

<!-- 05 TELEMETRY & STATS -->
<section class="ub-stats" id="ub-stats">
<div class="ub-container">
<div class="ub-section-label ub-scroll-reveal"><span class="ub-label-num">05</span> 量化数据 · TELEMETRY & METRICS</div>
<h2 class="ub-section-title ub-scroll-reveal">用数字沉淀<br/>工程印记。</h2>
<div class="ub-metrics-grid">
<div class="ub-metric-card ub-scroll-reveal">
<div class="ub-metric-num" data-target="160">160</div>
<div class="ub-metric-plus">+</div>
<div class="ub-metric-label">知识卷轴篇数</div>
<div class="ub-metric-sub">已公开发布 160+ 篇系统化技术与历史笔记</div>
</div>
<div class="ub-metric-card ub-scroll-reveal">
<div class="ub-metric-num" data-target="130">130</div>
<div class="ub-metric-plus">+</div>
<div class="ub-metric-label">算法题解收录</div>
<div class="ub-metric-sub">系统解析 130+ 道精选 LeetCode 经典题解</div>
</div>
<div class="ub-metric-card ub-scroll-reveal">
<div class="ub-metric-num" data-target="7">7</div>
<div class="ub-metric-plus">+</div>
<div class="ub-metric-label">一线工程经验</div>
<div class="ub-metric-sub">深耕超高并发亿级访问 Web 架构演进</div>
</div>
<div class="ub-metric-card ub-scroll-reveal">
<div class="ub-metric-num" data-target="100">100</div>
<div class="ub-metric-plus">M+</div>
<div class="ub-metric-label">触达服务用户</div>
<div class="ub-metric-sub">稳定护航生产环境峰值并发流量</div>
</div>
</div>
</div>
</section>

<!-- 06 PARTY UP & INTERACTIVE CLI TERMINAL -->
<section class="ub-terminal-section" id="ub-terminal">
<div class="ub-container">
<div class="ub-section-label ub-scroll-reveal"><span class="ub-label-num">06</span> 联络与终端 · PARTY UP & CLI</div>
<h2 class="ub-section-title ub-scroll-reveal">携手合作<br/>共筑卓越工程。</h2>
<div class="ub-terminal-wrap ub-scroll-reveal">
<div class="ub-term-header">
<div class="ub-term-dots">
<span class="ub-term-dot ub-term-dot--red"></span>
<span class="ub-term-dot ub-term-dot--yellow"></span>
<span class="ub-term-dot ub-term-dot--green"></span>
</div>
<div class="ub-term-title">unbrain@node-worker: ~ (zsh)</div>
<div class="ub-term-status">会话就绪: SESSION READY</div>
</div>
<div class="ub-term-body" id="ub-term-output">
<div class="ub-term-line ub-term-line--muted">欢迎访问 UNBRAIN 交互式终端 [v5.0.0-game-ui]</div>
<div class="ub-term-line ub-term-line--muted">输入 <span class="ub-code-cmd">help</span> 或点击下方快捷指令按钮快速探索：</div>
<div class="ub-term-quick">
<button class="ub-term-btn" data-cmd="help">help 帮助</button>
<button class="ub-term-btn" data-cmd="snake">snake 游戏</button>
<button class="ub-term-btn" data-cmd="matrix">matrix 矩阵</button>
<button class="ub-term-btn" data-cmd="whoami">whoami 探测</button>
<button class="ub-term-btn" data-cmd="resume">resume 简历</button>
<button class="ub-term-btn" data-cmd="archive">archive 归档</button>
<button class="ub-term-btn" data-cmd="skills">skills 技能</button>
<button class="ub-term-btn" data-cmd="projects">projects 作品</button>
<button class="ub-term-btn" data-cmd="contact">contact 联络</button>
<button class="ub-term-btn" data-cmd="stats">stats 数据</button>
<button class="ub-term-btn" data-cmd="clear">clear 清屏</button>
</div>
</div>
<div class="ub-term-input-row">
<span class="ub-term-prompt">unbrain&gt;</span>
<input type="text" id="ub-term-input" class="ub-term-input" placeholder="输入指令 (例如 about, skills, projects, contact, stats)..." autocomplete="off" />
</div>
</div>
<div class="ub-social-links ub-scroll-reveal">
<a class="ub-social-link" href="https://github.com/unbrain" target="_blank" aria-label="访问 GitHub 主页">
<span class="ub-social-platform">开源主页 · GITHUB</span>
<span class="ub-social-handle">@unbrain ↗</span>
</a>
<a class="ub-social-link" href="mailto:marsorsun@gmail.com" aria-label="发送邮件给作者">
<span class="ub-social-platform">电子邮箱 · EMAIL</span>
<span class="ub-social-handle">marsorsun@gmail.com ↗</span>
</a>
</div>
</div>
</section>

<!-- 07 CYBER ARCADE (RETRO SNAKE) -->
<section class="ub-arcade-section ub-scroll-reveal" id="ub-arcade">
<div class="ub-container ub-arcade-container">
<div class="ub-section-label ub-scroll-reveal"><span class="ub-label-num">07</span> 赛博游戏舱 · CYBER ARCADE</div>
<h2 class="ub-section-title ub-scroll-reveal">复古终端<br/>极客贪吃蛇。</h2>
<div class="ub-snake-chassis" id="index-snake-container">
<div class="ub-snake-warp1"></div>
<div class="ub-snake-warp2"></div>
<div class="ub-snake-bolt bolt-tl"></div>
<div class="ub-snake-bolt bolt-tr"></div>
<div class="ub-snake-bolt bolt-bl"></div>
<div class="ub-snake-bolt bolt-br"></div>
<div class="ub-snake-grid">
<div class="ub-snake-screen-wrap">
<canvas width="240" height="320" class="snake-canvas"></canvas>
<div class="ub-snake-overlay">
<div class="overlay-title">[ 点击或回车激活控制 ]</div>
<div class="overlay-sub">// 方向键 / WASD 捕获粒子</div>
<div class="overlay-sub" style="margin-top: 4px; color: #fea55f;">// 按 Esc 键随时退出控制</div>
</div>
</div>
<div class="ub-snake-console">
<div class="ub-snake-info">
<span class="info-code">// GAME_CONSOLE.LOG</span>
<div>使用键盘方向键或下方按键操控，在网格中捕获能量光点，激发粒子光爆。</div>
</div>
<div class="ub-snake-stats">
<div>
<span class="stat-label">SCORE: </span>
<span class="stat-val snake-score-val">00</span>
</div>
<div>
<span class="stat-label">BEST: </span>
<span class="stat-val snake-maxscore-val">00</span>
</div>
</div>
<div class="ub-snake-controls">
<button type="button" class="snake-dir-btn" data-dir="up">▲</button>
<div class="dpad-row">
<button type="button" class="snake-dir-btn" data-dir="left">◀</button>
<button type="button" class="snake-dir-btn" data-dir="down">▼</button>
<button type="button" class="snake-dir-btn" data-dir="right">▶</button>
</div>
</div>
<button type="button" class="ub-snake-replay snake-replay-btn">重置游戏 ↺</button>
<button type="button" class="snake-sound-btn">SOUND: ON [AUDIO]</button>
</div>
</div>
</div>
</div>
</section>

<!-- SCRIPTS -->
<script>
(function() {
  // ── CLEANUP ANCHORS & DISABLE POPOVERS ON INDEX ──
  function purgeAnchorsAndPopovers() {
    if (document.body.getAttribute('data-slug') !== 'index') return;
    document.querySelectorAll('a[role="anchor"]').forEach(function(el) {
      el.remove();
    });
    document.querySelectorAll('a').forEach(function(el) {
      el.setAttribute('data-no-popover', 'true');
      el.dataset.noPopover = 'true';
    });
    document.querySelectorAll('.popover').forEach(function(el) {
      el.remove();
    });
  }
  purgeAnchorsAndPopovers();
  document.addEventListener('nav', purgeAnchorsAndPopovers);
  document.addEventListener('render', purgeAnchorsAndPopovers);

  // ── CUSTOM CURSOR ──
  var isTouchUser = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  var cursor = document.getElementById('ub-cursor');
  var follower = document.getElementById('ub-cursorFollower');
  var mx = 0, my = 0, fx = 0, fy = 0;
  var cursorVisible = false;

  if (!isTouchUser) {
    document.addEventListener('mousemove', function(e) {
      if (!cursorVisible) {
        cursorVisible = true;
        if (cursor) cursor.style.opacity = '1';
        if (follower) follower.style.opacity = '1';
      }
      mx = e.clientX; my = e.clientY;
      if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; }
    });
    function followLoop() {
      fx += (mx - fx) * 0.14;
      fy += (my - fy) * 0.14;
      if (follower) { follower.style.left = fx + 'px'; follower.style.top = fy + 'px'; }
      requestAnimationFrame(followLoop);
    }
    followLoop();

    document.querySelectorAll('a, button, .ub-project-card, .ub-writing-item').forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        if (cursor && follower) {
          cursor.style.width = '14px'; cursor.style.height = '14px';
          follower.style.width = '52px'; follower.style.height = '52px';
          follower.style.borderColor = '#43D9AD';
        }
      });
      el.addEventListener('mouseleave', function() {
        if (cursor && follower) {
          cursor.style.width = '8px'; cursor.style.height = '8px';
          follower.style.width = '36px'; follower.style.height = '36px';
          follower.style.borderColor = '#FEFAE0';
        }
      });
    });
  }

  // ── PARTICLES NETWORK ──
  var canvas = document.getElementById('ub-particleCanvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var W, H, particles = [], pMouse = { x: -999, y: -999 };
    function resizeP() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resizeP();
    window.addEventListener('resize', resizeP);
    canvas.addEventListener('mousemove', function(e) {
      var r = canvas.getBoundingClientRect();
      pMouse.x = e.clientX - r.left;
      pMouse.y = e.clientY - r.top;
    });
    var COUNT = Math.min(80, Math.floor(window.innerWidth / 16));
    for (var i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.45, vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.6 + 0.6
      });
    }
    var isParticleRunning = true;
    var heroEl = document.getElementById('ub-hero');
    if ('IntersectionObserver' in window && heroEl) {
      var pObs = new IntersectionObserver(function(entries) {
        var visible = entries[0].isIntersecting;
        if (visible && !isParticleRunning) {
          isParticleRunning = true;
          requestAnimationFrame(drawP);
        } else if (!visible) {
          isParticleRunning = false;
        }
      }, { threshold: 0.05 });
      pObs.observe(heroEl);
    }

    function drawP() {
      if (!isParticleRunning) return;
      ctx.clearRect(0, 0, W, H);
      particles.forEach(function(p) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(254, 250, 224, 0.4)';
        ctx.fill();
      });
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(254, 250, 224, ' + (0.07 * (1 - dist / 120)) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
        var mdx = particles[i].x - pMouse.x, mdy = particles[i].y - pMouse.y;
        var mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 160) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(pMouse.x, pMouse.y);
          ctx.strokeStyle = 'rgba(67, 217, 173, ' + (0.15 * (1 - mdist / 160)) + ')';
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
      if (isParticleRunning) {
        requestAnimationFrame(drawP);
      }
    }
    drawP();
  }

  // ── NAV SCROLL & SCROLLSPY ──
  var nav = document.getElementById('ub-nav');
  var navLinks = document.querySelectorAll('.ub-nav-links a');
  var sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', function() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);

    var current = '';
    sections.forEach(function(sec) {
      var top = sec.offsetTop - 140;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(function(link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

  // 内部锚点平滑滚动（阻止路由冲突与抖动，保证精准平滑直达）
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.setAttribute('data-router-ignore', 'true');
    link.dataset.routerIgnore = 'true';
    link.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (!href || href === '#') return;
      var targetEl = document.getElementById(href.slice(1));
      if (targetEl) {
        e.preventDefault();
        var top = targetEl.getBoundingClientRect().top + window.pageYOffset - 72;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ── SCROLL REVEAL (双重保障：Observer + 滚动/定时兜底) ──
  var reveals = document.querySelectorAll('.ub-scroll-reveal');
  if ('IntersectionObserver' in window) {
    var revObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); }
      });
    }, { threshold: 0.05 });
    reveals.forEach(function(el) { revObs.observe(el); });
  }

  function checkReveals() {
    var winHeight = window.innerHeight || document.documentElement.clientHeight;
    reveals.forEach(function(el) {
      if (!el.classList.contains('visible')) {
        var rect = el.getBoundingClientRect();
        if (rect.top <= winHeight * 0.95 && rect.bottom >= 0) {
          el.classList.add('visible');
        }
      }
    });
  }
  window.addEventListener('scroll', checkReveals, { passive: true });
  window.addEventListener('resize', checkReveals, { passive: true });
  setTimeout(checkReveals, 200);
  setTimeout(checkReveals, 600);
  setTimeout(checkReveals, 1200);
  // 兜底保护：2.5s 后强制显式所有板块，防止动画挂起导致黑屏
  setTimeout(function() {
    reveals.forEach(function(el) { el.classList.add('visible'); });
  }, 2500);

  // ── STAT BARS ──
  var statBars = document.querySelectorAll('.ub-stat-bar-fill');
  var barObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        var el = e.target;
        setTimeout(function() { el.style.width = el.dataset.width + '%'; }, 150);
        barObs.unobserve(el);
      }
    });
  }, { threshold: 0.25 });
  statBars.forEach(function(b) { barObs.observe(b); });

  // ── NUMERIC COUNTERS ──
  var counters = document.querySelectorAll('.ub-metric-num');
  var countObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      var target = parseInt(el.dataset.target, 10);
      countObs.unobserve(el);
      var current = 0, duration = 1800, start = performance.now();
      function step(now) {
        var elapsed = now - start;
        var p = Math.min(elapsed / duration, 1);
        var ease = 1 - Math.pow(1 - p, 3);
        current = Math.floor(ease * target);
        el.textContent = current;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.15 });
  counters.forEach(function(c) { countObs.observe(c); });

  // ── 3D TILT EFFECT ON CARDS (仅鼠标精确指针设备启用，移动触屏禁用以防变形跳动) ──
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('[data-tilt]').forEach(function(card) {
      card.addEventListener('mousemove', function(e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(900px) rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 8) + 'deg) translateY(-4px)';
      });
      card.addEventListener('mouseleave', function() {
        card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0)';
      });
    });
  }

  // ── SECTION WIPE LINES ──
  document.querySelectorAll('.ub-about, .ub-quests, .ub-builds, .ub-knowledge, .ub-stats, .ub-terminal-section, .ub-arcade-section').forEach(function(sec) {
    var line = document.createElement('div');
    line.style.cssText = 'position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg, #43D9AD, #FEFAE0, transparent);transform:scaleX(0);transform-origin:left;transition:transform 1.2s cubic-bezier(0.16,1,0.3,1);z-index:1;';
    sec.style.position = 'relative';
    sec.prepend(line);
    var wipeObs = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) { line.style.transform = 'scaleX(1)'; wipeObs.disconnect(); }
    }, { threshold: 0 });
    wipeObs.observe(sec);
  });

  // ── GLITCH EFFECT ──
  var heroGlitch = document.getElementById('ub-hero-glitch');
  if (heroGlitch) {
    setInterval(function() {
      heroGlitch.style.textShadow = (Math.random()*4-2)+'px '+(Math.random()*2-1)+'px 0 rgba(67,217,173,0.35), '+(Math.random()*-4+2)+'px '+(Math.random()*2-1)+'px 0 rgba(254,165,95,0.25)';
      setTimeout(function() { heroGlitch.style.textShadow = 'none'; }, 90);
    }, 3800);
  }

  // ── INTERACTIVE TERMINAL ──
  var termOutput = document.getElementById('ub-term-output');
  var termInput  = document.getElementById('ub-term-input');
  
  var cmdAliases = {
    'help': 'help',
    '帮助': 'help',
    'about': 'about',
    '关于': 'about',
    '档案': 'about',
    '简介': 'about',
    'skills': 'skills',
    '技能': 'skills',
    '技术栈': 'skills',
    'projects': 'projects',
    '工程': 'projects',
    '项目': 'projects',
    '作品': 'projects',
    'contact': 'contact',
    '联系': 'contact',
    '联络': 'contact',
    '邮箱': 'contact',
    'resume': 'resume',
    'cv': 'resume',
    '简历': 'resume',
    'archive': 'archive',
    '归档': 'archive',
    '朝花夕拾': 'archive',
    'snake': 'snake',
    '游戏': 'snake',
    'game': 'snake',
    'stats': 'stats',
    '数据': 'stats',
    '指标': 'stats',
    'clear': 'clear',
    'matrix': 'matrix',
    '黑客帝国': 'matrix',
    'whoami': 'whoami',
    '我是谁': 'whoami',
    'audio': 'audio',
    'sound': 'audio',
    '音效': 'audio',
    'cat': 'cat',
    '清屏': 'clear',
    'cls': 'clear'
  };

  var cmdRegistry = {
    help: function() {
      return [
        '系统可用指令：',
        '  about     - 开发者角色档案与背景简介',
        '  skills    - 核心技术栈与专业技能',
        '  projects  - 代表性生产工程成果',
        '  snake     - 调起赛博贪吃蛇游戏舱并激活控制',
        '  matrix    - 启动黑客帝国字符雨流光矩阵',
        '  whoami    - 探测访客客户端运行环境指标',
        '  cat <f>   - 读取虚拟系统文件 (如 resume, secret)',
        '  audio     - 切换贪吃蛇 8-bit 复古街机音效开关',
        '  resume    - 查看求职简历与在线 PDF 链接',
        '  archive   - 浏览朝花夕拾 78 篇历史成长归档',
        '  contact   - 联络邮箱与开源主页',
        '  stats     - 工程量化数据与遥测指标',
        '  clear     - 清空终端输出缓冲区'
      ];
    },
    about: function() {
      return [
        '姓名: unbrain (刘朝阳)',
        '职位: 资深前端开发工程师 / 前端架构',
        '经验: 7+ 年 (前新浪微博核心 Web 团队主力开发)',
        '专注: Vue 3 · TypeScript · WebGL · 前端架构 · 算法体系'
      ];
    },
    skills: function() {
      return [
        '核心技能矩阵：',
        '  前端工程 : Vue 3, Vite, TypeScript, Tailwind CSS, WebGL/Canvas',
        '  服务端   : Node.js, Egg.js, Redis, WebSocket',
        '  算法沉淀 : 130+ LeetCode DSA 题解推导, Vue 3 核心底层机制'
      ];
    },
    projects: function() {
      return [
        '代表性工程成果：',
        '  [1] PC 微博主站 - 核心富媒体发布器与直传流管线',
        '  [2] PC 微博创作者中心 - 运营中台、抽奖体系与数据看板',
        '  [3] 微博 PC/移动消息箱 - 高并发实时通讯 WebChat 架构',
        '  [4] 瀑布流物料体系 - Vite 8 双端自适应通用物料库'
      ];
    },
    contact: function() {
      return [
        '联络渠道：',
        '  邮箱   : marsorsun@gmail.com',
        '  GitHub : https://github.com/unbrain',
        '  微信   : 18349108862'
      ];
    },
    resume: function() {
      return [
        '求职档案与个人简历：',
        '  完整专页 : /关于我',
        '  在线 PDF : https://rxresu.me/unbrain/cv',
        '  核心经历 : 7+ 年新浪微博核心 Web 团队主力，主导微博 PC 主站、创作者中心、IM 消息箱'
      ];
    },
    archive: function() {
      return [
        '朝花夕拾 · 历史成长档案：',
        '  收录篇数 : 78 篇早期原创技术笔记与求职面试真题',
        '  归档专区 : /朝花夕拾/',
        '  涵盖分类 : JS 核心、网络通信、CSS 响应式、校招求职、工程工具、实战复盘'
      ];
    },
    snake: function() {
      setTimeout(function() {
        var arcade = document.getElementById('ub-arcade');
        if (arcade) {
          arcade.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (termInput) termInput.blur();
          if (typeof window.activateIndexSnake === 'function') {
            window.activateIndexSnake();
          }
        }
      }, 120);
      return [
        '>>> [ARCADE] 正在校准赛博游戏舱空间坐标...',
        '>>> 目标信标: Section #ub-arcade (已平滑导航直达)',
        '>>> 提示: 点击机舱或按 Enter 激活按键接管，按 Esc 解除控制！'
      ];
    },
    matrix: function() {
      setTimeout(function() {
        var termOut = document.getElementById('ub-term-output');
        if (!termOut) return;
        var mCanvas = document.createElement('canvas');
        mCanvas.width = termOut.clientWidth - 32;
        mCanvas.height = 180;
        mCanvas.style.cssText = 'display:block;margin:10px auto;border:1px solid #1e2d3d;border-radius:6px;background:#000;box-shadow:0 0 15px rgba(67,217,173,0.3);';
        termOut.appendChild(mCanvas);
        termOut.scrollTop = termOut.scrollHeight;

        var mCtx = mCanvas.getContext('2d');
        var chars = '01UNBRAINVUE3WEBGLTYPESCRIPTALGORITHMKATEX'.split('');
        var fontSize = 12;
        var cols = Math.floor(mCanvas.width / fontSize);
        var drops = [];
        for (var i = 0; i < cols; i++) drops[i] = 1;

        var mTimer = setInterval(function() {
          mCtx.fillStyle = 'rgba(0, 0, 0, 0.08)';
          mCtx.fillRect(0, 0, mCanvas.width, mCanvas.height);
          mCtx.fillStyle = '#43D9AD';
          mCtx.font = fontSize + 'px "IBM Plex Mono", monospace';
          for (var i = 0; i < drops.length; i++) {
            var textChar = chars[Math.floor(Math.random() * chars.length)];
            mCtx.fillText(textChar, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > mCanvas.height && Math.random() > 0.975) {
              drops[i] = 0;
            }
            drops[i]++;
          }
        }, 33);

        setTimeout(function() {
          clearInterval(mTimer);
          var doneLine = document.createElement('div');
          doneLine.className = 'ub-term-line ub-term-line--muted';
          doneLine.textContent = '>>> [MATRIX] 神经流矩阵推演完毕，神经元连接已释放。';
          termOut.appendChild(doneLine);
          termOut.scrollTop = termOut.scrollHeight;
        }, 5500);
      }, 50);

      return [
        '>>> [MATRIX] 正在注入黑客帝国字符雨流光矩阵...',
        '>>> 协议: Cyberpunk 01 Stream Engine (运行 5.5 秒)'
      ];
    },
    whoami: function() {
      var ua = navigator.userAgent;
      var os = 'Unknown OS';
      if (ua.indexOf('Mac') !== -1) os = 'macOS (Darwin)';
      else if (ua.indexOf('Win') !== -1) os = 'Windows NT';
      else if (ua.indexOf('Linux') !== -1) os = 'Linux Kernel';
      else if (ua.indexOf('Android') !== -1) os = 'Android OS';
      else if (ua.indexOf('iPhone') !== -1) os = 'iOS Mobile';

      var browser = 'Modern Web Browser';
      if (ua.indexOf('Chrome') !== -1) browser = 'Chromium Blink Engine';
      else if (ua.indexOf('Safari') !== -1) browser = 'WebKit Safari';
      else if (ua.indexOf('Firefox') !== -1) browser = 'Gecko Firefox';

      var cores = navigator.hardwareConcurrency ? navigator.hardwareConcurrency + ' Threads' : 'Standard Core';
      var res = screen.width + 'x' + screen.height;
      var lang = navigator.language || 'zh-CN';

      return [
        '>>> [CLIENT TELEMETRY] 访客运行环境遥测报告：',
        '  操作系统   : ' + os,
        '  渲染引擎   : ' + browser,
        '  并发算力   : ' + cores,
        '  屏幕分辨率 : ' + res,
        '  系统语言   : ' + lang,
        '  网络协议   : ' + window.location.protocol.replace(':', '').toUpperCase() + ' / HTTP-2.0',
        '  访客身份   : GUEST_EXPLORER (欢迎来到数字花园与知识卷轴)'
      ];
    },
    audio: function() {
      if (window.CyberSnakeAudio) {
        var nowEnabled = window.CyberSnakeAudio.toggle();
        var soundBtn = document.querySelector('.snake-sound-btn');
        if (soundBtn) {
          soundBtn.textContent = nowEnabled ? 'SOUND: ON [AUDIO]' : 'SOUND: OFF [MUTED]';
          soundBtn.style.color = nowEnabled ? '#43d9ad' : '#607b96';
        }
        return [
          '>>> [AUDIO] 8-Bit 复古街机音频合成器状态：' + (nowEnabled ? 'ENABLED [已开启 音效]' : 'MUTED [已静音]')
        ];
      }
      return ['>>> [AUDIO] 音频合成器未挂载'];
    },
    cat: function(arg) {
      arg = (arg || '').trim().toLowerCase();
      if (arg === 'resume' || arg === 'cv') {
        return [
          '# 个人简历简报 · UNBRAIN',
          '姓名: 刘朝阳 | 经验: 7+ 年资深前端开发',
          '主导: 新浪微博 PC 旗舰门户、创作者中心、高并发 IM 消息箱',
          '在线完整版: /关于我'
        ];
      } else if (arg === 'secret') {
        return [
          '>>> [CLASSIFIED SECRET] 42',
          '"The Answer to the Ultimate Question of Life, the Universe, and Everything."'
        ];
      } else if (arg === 'manifesto') {
        return [
          '>>> [ENGINEERING MANIFESTO]',
          '追求每一行代码的可验证性与工业级健壮性。',
          '没有证据就不说完成。'
        ];
      }
      return [
        'cat: 未指定有效文件或文件不存在。可输入:',
        '  cat resume    - 查看简历简报',
        '  cat secret    - 解锁终端彩蛋',
        '  cat manifesto - 查看工程信条'
      ];
    },
    stats: function() {
      return [
        '工程遥测数据：',
        '  知识卷轴 : 80+ 篇系统化技术与架构笔记',
        '  算法题解 : 130+ 道精选算法深度剖析与推导',
        '  用户规模 : 1 亿+ 生产环境峰值并发流量护航'
      ];
    },
    clear: function() {
      termOutput.innerHTML = '';
      return [];
    }
  };

  function execCmd(raw) {
    var cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    var echo = document.createElement('div');
    echo.className = 'ub-term-line ub-term-line--cmd';
    echo.innerHTML = '<span class="ub-term-prompt">unbrain&gt;</span> ' + escapeHtml(cmd);
    termOutput.appendChild(echo);

    var parts = cmd.split(/\s+/);
    var mainCmd = parts[0];
    var cmdArg = parts.slice(1).join(' ');
    var resolvedCmd = cmdAliases[mainCmd] || mainCmd;

    if (cmdRegistry[resolvedCmd]) {
      var lines = cmdRegistry[resolvedCmd](cmdArg);
      lines.forEach(function(l) {
        var out = document.createElement('div');
        out.className = 'ub-term-line';
        out.textContent = l;
        termOutput.appendChild(out);
      });
    } else {
      var err = document.createElement('div');
      err.className = 'ub-term-line ub-term-line--err';
      err.textContent = 'zsh: 未找到指令: ' + cmd + ' (可输入 "help" 查看所有支持的指令)';
      termOutput.appendChild(err);
    }
    termOutput.scrollTop = termOutput.scrollHeight;
  }

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  if (termInput) {
    termInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        execCmd(this.value);
        this.value = '';
      }
    });
  }

  document.querySelectorAll('.ub-term-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var cmd = this.dataset.cmd;
      if (cmd) execCmd(cmd);
    });
  });

  // ── INLINED 3D SACRED OBSIDIAN SHARD ENGINE (THREE.JS + RAYMARCHING SDF) ──
/**
 * obsidian-shard.js
 * Pure Asymmetrical Knapped Obsidian Shard (Inspired by Obsidian App Icon)
 * High-Performance Hardware Raymarching Shader with Balanced Studio Lighting & 360° Orbit
 * Ported from callmejesus (SacredCrossBackground.vue) for unbrain. Obsidian Vault Wiki
 */
(function initObsidianEngine() {
  var shardInstance = null;

  function loadThree(cb) {
    if (typeof THREE !== 'undefined') {
      cb();
      return;
    }
    var existing = document.querySelector('script[data-three-loader]');
    if (existing) {
      existing.addEventListener('load', cb);
      return;
    }
    var s = document.createElement('script');
    s.setAttribute('data-three-loader', 'true');
    s.src = '/static/three.min.js';
    s.async = true;
    s.onload = cb;
    s.onerror = function() {
      console.warn('[Obsidian] Local three.min.js failed to load, falling back to CDN');
      var cdn = document.createElement('script');
      cdn.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      cdn.async = true;
      cdn.onload = cb;
      document.head.appendChild(cdn);
    };
    document.head.appendChild(s);
  }

  function createShard(hero) {
    // 移除旧 canvas
    var oldCube = document.getElementById('ub-cubeCanvas');
    if (oldCube) oldCube.remove();
    var oldCanvas = document.getElementById('ub-obsidianCanvas');
    if (oldCanvas) oldCanvas.remove();

    var canvas = document.createElement('canvas');
    canvas.id = 'ub-obsidianCanvas';
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none;';
    hero.appendChild(canvas);

    var renderer = null;
    var scene = null;
    var camera = null;
    var quadMesh = null;
    var shaderMaterial = null;
    var rafId = null;

    var lastTime = performance.now();
    var elapsed = 0;
    var isRunning = false;
    var isHeroVisible = true;
    var isTabActive = !document.hidden;

    var pointer = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
      orbitAngleTarget: 0,
      orbitAngleCurrent: 0
    };

    var isDragging = false;
    var dragStartX = 0;
    var dragStartOrbit = 0;

    var VERT_SHADER = [
      'varying vec2 vUv;',
      'void main() {',
      '  vUv = uv;',
      '  gl_Position = vec4(position, 1.0);',
      '}'
    ].join('\n');

    var FRAG_SHADER = [
      'precision highp float;',
      'varying vec2 vUv;',
      'uniform vec2 uResolution;',
      'uniform float uTime;',
      'uniform vec2 uPointer;',
      'uniform float uOrbitAngle;',

      // Analytic smooth-max operator
      'float smax(float a, float b, float k) {',
      '    float h = max(k - abs(a - b), 0.0);',
      '    return max(a, b) + h * h * 0.25 / k;',
      '}',

      'mat2 rot2D(float a) {',
      '    float c = cos(a), s = sin(a);',
      '    return mat2(c, -s, s, c);',
      '}',

      /**
       * Pure Asymmetrical Knapped Obsidian Shard (Inspired by Obsidian App Icon)
       * 100% Zero Noise, Zero Artificial Wireframes, Perfectly Centered
       */
      'float mapSDF(vec3 p) {',
      '    vec3 pos = p;',
      '    pos.x += 0.055;',
      '    pos.y -= 0.12;',
      '    pos.xz = rot2D(uOrbitAngle + sin(uTime * 0.22) * 0.03) * pos.xz;',
      '    pos.yz = rot2D(uPointer.y * 0.45 + cos(uTime * 0.28) * 0.025) * pos.yz;',
      '    const float SCALE = 0.92;',
      '    vec3 q = pos * SCALE;',
      '    float d1 = dot(q, vec3(-0.638, 0.736, 0.147)) - 0.55;',
      '    float d2 = dot(q, vec3(0.536, 0.779, 0.214)) - 0.62;',
      '    float d3 = dot(q, vec3(-0.395, 0.079, 0.899)) - 0.16;',
      '    float d4 = dot(q, vec3(0.613, -0.099, 0.761)) - 0.18;',
      '    float d5 = dot(q, vec3(-0.916, -0.318, 0.199)) - 0.32;',
      '    float d6 = dot(q, vec3(0.871, 0.119, -0.445)) - 0.34;',
      '    float d7 = dot(q, vec3(0.344, -0.904, 0.147)) - 0.68;',
      '    float d8 = dot(q, vec3(-0.584, -0.730, -0.243)) - 0.52;',
      '    float d9 = -q.z - 0.15;',
      '    float d10 = dot(q, vec3(0.348, 0.448, -0.816)) - 0.22;',
      '    const float BEVEL = 0.010;',
      '    float d = smax(d1, d2, BEVEL);',
      '    d = smax(d, d3, BEVEL);',
      '    d = smax(d, d4, BEVEL);',
      '    d = smax(d, d5, BEVEL);',
      '    d = smax(d, d6, BEVEL);',
      '    d = smax(d, d7, BEVEL);',
      '    d = smax(d, d8, BEVEL);',
      '    d = smax(d, d9, BEVEL);',
      '    d = smax(d, d10, BEVEL);',
      '    return d / SCALE;',
      '}',

      'vec3 calcNormal(vec3 p) {',
      '    const vec2 e = vec2(0.002, -0.002);',
      '    return normalize(',
      '        e.xyy * mapSDF(p + e.xyy) +',
      '        e.yyx * mapSDF(p + e.yyx) +',
      '        e.yxy * mapSDF(p + e.yxy) +',
      '        e.xxx * mapSDF(p + e.xxx)',
      '    );',
      '}',

      // High-Contrast Cyber-Studio Reflection Map (剔除平庸灰度，打造高反差黑曜石影棚反光)
      'vec3 studioEnvironment(vec3 d) {',
      '    vec3 col = vec3(0.004, 0.005, 0.007);',
      '    // 主柔光箱：上方偏右暖金条形流光箱',
      '    float softboxKey = smoothstep(0.25, 0.75, d.y) * smoothstep(-0.25, 0.45, d.x) * smoothstep(0.85, 0.15, d.x);',
      '    col += vec3(1.0, 0.84, 0.48) * softboxKey * 1.9;',
      '    // 侧翼柔光箱：右侧刀锋侧逆光 (暖金)',
      '    float rimBoxR = smoothstep(0.65, 0.98, d.x) * smoothstep(-0.4, 0.6, d.y);',
      '    col += vec3(0.96, 0.78, 0.40) * rimBoxR * 2.4;',
      '    // 侧翼柔光箱：左侧冷冽青月光 (与站点主题 #43D9AD 呼应)',
      '    float rimBoxL = smoothstep(-0.65, -0.98, d.x) * smoothstep(-0.35, 0.55, d.y);',
      '    col += vec3(0.26, 0.85, 0.68) * rimBoxL * 1.8;',
      '    // 顶部锐利天顶聚光',
      '    float topSpot = pow(max(0.0, d.y), 8.0) * 1.6;',
      '    col += vec3(0.98, 0.96, 0.92) * topSpot;',
      '    return col;',
      '}',

      'void main() {',
      '    vec2 ndc = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;',
      '    vec3 ro = vec3(0.0, 0.0, 5.0);',
      '    vec3 rd = normalize(vec3(ndc, -2.4));',

      '    float breath = 0.5 + 0.5 * sin(uTime * 1.05);',
      '    float auraFalloff = 4.2 - 0.6 * breath;',
      '    float auraIntensity = 0.045 + 0.04 * breath;',

      '    float bgDist = length(ndc - vec2(0.0, 0.12));',
      '    float aura = exp(-bgDist * auraFalloff) * auraIntensity;',

      '    float t = 1.0;',
      '    float d = 0.0;',
      '    for (int i = 0; i < 64; i++) {',
      '        vec3 p = ro + rd * t;',
      '        d = mapSDF(p);',
      '        if (d < 0.0008 || t > 9.0) break;',
      '        t += d * 0.85;',
      '    }',

      '    if (d < 0.0008 && t <= 9.0) {',
      '        vec3 p = ro + rd * t;',
      '        vec3 n = calcNormal(p);',
      '        vec3 v = -rd;',
      '        vec3 reflDir = reflect(rd, n);',

      '        // 1. 深渊黑曜石矿物基底 (Pure Deep Glassy Obsidian Base)',
      '        // 极低漫反射，保留微弱立体切面阴阳面，绝不泛白起灰',
      '        float facetLightL = max(0.0, dot(n, normalize(vec3(-0.6, 0.6, 0.5)))) * 0.018;',
      '        float facetLightR = max(0.0, dot(n, normalize(vec3(0.6, 0.6, 0.5)))) * 0.020;',
      '        float topLight = max(0.0, dot(n, normalize(vec3(0.0, 1.0, 0.2)))) * 0.024;',
      '        vec3 obsidianBase = vec3(0.010, 0.011, 0.014) + vec3(facetLightL + facetLightR + topLight) * vec3(0.9, 0.85, 0.78);',

      '        // 2. 镜面高光 (Sharp Specular Highlights - 天然火山玻璃的镜面耀光与耀白核心)',
      '        vec3 lightKey = normalize(vec3(0.55, 0.80, 0.65));',
      '        vec3 lightRimL = normalize(vec3(-0.85, 0.0, 0.55));',
      '        vec3 lightRimR = normalize(vec3(0.85, 0.15, 0.50));',

      '        // 主光：暖金耀斑 + 耀白核心',
      '        float specKey = pow(max(0.0, dot(reflDir, lightKey)), 42.0);',
      '        float specKeyCore = pow(max(0.0, dot(reflDir, lightKey)), 160.0);',
      '        vec3 specKeyCol = (vec3(1.0, 0.82, 0.45) * specKey + vec3(1.0, 0.98, 0.92) * specKeyCore * 1.8) * 1.3;',

      '        // 侧翼高光：左侧赛博青 + 右侧辉金',
      '        float specRimL = pow(max(0.0, dot(reflDir, lightRimL)), 36.0);',
      '        vec3 specRimLCol = vec3(0.26, 0.85, 0.68) * specRimL * 1.2;',

      '        float specRimR = pow(max(0.0, dot(reflDir, lightRimR)), 38.0);',
      '        vec3 specRimRCol = vec3(1.0, 0.80, 0.42) * specRimR * 1.1;',

      '        vec3 specular = specKeyCol + specRimLCol + specRimRCol;',

      '        // 3. 菲涅尔边缘流光 (Crisp Fresnel Edge Reflections)',
      '        // 指数提升至 4.2，流光紧贴锋利外轮廓与切割刃部，正面保持通透黑',
      '        float fresnel = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 4.2);',
      '        vec3 envRefl = studioEnvironment(reflDir);',
      '        float edgeBreath = 0.90 + 0.20 * breath;',
      '        vec3 rimFresnel = envRefl * (fresnel * 3.2 * edgeBreath);',

      '        // 4. 彩虹黑曜石微质感薄膜彩晕 (Subtle Glassy Iridescence)',
      '        // 在菲涅尔与切面交界处赋予通透灵动的金绿干涉光，拒绝单调泥滞',
      '        float sheenFactor = pow(fresnel, 2.2) * (1.0 - fresnel) * 0.55;',
      '        vec3 sheenCol = mix(vec3(0.96, 0.82, 0.45), vec3(0.26, 0.85, 0.68), clamp(n.x * 0.5 + 0.5, 0.0, 1.0)) * sheenFactor;',

      '        // 最终合成',
      '        vec3 color = obsidianBase + specular + rimFresnel + sheenCol;',
      '        gl_FragColor = vec4(color, 1.0);',
      '    } else {',
      '        // 背景光晕：更聚焦通透的神秘金青微光，消除外圈灰黄浊雾',
      '        float bgAura = aura * 1.1;',
      '        vec3 auraCol = mix(vec3(0.95, 0.78, 0.38), vec3(0.26, 0.85, 0.68), clamp(ndc.x * 0.35 + 0.5, 0.0, 1.0));',
      '        gl_FragColor = vec4(auraCol * bgAura * 1.4, bgAura * 1.1);',
      '    }',
      '}'
    ].join('\n');

    function updateDrawingBufferSize() {
      if (!renderer || !shaderMaterial) return;
      var drawSize = new THREE.Vector2();
      renderer.getDrawingBufferSize(drawSize);
      shaderMaterial.uniforms.uResolution.value.copy(drawSize);
    }

    function initScene() {
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      var geometry = new THREE.PlaneGeometry(2, 2);

      shaderMaterial = new THREE.ShaderMaterial({
        vertexShader: VERT_SHADER,
        fragmentShader: FRAG_SHADER,
        uniforms: {
          uResolution: { value: new THREE.Vector2(hero.offsetWidth || window.innerWidth, hero.offsetHeight || window.innerHeight) },
          uTime: { value: 0 },
          uPointer: { value: new THREE.Vector2(0, 0) },
          uOrbitAngle: { value: 0 }
        },
        depthWrite: false,
        depthTest: false
      });

      quadMesh = new THREE.Mesh(geometry, shaderMaterial);
      scene.add(quadMesh);

      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setClearColor(0x000000, 0);
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(hero.offsetWidth || window.innerWidth, hero.offsetHeight || window.innerHeight);

      updateDrawingBufferSize();
    }

    function animate(now) {
      if (!isRunning) return;
      rafId = requestAnimationFrame(animate);

      if (!isHeroVisible || !isTabActive) return;

      var dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      elapsed += dt;

      pointer.currentX += (pointer.targetX - pointer.currentX) * Math.min(dt * 3.5, 1);
      pointer.currentY += (pointer.targetY - pointer.currentY) * Math.min(dt * 3.5, 1);
      pointer.orbitAngleCurrent += (pointer.orbitAngleTarget - pointer.orbitAngleCurrent) * Math.min(dt * 4.0, 1);

      if (shaderMaterial) {
        shaderMaterial.uniforms.uTime.value = elapsed;
        shaderMaterial.uniforms.uPointer.value.set(pointer.currentX, pointer.currentY);
        shaderMaterial.uniforms.uOrbitAngle.value = pointer.orbitAngleCurrent;
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    }

    function start() {
      if (isRunning) return;
      isRunning = true;
      lastTime = performance.now();
      rafId = requestAnimationFrame(animate);
    }

    function stop() {
      isRunning = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    function isInteractive(target) {
      return !!(target && target.closest && target.closest('a, button, input, textarea, select, [role="button"], #ub-nav, #ub-nav-drawer'));
    }

    function onMouseMove(e) {
      var normX = (e.clientX / window.innerWidth) * 2 - 1;
      var normY = -(e.clientY / window.innerHeight) * 2 + 1;
      pointer.targetX = normX;
      pointer.targetY = normY;
      if (!isDragging) {
        pointer.orbitAngleTarget = normX * Math.PI;
      }
    }

    function onMouseDown(e) {
      if (isInteractive(e.target)) return;
      isDragging = true;
      dragStartX = e.clientX;
      dragStartOrbit = pointer.orbitAngleCurrent;
    }

    function onMouseUp() {
      isDragging = false;
    }

    function onMouseDragMove(e) {
      if (!isDragging) return;
      var deltaX = e.clientX - dragStartX;
      var radDelta = (deltaX / window.innerWidth) * (Math.PI * 2);
      pointer.orbitAngleTarget = dragStartOrbit + radDelta;
    }

    function onTouchStart(e) {
      if (e.touches && e.touches[0]) {
        if (isInteractive(e.target)) return;
        isDragging = true;
        dragStartX = e.touches[0].clientX;
        dragStartOrbit = pointer.orbitAngleCurrent;
      }
    }

    function onTouchMove(e) {
      if (e.touches && e.touches[0]) {
        var clientX = e.touches[0].clientX;
        var clientY = e.touches[0].clientY;
        pointer.targetX = (clientX / window.innerWidth) * 2 - 1;
        pointer.targetY = -(clientY / window.innerHeight) * 2 + 1;

        if (isDragging) {
          var deltaX = clientX - dragStartX;
          var radDelta = (deltaX / window.innerWidth) * (Math.PI * 2);
          pointer.orbitAngleTarget = dragStartOrbit + radDelta;
        }
      }
    }

    function onTouchEnd() {
      isDragging = false;
    }

    function onResize() {
      if (!renderer || !shaderMaterial || !hero) return;
      var w = hero.offsetWidth || window.innerWidth;
      var h = hero.offsetHeight || window.innerHeight;
      renderer.setSize(w, h);
      updateDrawingBufferSize();
    }

    function onVisibilityChange() {
      isTabActive = !document.hidden;
      if (isTabActive && isHeroVisible) {
        start();
      } else {
        stop();
      }
    }

    var heroObs = null;
    if ('IntersectionObserver' in window && hero) {
      heroObs = new IntersectionObserver(function(entries) {
        isHeroVisible = entries[0].isIntersecting;
        if (isHeroVisible && isTabActive) {
          start();
        } else {
          stop();
        }
      }, { threshold: 0.05 });
      heroObs.observe(hero);
    }

    initScene();
    start();

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousemove', onMouseDragMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    return {
      destroy: function() {
        stop();
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mousemove', onMouseDragMove);
        window.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mouseup', onMouseUp);

        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);

        window.removeEventListener('resize', onResize);
        document.removeEventListener('visibilitychange', onVisibilityChange);

        if (heroObs) heroObs.disconnect();

        if (quadMesh && quadMesh.geometry) {
          quadMesh.geometry.dispose();
        }
        if (shaderMaterial) {
          shaderMaterial.dispose();
        }
        if (renderer) {
          renderer.dispose();
        }
        if (canvas && canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }

        renderer = null;
        scene = null;
        camera = null;
        quadMesh = null;
        shaderMaterial = null;
        canvas = null;
      }
    };
  }

  function init() {
    var hero = document.getElementById('ub-hero');
    if (!hero) {
      if (shardInstance) {
        shardInstance.destroy();
        shardInstance = null;
      }
      return;
    }
    if (shardInstance) {
      shardInstance.destroy();
      shardInstance = null;
    }
    loadThree(function() {
      if (typeof THREE === 'undefined') return;
      var currentHero = document.getElementById('ub-hero');
      if (!currentHero) return;
      shardInstance = createShard(currentHero);
    });
  }

  window.initObsidianShard = init;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('nav', init);

  if (typeof window.addCleanup === 'function') {
    window.addCleanup(function() {
      if (shardInstance) {
        shardInstance.destroy();
        shardInstance = null;
      }
    });
  }
})();




  // ── INLINED 07 CYBER ARCADE RETRO SNAKE ──
/**
 * Retro Cyberpunk Particle Snake Game Engine v3.0 (with 8-Bit Web Audio Synthesizer)
 * Extracted & upgraded from cv project (SnakeContainer.vue / Snake.vue)
 * Zero external audio dependencies - 100% native Web Audio API square/sawtooth synthesis
 */
(function() {
  // ── 8-BIT RETRO AUDIO SYNTHESIZER ──
  var AudioSynth = (function() {
    var ctx = null;
    var soundEnabled = localStorage.getItem('cyberSnakeSound') !== 'false';

    function getContext() {
      if (!ctx && (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined')) {
        var AudioCtx = window.AudioContext || window.webkitAudioContext;
        ctx = new AudioCtx();
      }
      if (ctx && ctx.state === 'suspended') {
        ctx.resume();
      }
      return ctx;
    }

    function playTone(freq, type, duration, gainVal, slideToFreq) {
      if (!soundEnabled) return;
      var c = getContext();
      if (!c) return;

      try {
        var osc = c.createOscillator();
        var gain = c.createGain();
        osc.type = type || 'square';
        osc.frequency.setValueAtTime(freq, c.currentTime);
        if (slideToFreq) {
          osc.frequency.exponentialRampToValueAtTime(Math.max(20, slideToFreq), c.currentTime + duration);
        }

        gain.gain.setValueAtTime(gainVal || 0.05, c.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);

        osc.connect(gain);
        gain.connect(c.destination);

        osc.start();
        osc.stop(c.currentTime + duration);
      } catch (e) {}
    }

    return {
      turn: function() {
        playTone(180, 'square', 0.04, 0.03, 240);
      },
      eat: function() {
        playTone(440, 'square', 0.06, 0.06, 660);
        setTimeout(function() {
          playTone(660, 'square', 0.08, 0.07, 880);
        }, 50);
      },
      crash: function() {
        playTone(220, 'sawtooth', 0.35, 0.08, 40);
      },
      record: function() {
        playTone(523, 'square', 0.08, 0.06);
        setTimeout(function() { playTone(659, 'square', 0.08, 0.06); }, 70);
        setTimeout(function() { playTone(784, 'square', 0.14, 0.07); }, 140);
      },
      isEnabled: function() {
        return soundEnabled;
      },
      toggle: function() {
        soundEnabled = !soundEnabled;
        localStorage.setItem('cyberSnakeSound', soundEnabled);
        getContext();
        return soundEnabled;
      },
      set: function(val) {
        soundEnabled = !!val;
        localStorage.setItem('cyberSnakeSound', soundEnabled);
        getContext();
        return soundEnabled;
      }
    };
  })();

  window.CyberSnakeAudio = AudioSynth;

  function createCyberSnake(containerId, options) {
    var container = document.getElementById(containerId);
    if (!container) return null;

    options = options || {};
    var isIndexMode = options.isIndexMode || false;

    var canvas = container.querySelector('canvas');
    var scoreDom = container.querySelector('.snake-score-val');
    var maxScoreDom = container.querySelector('.snake-maxscore-val');
    var replayBtn = container.querySelector('.snake-replay-btn');
    var soundBtn = container.querySelector('.snake-sound-btn');
    var statusText = container.querySelector('.snake-status-text');
    var overlay = container.querySelector('.ub-snake-overlay');
    var chassis = container.closest('.ub-snake-chassis') || container;

    if (!canvas) {
      canvas = document.createElement('canvas');
      container.appendChild(canvas);
    }

    var CTX = canvas.getContext('2d');
    var W = (canvas.width = 240);
    var H = (canvas.height = 320);

    var snake, food;
    var cells = 20;
    var cellSize = W / cells;
    var isGameOver = false;
    var isRunning = false;
    var isFocused = !isIndexMode;
    var score = 0;
    var maxScore = parseInt(localStorage.getItem('cyberSnakeMax') || '0', 10);
    if (maxScoreDom) maxScoreDom.textContent = maxScore.toString().padStart(2, '0');
    var particles = [];
    var splashingParticleCount = 18;
    var animFrame = null;
    var isVisible = true;

    function updateSoundBtnUI() {
      if (soundBtn) {
        soundBtn.textContent = AudioSynth.isEnabled() ? 'SOUND: ON [AUDIO]' : 'SOUND: OFF [MUTED]';
        soundBtn.style.color = AudioSynth.isEnabled() ? '#43d9ad' : '#607b96';
      }
    }
    updateSoundBtnUI();

    if (soundBtn) {
      soundBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        AudioSynth.toggle();
        updateSoundBtnUI();
      });
    }

    var Vec = function(x, y) {
      this.x = x;
      this.y = y;
    };
    Vec.prototype.add = function(v) {
      this.x += v.x;
      this.y += v.y;
      return this;
    };

    function isCollision(v1, v2) {
      return Math.abs(v1.x - v2.x) < 0.1 && Math.abs(v1.y - v2.y) < 0.1;
    }

    var KEY = {
      ArrowUp: false,
      ArrowRight: false,
      ArrowDown: false,
      ArrowLeft: false,
      reset: function() {
        this.ArrowUp = this.ArrowRight = this.ArrowDown = this.ArrowLeft = false;
      }
    };

    function setFocus(active) {
      isFocused = active;
      if (chassis) {
        if (active) chassis.classList.add('is-active');
        else chassis.classList.remove('is-active');
      }
      if (overlay) {
        if (active) overlay.classList.add('is-hidden');
        else overlay.classList.remove('is-hidden');
      }
    }

    function setDirection(dir) {
      if (!isFocused && isIndexMode) {
        setFocus(true);
      }
      if (isGameOver) {
        resetGame();
        return;
      }
      var turned = false;
      if (dir === 'up' && !KEY.ArrowDown && snake.dir.y === 0) {
        KEY.reset();
        KEY.ArrowUp = true;
        turned = true;
      } else if (dir === 'down' && !KEY.ArrowUp && snake.dir.y === 0) {
        KEY.reset();
        KEY.ArrowDown = true;
        turned = true;
      } else if (dir === 'left' && !KEY.ArrowRight && snake.dir.x === 0) {
        KEY.reset();
        KEY.ArrowLeft = true;
        turned = true;
      } else if (dir === 'right' && !KEY.ArrowLeft && snake.dir.x === 0) {
        KEY.reset();
        KEY.ArrowRight = true;
        turned = true;
      }
      if (turned) {
        AudioSynth.turn();
      }
    }

    function onKeyDown(e) {
      if (!document.getElementById(containerId)) {
        destroy();
        return;
      }

      if (e.key === 'Escape' && isIndexMode) {
        setFocus(false);
        return;
      }

      if (isIndexMode && !isFocused) {
        if (e.key === 'Enter') {
          setFocus(true);
          e.preventDefault();
        }
        return;
      }

      var handledKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'w', 'W', 's', 'S', 'a', 'A', 'd', 'D'];
      if (handledKeys.indexOf(e.key) !== -1) {
        e.preventDefault();
      }

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') setDirection('up');
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') setDirection('down');
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') setDirection('left');
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') setDirection('right');
      if (e.key === ' ' && isGameOver) resetGame();
    }

    window.addEventListener('keydown', onKeyDown);

    function onContainerClick() {
      if (isIndexMode && !isFocused) {
        setFocus(true);
      }
    }
    container.addEventListener('click', onContainerClick);

    function onDocClick(e) {
      if (isIndexMode && isFocused) {
        if (!container.contains(e.target) && !chassis.contains(e.target)) {
          setFocus(false);
        }
      }
    }
    document.addEventListener('click', onDocClick);

    container.querySelectorAll('[data-dir]').forEach(function(btn) {
      function handleDir(e) {
        if (e.type === 'touchstart') e.preventDefault();
        e.stopPropagation();
        if (isIndexMode && !isFocused) {
          setFocus(true);
        }
        setDirection(btn.getAttribute('data-dir'));
      }
      btn.addEventListener('touchstart', handleDir, { passive: false });
      btn.addEventListener('click', handleDir);
    });

    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      var overTitle = container.querySelector('.overlay-title');
      var overSub = container.querySelector('.overlay-sub');
      if (overTitle) overTitle.textContent = '[ 点击激活触控手柄 ]';
      if (overSub) overSub.textContent = '// 点击下方十字方向键操控';
    }

    if (replayBtn) {
      replayBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        resetGame();
      });
    }

    function Snake() {
      this.pos = new Vec(Math.floor(cells / 2) * cellSize, Math.floor(H / cellSize / 2) * cellSize);
      this.dir = new Vec(0, 0);
      this.delay = 6;
      this.stepCountdown = this.delay;
      this.size = cellSize;
      this.color = '#43D9AD';
      this.history = [];
      this.total = 2;
    }

    Snake.prototype.draw = function() {
      CTX.fillStyle = '#43D9AD';
      CTX.shadowBlur = 10;
      CTX.shadowColor = 'rgba(67, 217, 173, 0.7)';
      CTX.fillRect(this.pos.x + 1, this.pos.y + 1, this.size - 2, this.size - 2);
      CTX.shadowBlur = 0;

      CTX.fillStyle = 'rgba(67, 217, 173, 0.75)';
      for (var i = 0; i < this.history.length; i++) {
        var p = this.history[i];
        CTX.fillRect(p.x + 1, p.y + 1, this.size - 2, this.size - 2);
      }
    };

    Snake.prototype.walls = function() {
      if (this.pos.x >= W) this.pos.x = 0;
      if (this.pos.y >= H) this.pos.y = 0;
      if (this.pos.x < 0) this.pos.x = W - cellSize;
      if (this.pos.y < 0) this.pos.y = H - cellSize;
    };

    Snake.prototype.controls = function() {
      var d = this.size;
      if (KEY.ArrowUp) this.dir = new Vec(0, -d);
      if (KEY.ArrowDown) this.dir = new Vec(0, d);
      if (KEY.ArrowLeft) this.dir = new Vec(-d, 0);
      if (KEY.ArrowRight) this.dir = new Vec(d, 0);
    };

    Snake.prototype.selfCollision = function() {
      for (var i = 0; i < this.history.length; i++) {
        if (isCollision(this.pos, this.history[i])) {
          isGameOver = true;
          AudioSynth.crash();
        }
      }
    };

    Snake.prototype.update = function() {
      this.controls();
      this.walls();
      this.draw();

      if (--this.stepCountdown <= 0) {
        this.stepCountdown = this.delay;

        if (this.dir.x !== 0 || this.dir.y !== 0) {
          if (isCollision(this.pos, food.pos)) {
            incrementScore();
            particleSplash();
            AudioSynth.eat();
            food.spawn();
            this.total++;
            if (this.total % 5 === 0 && this.delay > 3) {
              this.delay--;
            }
          }

          this.history.push(new Vec(this.pos.x, this.pos.y));
          while (this.history.length > this.total) {
            this.history.shift();
          }

          this.pos.add(this.dir);
          if (this.total > 2) {
            this.selfCollision();
          }
        }
      }
    };

    function Food() {
      this.size = cellSize;
      this.pos = new Vec(0, 0);
      this.spawn();
    }

    Food.prototype.spawn = function() {
      var cols = Math.floor(W / cellSize);
      var rows = Math.floor(H / cellSize);
      var randX = Math.floor(Math.random() * cols) * cellSize;
      var randY = Math.floor(Math.random() * rows) * cellSize;

      if (snake) {
        for (var i = 0; i < snake.history.length; i++) {
          if (snake.history[i].x === randX && snake.history[i].y === randY) {
            return this.spawn();
          }
        }
      }
      this.pos = new Vec(randX, randY);
    };

    Food.prototype.draw = function() {
      CTX.shadowBlur = 12;
      CTX.shadowColor = '#fea55f';
      CTX.fillStyle = '#fea55f';
      CTX.fillRect(this.pos.x + 2, this.pos.y + 2, this.size - 4, this.size - 4);
      CTX.shadowBlur = 0;
    };

    function Particle(pos, vel) {
      this.pos = new Vec(pos.x, pos.y);
      this.vel = vel;
      this.size = 4;
      this.ttl = 25;
    }

    Particle.prototype.update = function() {
      this.pos.add(this.vel);
      this.size = Math.max(0, this.size - 0.15);
      this.ttl--;
      CTX.fillStyle = 'rgba(67, 217, 173, ' + (this.ttl / 25) + ')';
      CTX.fillRect(this.pos.x, this.pos.y, this.size, this.size);
    };

    function incrementScore() {
      score++;
      if (scoreDom) scoreDom.textContent = score.toString().padStart(2, '0');
      if (score > maxScore) {
        var isNewRecord = (maxScore > 0 && score === maxScore + 1);
        maxScore = score;
        localStorage.setItem('cyberSnakeMax', maxScore);
        if (maxScoreDom) maxScoreDom.textContent = maxScore.toString().padStart(2, '0');
        if (isNewRecord) {
          AudioSynth.record();
        }
      }
    }

    function particleSplash() {
      for (var i = 0; i < splashingParticleCount; i++) {
        var vel = new Vec((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5);
        particles.push(new Particle(food.pos, vel));
      }
    }

    function drawGrid() {
      CTX.lineWidth = 0.5;
      CTX.strokeStyle = 'rgba(30, 45, 61, 0.4)';
      for (var x = 0; x < W; x += cellSize) {
        CTX.beginPath();
        CTX.moveTo(x, 0);
        CTX.lineTo(x, H);
        CTX.stroke();
      }
      for (var y = 0; y < H; y += cellSize) {
        CTX.beginPath();
        CTX.moveTo(0, y);
        CTX.lineTo(W, y);
        CTX.stroke();
      }
    }

    function loop() {
      if (!isRunning || !isVisible) return;

      CTX.fillStyle = '#011221';
      CTX.fillRect(0, 0, W, H);
      drawGrid();

      if (!isGameOver) {
        snake.update();
        food.draw();

        for (var i = particles.length - 1; i >= 0; i--) {
          particles[i].update();
          if (particles[i].ttl <= 0 || particles[i].size <= 0) {
            particles.splice(i, 1);
          }
        }

        if (statusText) {
          if (snake.dir.x === 0 && snake.dir.y === 0) {
            statusText.textContent = isFocused ? '按方向键行动' : '待命模式';
          } else {
            statusText.textContent = '信号追踪中...';
          }
        }

        animFrame = requestAnimationFrame(loop);
      } else {
        CTX.fillStyle = 'rgba(1, 18, 33, 0.85)';
        CTX.fillRect(0, 0, W, H);
        CTX.fillStyle = '#ff6b6b';
        CTX.font = '16px "IBM Plex Mono", monospace';
        CTX.textAlign = 'center';
        CTX.fillText('CRASH DETECTED', W / 2, H / 2 - 15);
        CTX.fillStyle = '#e5e9f0';
        CTX.font = '12px "IBM Plex Mono", monospace';
        CTX.fillText('按空格或点击重试', W / 2, H / 2 + 15);
        if (statusText) statusText.textContent = '连接中断 · GAME OVER';
      }
    }

    function resetGame() {
      if (animFrame) cancelAnimationFrame(animFrame);
      isGameOver = false;
      score = 0;
      if (scoreDom) scoreDom.textContent = '00';
      KEY.reset();
      particles = [];
      snake = new Snake();
      food = new Food();
      isRunning = true;
      loop();
    }

    var observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          isVisible = entry.isIntersecting;
          if (isVisible && isRunning && !animFrame) {
            loop();
          }
        });
      }, { threshold: 0.1 });
      observer.observe(container);
    }

    function destroy() {
      isRunning = false;
      if (animFrame) cancelAnimationFrame(animFrame);
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onDocClick);
      if (observer) observer.disconnect();
    }

    if (typeof window.addCleanup === 'function') {
      window.addCleanup(destroy);
    }

    resetGame();

    return {
      focus: function() { setFocus(true); },
      blur: function() { setFocus(false); },
      reset: resetGame,
      destroy: destroy
    };
  }

  var indexInstance = null;
  var notFoundInstance = null;

  function initArcade() {
    if (document.getElementById('index-snake-container')) {
      if (indexInstance) indexInstance.destroy();
      indexInstance = createCyberSnake('index-snake-container', { isIndexMode: true });
    }
    if (document.getElementById('cyber-snake-container')) {
      if (notFoundInstance) notFoundInstance.destroy();
      notFoundInstance = createCyberSnake('cyber-snake-container', { isIndexMode: false });
    }
  }

  window.activateIndexSnake = function() {
    if (indexInstance) {
      indexInstance.focus();
    }
  };

  window.initCyberSnake = function(id) {
    if (id === 'cyber-snake-container') {
      if (notFoundInstance) notFoundInstance.destroy();
      notFoundInstance = createCyberSnake(id, { isIndexMode: false });
    } else {
      initArcade();
    }
  };

  document.addEventListener('nav', initArcade);
  document.addEventListener('DOMContentLoaded', initArcade);
})();


  // ── MOBILE DRAWER & FLOATING TOP ──
  var navToggle   = document.getElementById('ub-nav-toggle');
  var navDrawer   = document.getElementById('ub-nav-drawer');
  var drawerClose = document.getElementById('ub-drawer-close');
  function toggleDrawer(open) {
    if (navDrawer) {
      navDrawer.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }
  }
  if (navToggle)   navToggle.addEventListener('click', function() { toggleDrawer(true); });
  if (drawerClose) drawerClose.addEventListener('click', function() { toggleDrawer(false); });
  if (navDrawer) {
    navDrawer.addEventListener('click', function(e) {
      if (e.target === navDrawer) toggleDrawer(false);
    });
  }
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navDrawer && navDrawer.classList.contains('active')) {
      toggleDrawer(false);
    }
  });
  document.querySelectorAll('.ub-drawer-link').forEach(function(l) {
    l.addEventListener('click', function() { toggleDrawer(false); });
  });

  var floatingTop = document.getElementById('ub-floating-top');
  if (floatingTop) {
    window.addEventListener('scroll', function() {
      floatingTop.classList.toggle('visible', window.scrollY > 400);
    });
    floatingTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();
</script>

