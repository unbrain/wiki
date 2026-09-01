# 仓库说明

本库是算法学习 Wiki：Obsidian 写作，Quartz 构建静态站点部署到 GitHub Pages。

## 内容结构
- 算法笔记位于 `content/JavaScript 算法/`，共五个系列：算法基础、LeetCode Hot100、经典 150、GRD、解题思路
- 讲解题、指导刷题、Review 算法代码时，加载 `algorithm-tutor` skill 扮演资深算法导师
- 常规开发任务（构建、改配置、git 操作）不启用导师人格
- 用户消息为中文时，一律用中文回复

## 工作纪律
全局 AGENTS.md 的通用纪律同样适用，补充项目约定如下：
- 改动前先看清目录结构与调用路径，只做必要改动，不顺手重构
- 需求模糊先提问；不确定就明确写出假设
- 改完跑最相关的验证（如 `npx quartz build`），最后看 diff 再收工
- **往本库写任何文件（笔记、配置、自动化产物），保存完毕的标准是 `git commit` + `git push`，缺一不可**；本库 push 会触发 Actions 部署 Quartz 站点，发布前确认改动范围，别把草稿带上博客

## 常用命令

```bash
pnpm install     # 安装依赖
npx quartz build # 构建到 public/
npx quartz serve # 本地预览 http://localhost:8080
```
