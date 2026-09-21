# 高端极简杂志风 3 页 A4 简历模板套件 (Editorial Resume Template)

根据高阶杂志画册级求职模板设计，精确还原 **3 页标准 A4（210mm × 297mm）** 规格，集成了**封面展示与自述 (About Me)**、**核心履历正文 (Resume / CV)** 与 **求职自荐信 (Cover Letter)** 三大核心板块。

---

## 🌟 核心设计特色

- **杂志编辑级美学 (Editorial Design)**：
  - **底色系统**：冷峻、高级的莫兰迪灰绿艺术纸调（`#eaeee9`），带来自然画册的高级触感。
  - **版式排版**：采用 Neo-grotesque 强冲击力加粗标题（`JANE WILKINS`）、阶梯式文件标签（Folder Tab）异形照片构图、极简药丸徽章（Pill Badges）、纯黑磨砂质感推荐人卡片（Reference Card）以及飘逸自然的手写连笔签名。
- **100% 真实 A4 打印与 PDF 导出**：
  - CSS 针对 `@media print` 与 `@page { size: A4 portrait; margin: 0; }` 深度优化。
  - 无浏览器页眉页脚干扰，自动精确分页为 **3 张独立完整的 A4 纸**，无溢出、无截断、无空白错页。
- **开箱即用的所见即所得交互系统**：
  - ✏️ **在线实时编辑 (Live Edit)**：无需改动代码，点击页面上任意文字即可直接修改，支持自动保存草稿到本地浏览器（`localStorage`）。
  - 🌐 **一键中/英范本切换**：内置原版英文案例与一套精修中文职场范本（“简蔚琳 / 品牌推广主管”）。
  - 🖼️ **一键更换照片**：点击封面照片或点击工具栏，即可从本地选择属于你的个人形象照。
  - 📐 **多视图切换**：支持「3 联画廊展台模式」、「连续垂直滚动模式」与「单页精修模式」，支持 50% ~ 130% 自由缩放。

---

## 📂 文件结构

```text
resume-template/
├── index.html                  # 核心单文件模板（包含全部样式、SVG、交互脚本）
├── README.md                   # 本说明文档
├── resume-export.pdf           # 导出的 3 页完整标准 A4 PDF 样例
├── preview-spread.png          # 3 页并排渲染预览高清图
└── assets/
    ├── hero-model-cycling.jpg  # 默认时尚骑行侧影摄影图（高保真契合原图氛围）
    └── hero-model-portrait.jpg # 备选近景特写形象图
```

---

## 🚀 快速上手使用

### 1. 本地直接预览与编辑
无需安装任何复杂环境，直接在文件管理器中**双击 `resume-template/index.html`** 或拖拽至任意现代浏览器（Chrome、Edge、Safari）中打开即可。

### 2. 导出为高清 PDF
1. 点击顶部右侧的绿色按钮 **「Print / Save PDF」**（或按快捷键 `Ctrl + P` / `Cmd + P`）。
2. 在浏览器弹出的打印设置面板中：
   - **目标打印机**：选择 **「另存为 PDF」** (Save as PDF)。
   - **纸张大小**：选择 **「A4」**。
   - **边距**：选择 **「无」** (None)。
   - **选项**：勾选 **「背景图形」** (Background graphics)。
3. 点击保存，即可获得与设计稿 100% 一致的高清矢量 3 页 A4 PDF 简历！

---

## 📄 3 页板块详细拆解

### 第 1 页：个人简介与形象展示 (Page 01 · About Me / Cover)
- **Top Meta**：域名横线标与 `Year 2028` 药丸胶囊。
- **Hero Title**：超大加粗姓名 `JANE WILKINS` 及职位 `Promotion Manager`。
- **Intro**：两栏式问候（`Hello I'm Jane Wilkins`）与自述段落。
- **Visual Anchor**：标志性阶梯标签状（Folder Tab）深色衬底与时尚骑行摄影照。
- **Contact & Stamp**：地址与联系方式区块，右下角极简大字 `About Me.`。

### 第 2 页：核心履历正文 (Page 02 · Resume / CV)
- **Header**：左侧 `Resume` 胶囊，右上角右对齐姓名与职位。
- **Profile Overview**：左栏分类大标，右栏综合专业能力综述。
- **Work Experience**：3 段高层级工作经历，带黑色小方块（■）项目标头、公司名、概述段落与向右细三角（▸）职责要点。
- **Reference Card**：纯黑磨砂背景、高对比度白色排版的资深推荐人名片。
- **Education**：本科与硕士学位阶段及年份。

### 第 3 页：求职信与签名 (Page 03 · Cover Letter)
- **Header**：左侧 `Cover Letter` 胶囊，居中紧凑联系方式，右侧年份标。
- **Meta Section**：左侧信件日期，右侧清晰结构化的收件人与组织信息。
- **Accent Line & Side Title**：带实心黑块的分割线与左侧应聘岗位标头。
- **Letter Body**：两段行云流水的严谨自荐信正文，段落饱满规整。
- **Sign-off**：`Sincerely`、灵动优雅的手写艺术签名（`Signature`）与大写落款。
- **Footer**：左下角三点标志性装饰圆点（`● ○ ○`）。
