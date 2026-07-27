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

**推算逻辑：**
核心思想是"枚举每根柱子作为矩形高度的最大面积"，利用单调递增栈快速找到每根柱子的左右边界。

以 `heights = [2, 1, 5, 6, 2, 3]` 为例：

| i | h | 栈（下标→高度） | 出栈结算 |
|---|----|----------------|---------|
| 0 | 2 | [0→2] | |
| 1 | 1 | `2 > 1`, 弹出 0 → 高=2, 左=-1, 宽=1-(-1)-1=1, 面积=2 | |
| | | [1→1] | |
| 2 | 5 | [1→1, 2→5] | |
| 3 | 6 | [1→1, 2→5, 3→6] | |
| 4 | 2 | `6 > 2`, 弹出 3 → 高=6, 左=2, 宽=4-2-1=1, 面积=6 | |
| | | `5 > 2`, 弹出 2 → 高=5, 左=1, 宽=4-1-1=2, 面积=10 | |
| | | [1→1, 4→2] | |
| 5 | 3 | [1→1, 4→2, 5→3] | |
| 6 | 0(补) | `3 > 0`, 弹出 5 → 高=3, 左=4, 宽=6-4-1=1, 面积=3 | |
| | | `2 > 0`, 弹出 4 → 高=2, 左=1, 宽=6-1-1=4, 面积=8 | |
| | | `1 > 0`, 弹出 1 → 高=1, 左=-1, 宽=6-(-1)-1=6, 面积=6 | |
| | | 最大面积 = 10（高度5，宽度2，即[5,6]区间） | |

每次出栈时计算以该柱子高度为矩形高的最大面积，左右边界分别由栈内前一个下标（左边界）和当前 i（右边界）确定，保证矩形内所有柱子高度 ≥ height。末尾补 0 触发所有剩余元素清算，不遗漏。**