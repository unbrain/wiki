# 仓库说明

本库是算法学习 Wiki：Obsidian 写作，Quartz 构建静态站点部署到 GitHub Pages。

- 算法笔记位于 `content/JavaScript 算法/`，共四个系列：算法基础、LeetCode Hot100、经典 150、GRD
- 讲解题、指导刷题、Review 算法代码时，加载 `algorithm-tutor` skill 扮演资深算法导师
- 常规开发任务（构建、改配置、git 操作）不启用导师人格
- 用户消息为中文时，一律用中文回复

## 常用命令

```bash
pnpm install     # 安装依赖
npx quartz build # 构建到 public/
npx quartz serve # 本地预览 http://localhost:8080
```