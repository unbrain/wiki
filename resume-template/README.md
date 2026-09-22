# 高端极简杂志风 A4 简历与求职信工程系统 (Vite + Vue 3 + TypeScript)

基于高端现代杂志设计规范打造，严格匹配 **标准 A4（210mm × 297mm）** 物理打印规格。现已全面重构为**现代化 Vite + Vue 3 + TypeScript 模块化工程体系**，彻底告别脆弱的命令式 DOM 拼接，实现真正的**高内聚低耦合组件化、声明式流式分页与强类型契约**。

---

## 🌟 核心架构与重构亮点

1. **彻底的高内聚低耦合分层设计**：
   - **纯 UI 原子组件（Atoms · 零业务耦合）**：
     - `A4Sheet.vue`：严格封装 210mm × 297mm 物理规格、纸张 Morandi 纸调（`#eaeee9`）与 `@media print` 打印规范。
     - `CutoutCard.vue`：封装纯哑光黑卡片及 `#ref-card-clip` 右下异形切角。
     - `HeroNameTitle.vue`：封装 72px–76px 杂志级大黑体折行与角色标头。
     - `AccentDivider.vue`：封装经典左侧带实心黑块的杂志分割线（`█───────`）。
     - `DotsIndicator.vue`：封装标准 `○ ● ○`（空心-实心-空心）三点指示器。
     - `TimelineItem.vue`：通用时间轴条目（方块编号、标题、公司、摘要、三角符号 bullet）。
     - `CompactListItem.vue`：针对教育、基建工具的紧凑型三栏条目。
     - `ManifestoCard.vue`：工程师信条卡片。
   - **业务领域部件（Widgets）**：
     - `ReferenceContactWidget.vue`：推荐人联系卡片（标准化 `P |` 与 `E |` 清洗格式化）。
     - `CapabilityRadarWidget.vue`：六维工程能力评级卡片。
     - `CoverLetterTopBar.vue`：求职信三栏联系方式与药丸徽章。
   - **页面模板（Pages）**：
     - `PageCover.vue`：第 1 页封面形象与个人简介。
     - `PageSkillsExperience.vue`：第 2 页技能矩阵或工作经历。
     - `PageProjects.vue`：第 3 页及动态续页，通过 `usePagination` 进行流式切片。
     - `PageCoverLetter.vue`：终页求职信、双段落与手写连笔签名。
2. **声明式智能流式分页（`usePagination`）**：
   - 当大厂标杆项目或履历较多时，自动按照单页黄金比例（2 个大厂核心工程）**智能新增 A4 续页**（Page 04 · 标杆工程续篇），将四大核心项目无损完整展示，彻底杜绝文字截断与空白突兀！
   - 顶部导航栏按钮自动响应（`P1~P5`），打印导出无缝生成独立每页。
3. **通用格式自适应适配器（`normalizeCvData`）**：
   - 既原生支持本模板专属配置，也能零报错直接导入 **Reactive Resume (rxresu.me)** 的原生 `cv.json`。
   - 自动映射姓名、职位、联系方式、个人摘要、项目经验与教育背景。

---

## 📁 目录结构

```text
resume-template/
├── index.html                  # 页面 HTML 宿主
├── vite.config.ts              # Vite 现代化构建配置
├── tsconfig.json               # TypeScript 严格模式配置
├── package.json                # 工程依赖与脚本
├── cv.json                     # 标准 JSON 简历数据源
├── dist/                       # 极速生产打包产物
├── src/
│   ├── main.ts                 # Vue 3 应用启动入口
│   ├── App.vue                 # 根组件
│   ├── types/
│   │   └── cv.ts               # 强类型数据契约定义
│   ├── data/
│   │   ├── presets.ts          # 预设数据源（刘朝阳技术档案 & Jane Wilkins 原版）
│   │   └── normalizer.ts       # 通用数据格式适配器
│   ├── composables/
│   │   ├── useResume.ts        # 状态管理、预设切换、JSON 导入导出、换图
│   │   ├── usePagination.ts    # 声明式分页管道（动态分片与页面流）
│   │   └── useViewControls.ts  # 视口模式、缩放、路由 Hash 联动、打印
│   ├── components/
│   │   ├── TopToolbar.vue      # 顶部控制面板
│   │   ├── SvgDefs.vue         # 矢量剪切蒙版
│   │   ├── atoms/              # 纯 UI 原子组件
│   │   ├── widgets/            # 领域业务组合部件
│   │   └── pages/              # A4 页面容器模板
│   └── assets/
│       ├── css/editorial.css   # 杂志风设计系统样式
│       ├── hero-model-cycling-clean.jpg
│       └── avatar-user.png
```

---

## 🚀 开发与构建

在 `resume-template/` 目录下：

```bash
# 启动本地开发服务 (支持 HMR 秒级热重载)
pnpm run dev

# 生产级强类型检查与打包输出到 dist/
pnpm run build

# 预览生产构建产物
pnpm run preview
```

本地静态服务访问：`http://localhost:8124/index.html`
- 支持 URL 参数即时指定数据源：
  - `?data=unbrain_full`：刘朝阳 5 页全景标杆工程档案
  - `?data=original`：Jane Wilkins 3 页原版英文标准版
