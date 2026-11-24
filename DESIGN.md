# DESIGN.md — unbrain. Obsidian Vault & Portfolio

> 参考 `awesome-design-md`、`Vercel Web Interface Guidelines` 与 `Impeccable` 规范沉淀的站点设计系统。后续修改首页（`content/index.md`、`quartz/styles/custom.scss`）或新增专题页时，以此文档为视觉与交互约束。

## 1. Visual Theme & Atmosphere

- **定位**：资深前端工程师个人档案 + 算法与源码知识库（Obsidian Digital Garden）。
- **气质**：克制、高对比度、工程感优先的暗黑黑曜石美学（Obsidian Dark）。以 Hero 区的 3D Raymarching SDF 黑曜石碎片为唯一视觉主角，其余界面保持低噪音、高可读性。
- **反模式约束（Anti-Slop）**：
  - 禁止无意义的背景粒子连线、文字 Glitch 抖动、自动无限滚动跑马灯。
  - 禁止卡片左侧/顶部彩色警示条、卡片套卡片、大面积霓虹外发光。
  - 禁止同一视觉层级出现多个 `--primary` 实心主按钮。

## 2. Color Palette & Roles

| Token                | Value                       | Role                                                         |
| -------------------- | --------------------------- | ------------------------------------------------------------ |
| `--ub-black`         | `#0A0A0A`                   | 页面主画布背景（Canvas）                                     |
| `--ub-black-soft`    | `#111215`                   | 次级暗色表面（Surface 1）                                    |
| `--ub-black-card`    | `#111318`                   | 卡片默认背景（Surface 2）                                    |
| `--ub-yellow`        | `#FEFAE0`                   | 主标题、主文字、主 CTA 背景                                  |
| `--ub-yellow-dim`    | `#DCD8BE`                   | 正文与副标题文字                                             |
| `--ub-gray`          | `#8A9BB0`                   | 次要说明文字（在 `#111318` 上对比度 `6.54:1`，满足 WCAG AA） |
| `--ub-cyan`          | `#43D9AD`                   | 唯一主强调色（焦点环、激活态、关键数值、交互高亮）           |
| `--ub-amber`         | `#FEA55F`                   | 辅助点缀（年份、篇数标签、游戏食物粒子）                     |
| `--ub-indigo`        | `#4D5BCE`                   | 极微弱环境光晕与进度条渐变起点                               |
| `--ub-border`        | `rgba(255, 255, 255, 0.08)` | 默认 1px hairline 边框                                       |
| `--ub-border-strong` | `rgba(255, 255, 255, 0.16)` | 次级按钮与强调边框                                           |
| `--ub-border-hover`  | `rgba(67, 217, 173, 0.32)`  | 卡片悬停边框                                                 |

## 3. Typography Rules

- **主字体（`--ub-font-main`）**：`'Space Grotesk', 'Noto Sans SC', sans-serif`
- **HUD / 标题字体（`--ub-font-hud`）**：`'Space Grotesk', 'IBM Plex Mono', 'Noto Sans SC', sans-serif`
- **等宽字体（`--ub-font-mono`）**：`'Fira Code', 'IBM Plex Mono', ui-monospace, monospace`
- **加载保障**：`quartz/components/Head.tsx` 全站加载 `Noto Sans SC`、`IBM Plex Mono` 与 `Space Grotesk`（400/500/600/700），本地 `FiraCode-Light.woff` 启用 `font-display: swap`。
- **排版细节**：
  - 多行标题与副标题使用 `text-wrap: balance`。
  - 统计数字、百分比、序号、游戏分数使用 `font-variant-numeric: tabular-nums`。

## 4. Elevation, Borders & Shapes

- **表面层级**：通过画布 `#0A0A0A` → 卡片 `#111318` → 悬停 `#151820` 的微弱明度阶梯 + `1px` hairline 边框 + 顶部 `inset 0 1px 0 rgba(255, 255, 255, 0.04)` 内高光建立层次，不依赖重阴影或霓虹发光。
- **圆角规范**：
  - 按钮：`6px`（`--ub-radius-btn`）
  - 通用卡片（知识卷轴 / 指标 / 社交）：`12px`（`--ub-radius-card-sm`）
  - 作品展示大卡片：`14px`（`--ub-radius-card`）
  - 悬浮胶囊导航：`9999px`

## 5. Motion & Interaction Guardrails

- **禁止 `transition: all`**：所有过渡必须显式列出属性（如 `transform`、`border-color`、`background-color`、`box-shadow`、`opacity`）。
- **克制动效**：Scroll Reveal 位移 `16px`、时长 `0.45s`、阶梯延迟步进 `0.04s`（上限 `0.16s`），缓动 `cubic-bezier(0.22, 1, 0.36, 1)`。
- **无障碍与焦点**：
  - 保留系统原生光标，不隐藏鼠标指针。
  - 所有可交互元素提供 `:focus-visible` 焦点环（`2px solid var(--ub-cyan)`，`outline-offset: 2px~3px`）。
  - 移动端触控热区 `>= 44px`，按钮启用 `touch-action: manipulation`。
  - 严格响应 `prefers-reduced-motion: reduce`。
  - 装饰性元素标记 `aria-hidden="true"`，图片显式声明 `width`、`height`、`loading="lazy"`、`decoding="async"`。
