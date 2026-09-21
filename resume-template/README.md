# 高端极简杂志风 3 页 A4 简历与求职信模板（数据驱动版）

根据高端现代杂志设计规范打造，严格匹配 **3 页独立标准 A4（210mm × 297mm）** 规格。现已升级为**完全数据驱动架构（Data-Driven Architecture）**，彻底实现“表现与数据解耦”，无缝接入项目真实履历，支持无限拓展。

---

## 🌟 核心特性与架构升级

1. **彻底的数据驱动（Data-Driven & Extensible）**：
   - 告别死板写死的静态页面，所有文字、经历、联系方式、收件人及照片全部抽取为结构化数据源。
   - **内置当前项目真实履历**：自动载入 **刘朝阳 (unbrain) · 7年新浪微博核心 Web 团队资深前端工程师/架构师** 的全量真实工程履历。
   - **保留原版设计稿数据集**：随时一键切换为原设计图的 **Jane Wilkins (原版英文模板)**。
   - **支持自定义 JSON 导入/导出**：支持一键导出当前编辑数据为 `cv-data.json`，或导入任意外部符合规范的 JSON 数据即时渲染！
2. **杂志编辑级美学 (Editorial Design System)**：
   - **底色系统**：冷峻、高级的莫兰迪灰绿艺术纸调（`#eaeee9`）。
   - **版式排版**：加粗大黑体标题（`LIU ZHAOYANG` / `JANE WILKINS`）、阶梯式文件标签（Folder Tab）异形照片构图、极简药丸徽章（Pill Badges）、纯黑磨砂质感推荐人名片（Reference Card）以及真实自然的手写连笔艺术签名。
3. **严格 1:1 标准 A4 打印与 PDF 导出**：
   - CSS 针对 `@media print` 与 `@page { size: A4 portrait; margin: 0; }` 深度优化。
   - 自动隐藏工具栏与阴影，**导出精确为 3 张独立 A4（594.96pt × 841.92pt）**，绝无错页与半页截断。

---

## 📂 文件目录结构

```text
resume-template/
├── index.html                  # 核心模板系统（现代化 CSS + 动态数据绑定引擎）
├── cv-data.js                  # 独立结构化简历数据源（支持自由修改与拓展）
├── README.md                   # 本说明文档
├── resume-export.pdf           # 3 页标准 A4 PDF 导出成品样例
├── preview-spread.png          # 3 联排展台高清效果预览
├── inspect-p1.png              # 第 1 页单页 1:1 核查图
├── inspect-p2.png              # 第 2 页单页 1:1 核查图
├── inspect-p3.png              # 第 3 页单页 1:1 核查图
└── assets/
    ├── avatar.jpg              # 项目真实头像（刘朝阳极客插画头像）
    ├── hero-model-cycling.jpg  # 原版设计稿骑行模特图
    └── hero-model-portrait.jpg # 备选特写模特图
```

---

## 🚀 如何使用与数据拓展

### 1. 本地浏览与数据切换
双击在浏览器中打开 `resume-template/index.html`：
- **切换数据集**：点击顶部左侧下拉菜单，可秒级在 **“当前项目 CV (刘朝阳)”** 与 **“原版设计稿 (Jane Wilkins)”** 之间无缝切换。
- **在线即时编辑**：点击 **「在线编辑」**，直接在页面上打字修改任意内容。
- **导出/导入数据**：
  - 点击 **「导出 JSON」** 可将当前页面上的简历结构完整导出为 `.json` 文件备份；
  - 点击 **「导入 JSON」** 可选取本地的简历 JSON 配置文件，页面瞬间自动重绘渲染。
- **更换照片**：点击第一页照片或顶部 **「更换照片」** 按钮，即可上传您的个人形象照。

### 2. 在代码中直接拓展数据（编辑 `cv-data.js`）
在 `cv-data.js` 中，每个数据集包含极其清晰的字段，您可以随时添加新的经历、替换技能或添加新的项目经历：

```javascript
window.CV_DATABASE = {
  // 你的专属数据集
  myData: {
    id: "myData",
    label: "我的专属简历",
    meta: {
      year: "Year 2028",
      website: "github.com/yourname",
      addressTitle: "ADDRESS :",
      addressLines: "电话<br>邮箱<br>城市<br>网址",
      coverLetterContacts: "P | ...<br>L | ...<br>E | ..."
    },
    person: {
      nameFirst: "FIRSTNAME",
      nameLast: "LASTNAME",
      role: "职位名称",
      photo: "assets/avatar.jpg",
      greeting: "Hello I'm<br>Your Name",
      introBio: "个人概述段落..."
    },
    page2: {
      badge: "Resume",
      profileOverview: "专业技能核心综述...",
      experiences: [
        {
          title: "职位 / 时间",
          company: "公司名称",
          summary: "核心职责概述",
          bullets: ["成果要点 1", "成果要点 2", "成果要点 3"]
        }
      ],
      reference: { ... },
      education: { ... }
    },
    page3: {
      letterTitle: "应聘岗位：...",
      letterBody: ["求职信第一段...", "求职信第二段..."],
      signatureText: "Your Name",
      signerName: "YOUR NAME"
    }
  }
};
```

### 3. 一键打印与导出 3 页标准 A4 PDF
1. 点击右上角绿色按钮 **「Print / Save PDF」**（或按 `Ctrl+P` / `Cmd+P`）；
2. 打印选项选择：
   - **目标打印机**：另存为 PDF (Save as PDF)
   - **纸张大小**：A4
   - **边距**：无 (None)
   - **选项**：勾选“背景图形” (Background graphics)
3. 点击保存，即可获得纯矢量超清的 3 页 A4 PDF 简历。
