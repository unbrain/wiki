
[207. 课程表](https://leetcode.cn/problems/course-schedule/)

解题思路：

构造 图 grap 遍历 给出的关系图 【course， prev】

传教 deep 记录被依赖次数

grap[prev].push(course)

deep（course）++

遍历看看 是否有 deep[i] === 0 代表可学习 推入数组 finish

当 finish 存在
	pop  后为 curr 加入 finished 数组
	同时对 grap【curr】遍历得到 item 对 deep[item] --  当 === 0 加入 finish 数组




最后返回 finished 长度是否等于要学习的课程长度

```javascript

```