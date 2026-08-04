---
title: GRD 栈刷题
tags:
  - LeetCode
  - GRD
  - 栈
  - 单调栈
description: 有效括号、最小栈、接雨水、柱状图最大矩形等栈高频题
aliases:
  - 栈刷题
---

[20. 有效的括号](https://leetcode.cn/problems/valid-parentheses/)

```javascript
var isValid = function(s) {
    const map = {
        '(':')',
        '{':'}',
        '[':']'
    }
    const stack = []
    for(let char of s) {
        const pre = stack.length ? stack[stack.length-1] : null
        if(map[char]) {
            stack.push(char)
        } else if(char === map[pre]) {
            stack.pop()
        } else {
            return false
        }
    }
    return stack.length === 0
};
```

[232. 用栈实现队列](https://leetcode.cn/problems/implement-queue-using-stacks/)

```javascript

var MyQueue = function() {
    this.queue = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.queue.push(x)
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    return this.queue.shift()
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    return this.queue[0]
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return this.queue.length === 0
};

/** 
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
```

[150. 逆波兰表达式求值](https://leetcode.cn/problems/evaluate-reverse-polish-notation/)

```javascript
var evalRPN = function (tokens) {
    const stack = []

    const oprt = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => ~~(a / b),
    }
    for(let char of tokens) {
        if(oprt[char]) {
            let b = stack.pop()
            let a = stack.pop()
            stack.push(oprt[char](a, b))
        } else {
            stack.push(+char)
        }
    }
    return stack[0]
};
```

[155. 最小栈](https://leetcode.cn/problems/min-stack/)


```javascript

var MinStack = function () {
    this.stack = []
    this.MinStack = []
};

/** 
 * @param {number} value
 * @return {void}
 */
MinStack.prototype.push = function (value) {
    this.stack.push(value)
    let min = this.getMin()
    this.MinStack.push(min < value ? min : value)
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
    this.stack.pop()
    this.MinStack.pop()
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
    return this.stack[this.stack.length - 1]
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
    return this.MinStack[this.MinStack.length - 1]
};

/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(value)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
```

[42. 接雨水](https://leetcode.cn/problems/trapping-rain-water/)

```javascript
var trap = function (height) {
    let count =0
    let left =0, maxL = height[left]
    let right = height.length - 1, maxR = height[right]

    while(left < right) {
        if(height[left] < height[right]) {
            if(height[left] > maxL) {
                maxL = height[left]
            } else {
                count += maxL - height[left]
            }
            left++
        } else {
            if(height[right]>maxR) {
                maxR = height[right]
            } else {
                count+= maxR - height[right]
            }
            right--
        }
    }

    return count
};
```

[84. 柱状图中最大的矩形](https://leetcode.cn/problems/largest-rectangle-in-histogram/)

```javascript
var largestRectangleArea = function (heights) {
  let max = 0
  const stack = [] // 单调递增栈，存下标，对应高度递增

  for (let i = 0; i <= heights.length; i++) {
    // 遍历到末尾时补一个高度 0，强制清算栈内剩余柱子
    const h = i === heights.length ? 0 : heights[i]

    // 当前高度比栈顶矮 → 栈顶柱子无法再向右扩展，出栈结算
    while (stack.length && h < heights[stack[stack.length - 1]]) {
      const height = heights[stack.pop()] // 以出栈柱子高度为矩形高
      // 左边界：出栈后栈顶为左侧第一个更矮的柱子（或 -1 表示无）
      const left = stack.length === 0 ? -1 : stack[stack.length - 1]
      const width = i - left - 1 // 右边界是当前下标 i
      max = Math.max(max, height * width)
    }
    stack.push(i) // 当前索引入栈
  }

  return max
};
```

[224. 基本计算器](https://leetcode.cn/problems/basic-calculator/)

```javascript
var calculate = function (s) {
  let result = 0 // 当前已算出的值
  let sign = 1 // 当前数字前的符号，+1 或 -1
  let num = 0 // 正在拼接的整数
  const stack = [] // 保存进入括号前的 result 和 sign

  for (const c of s) {
    if (c >= '0' && c <= '9') {
      num = num * 10 + +c // 拼接多位数
    } else if (c === '+') {
      result += sign * num // 将上一个数字结算到 result
      num = 0
      sign = 1
    } else if (c === '-') {
      result += sign * num
      num = 0
      sign = -1
    } else if (c === '(') {
      stack.push(result) // 保存括号前的结果
      stack.push(sign) // 保存括号前的符号
      result = 0 // 重置，开始计算括号内的表达式
      sign = 1
    } else if (c === ')') {
      result += sign * num // 先结算括号内最后一个数字
      num = 0
      result *= stack.pop() // 用括号前的符号乘整个括号结果（处理负号）
      result += stack.pop() // 再加上括号前已有的结果
    }
  }

  result += sign * num // 处理表达式末尾最后一个数字
  return result
};
```

## 相关笔记

- [[经典 150 栈|栈题目]]（有效括号、逆波兰表达式、最小栈）
- [[JavaScript 算法基础第一天|栈与队列基础]]
- [[经典 150 双指针|双指针题目]]（接雨水）