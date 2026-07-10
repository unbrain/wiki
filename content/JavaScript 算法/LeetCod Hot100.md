[160. 相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/)（见[[LeetCode Hot100 链表]]、[[LeetCode Hot100 双指针]]、[[LeetCode Hot100 hash表]]）

```javascript
var getIntersectionNode = function (headA, headB) {
    let p1 =headA
    let p2 = headB
    while(p1 !==  p2) {
        p1 = p1 === null ? headB : p1.next
        p2 = p2 === null ? headA : p2.next
    }

    return p1
};
```

复杂度分析

时间复杂度：O(m+n)，其中 m 和 n 是分别是链表 headA 和 headB 的长度。两个指针同时遍历两个链表，每个指针遍历两个链表各一次。

空间复杂度：O(1)。

[236. 二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/)

```javascript
var lowestCommonAncestor = function(root, p, q) {
    if(root ===null || root === q || root===p) {
        return root
    }

    const l = lowestCommonAncestor(root.left, p, q)
    const r = lowestCommonAncestor(root.right, p, q)

    if(l !==null && r !== null) {
        return root
    }

    return l ? l : r
};
```

复杂度分析

时间复杂度：O(n)，其中 n 是二叉树的节点数。每个节点最多被访问一次。

空间复杂度：O(h)，其中 h 是二叉树的高度。递归调用栈的深度取决于树的高度，最坏情况下 h = n（链状树）。


[234. 回文链表](https://leetcode.cn/problems/palindrome-linked-list/)（见[[LeetCode Hot100 链表]]、[[LeetCode Hot100 双指针]]）

```javascript
/**
 * Definition for singly-linked list.
```

复杂度分析

时间复杂度：O(n)，其中 n 是链表的长度。需要遍历链表一次（快慢指针找中点 + 反转后半部分 + 比较）。

空间复杂度：O(1)，只使用了常数额外空间，在原链表上操作。


[226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/)（见[[JavaScript 算法基础第八天]]）

```javascript
var invertTree = function(root) {
    if(!root) return root

    return {
        val: root.val,
        left: invertTree(root.right),
        right: invertTree(root.left)
    }
};
```

复杂度分析

时间复杂度：O(n)，其中 n 是二叉树的节点数。每个节点都被访问一次。

空间复杂度：O(h)，其中 h 是二叉树的高度。递归调用栈的深度为树的高度，最坏情况 h = n。

[739. 每日温度](https://leetcode.cn/problems/daily-temperatures/)

```javascript
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function(temperatures) {
    let arr = []
    for(let i = 0; i < temperatures.length; i++) {
        let j = i
        while(j<temperatures.length) {
            if(temperatures[j]>temperatures[i]) {
                break
            }
            j++
        }
        arr.push(j === temperatures.length ? 0 : j-i)
    }
    return arr
};
```

暴力能解但是海量数据超时 时间复杂度达到 $O(N^2)$

引入单调栈

```javascript
var dailyTemperatures = function(temperatures) {
    const arr = new Array(temperatures.length).fill(0)
    const stack = []
    for(let i = 0; i < temperatures.length; i++) {
        while(stack.length && temperatures[i] > temperatures[stack[stack.length-1]]) {
            const res = stack.pop()
            arr[res] = i -res
        }
        stack.push(i)
    }
    return arr
};
```

复杂度分析

时间复杂度：O(n)，其中 n 是 temperatures 数组的长度。每个元素最多入栈和出栈一次。

空间复杂度：O(n)，需要栈和结果数组各 O(n) 空间。


[221. 最大正方形](https://leetcode.cn/problems/maximal-square/)

暴力解法：

```javascript
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function(matrix) {
    let y = matrix.length
    let x = matrix[0].length
    let maxSize = 0
    for(let i =0; i < y; i++) {
        for(let j = 0; j < x; j++) {
            if(Number(matrix[i][j])) {
                if(!maxSize) {
                    maxSize = 1
                }
                let len = Math.min(y-i, x-j)
                let add =1
                let startx = j+add
                let starty = i+add
                while(startx<x && starty <y && add < len) {
                    if(Number(matrix[starty][startx])) {
                        let isSquare = true
                        for(let ci =add; ci>0; ci--) {
                            if(!Number(matrix[starty][startx-ci]) || !Number(matrix[starty-ci][startx])) {
                                isSquare = false
                                break
                            }
                        }
                        if(isSquare) {
                            maxSize = Math.max(maxSize, (add + 1) * (add + 1));                         add++
                            startx= j+add
                            starty = i+add
                        } else {
                            break
                        }
                    }
                }
            }
        }
    }
    return maxSize
};
```


超限使用动态规划


```javascript
var maximalSquare = function(matrix) {
    let y = matrix.length
    let x = matrix[0].length
    let maxSide = 0
    let dp = Array.from({length: y+1}, () => Array(x+1).fill(0))

    for(let i = 1; i <= y; i++) {
        for(let j = 1; j <= x; j++) {
            if(matrix[i-1][j-1] === '1') {
                dp[i][j] = Math.min(
                    dp[i-1][j-1],
                    dp[i-1][j],
                    dp[i][j-1]
                ) +1
                maxSide = Math.max(maxSide, dp[i][j])
            }
        }
    }
    return maxSide * maxSide
};
```

复杂度分析

时间复杂度：O(m×n)，其中 m 和 n 分别是矩阵的行数和列数。需要遍历每个单元格一次。

空间复杂度：O(m×n)，使用了一个大小为 (m+1)×(n+1) 的二维 DP 数组。

