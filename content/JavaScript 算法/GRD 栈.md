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