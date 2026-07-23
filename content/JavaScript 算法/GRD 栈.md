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