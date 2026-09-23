---
title: LeetCode Hot100 - 反转链表与课程表
tags:
  - LeetCode
  - Hot100
  - 链表
  - 反转链表
  - 图
  - 拓扑排序
description: 反转链表(206)、课程表(207)拓扑排序
---

[206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/)（见[[LeetCode Hot100 链表]]、[[JavaScript 算法基础第二天]]）

```javascript
var reverseList = function(head) {
    let prev = null
    let curr = head
    while(curr) {
        let temp = curr.next
        curr.next = prev
        prev = curr
        curr = temp
    }
    return prev
};
```

复杂度分析

时间复杂度：O(n)，其中 n 是链表的长度。需要遍历链表一次。

空间复杂度：O(1)，只使用了常数额外空间。

[207. 课程表](https://leetcode.cn/problems/course-schedule/)

```javascript
var canFinish = function(numCourses, prerequisites) {
    const len = numCourses

    const grap = Array.from({length: len}, () => [])
    const deep = Array.from({length: len}, () => 0)

    for(let [course, prev] of prerequisites) {
        grap[prev].push(course)
        deep[course]++
    }

    let finish = []
    for(let i = 0; i< len; i++){
        if(deep[i] === 0) {
            finish.push(i)
        }
    }
    let finished = 0
    while(finish.length){
        let curr = finish.pop()
        finished++
        for(let item of grap[curr]) {
            deep[item]--
            if(deep[item] === 0) {
                finish.push(item)
            }
        }
    }
    return finished === len
};
```

复杂度分析

时间复杂度：O(V+E)，其中 V 是课程数（numCourses），E 是先修课程数（prerequisites 的长度）。构建邻接表需要 O(E)，拓扑排序遍历每个节点和边各一次。

空间复杂度：O(V+E)，邻接表存储了 E 条边，入度数组使用了 O(V) 空间。

[215. 数组中的第K个最大元素](https://leetcode.cn/problems/kth-largest-element-in-an-array/)

你必须设计并实现时间复杂度为 `O(n)` 的算法解决此问题（放弃小顶堆，采用快速选择 QuickSelect 原地划分）。

```javascript
/**
 * 快速选择 QuickSelect（复用 912 题 Hoare 双指针模板 + 随机化基准）
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    const target = nums.length - k; // 升序排列后的目标下标

    const qs = (l, r) => {
        if (l >= r) return nums[target];

        // 1. 基准随机偏移 l
        const randomIndex = Math.floor(Math.random() * (r - l + 1)) + l;
        const pivot = nums[randomIndex];

        let i = l, j = r;

        // 2. 双指针对撞严格比较
        while (i <= j) {
            while (nums[i] < pivot) i++;
            while (nums[j] > pivot) j--;
            if (i <= j) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
                i++;
                j--;
            }
        }

        // 3. 门神法则：入左院、进右院、夹中间直取果
        if (target <= j) return qs(l, j); // target <= j 入左院 [l, j]
        if (target >= i) return qs(i, r); // target >= i 进右院 [i, r]
        return nums[target];              // 夹在中间过道，直接命中
    };

    return qs(0, nums.length - 1);
};
```

复杂度分析：
- 时间复杂度：平均 O(n)，最坏通过随机基准避免退化；快速选择每次剪枝抛弃一半数据，总处理量为等比级数 $n + n/2 + n/4 + \dots \approx 2n$。
- 空间复杂度：O(log n)，系统递归调用栈消耗（纯原地交换，0 额外数组开销）。

关键套路与记忆点：
- **与 912 快排同源**：底层同样是单次对撞双指针分区，快排“全都要”双边递归 $O(n \log n)$，快选“只要一个”单边递归剪枝 $O(n)$。
- **定位门神诀**：错开后 $j < i$。`target <= j` 入左院，`target >= i` 进右院，夹中间直取果。

详细思路与记忆法见 [[215 数组中的第K个最大元素]]


[208. 实现 Trie (前缀树)](https://leetcode.cn/problems/implement-trie-prefix-tree/)

```javascript

var Trie = function() {
    this.ch = {}
    this.isEnd = false
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    let node = this
    for(let c of word) {
        if(!node.ch[c]) {
            node.ch[c] = new Trie()
        }
        node = node.ch[c]
    }
    node.isEnd = true
};

Trie.prototype.seachPrefix = function(word) {
    let node = this

    for(let c of word) {
        if(!node.ch[c]) {
            return null
        }
        node = node.ch[c]
    }

    return node
};


/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    const res = this.seachPrefix(word)
    return !!res?.isEnd
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    const res = this.seachPrefix(prefix)
    return res !== null
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
```

复杂度分析

- **insert**：时间复杂度 O(L)，空间复杂度 O(L)，其中 L 为单词长度，每次插入最多创建 L 个新节点
- **search**：时间复杂度 O(L)，空间复杂度 O(1)
- **startsWith**：时间复杂度 O(L)，空间复杂度 O(1)

[200. 岛屿数量](https://leetcode.cn/problems/number-of-islands/)

```javascript
/**
 * @param {character[][]} grid
 * @return {number}
 */
const dfs =(grid, i, j, x, y) => {
    if(i<0 || j<0 || i>=y || j>=x || grid[i][j] === '0') {
        return
    }
    grid[i][j] = '0'
    dfs(grid, i+1, j, x, y)
    dfs(grid, i-1, j, x, y)
    dfs(grid, i, j+1, x, y)
    dfs(grid, i, j-1, x, y)
}
var numIslands = function(grid) {
    const y = grid.length
    const x = grid[0].length
    let res = 0

    for(let i = 0; i < y; i++) {
        for(let j = 0; j < x; j++) {
            if(grid[i][j] === '1') {
                res++
                dfs(grid, i, j, x, y)
            }
        }
    }
    return res
};


```

复杂度分析

时间复杂度：O(m×n)，其中 m 和 n 分别是网格的行数和列数。每个单元格最多被访问一次。

空间复杂度：O(m×n)，最坏情况下（整个网格都是陆地）递归深度为 m×n。

[198. 打家劫舍](https://leetcode.cn/problems/house-robber/)（见[[JavaScript 算法基础第九天]]）

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    const dp = []
    dp[0] = nums[0]
    dp[1] = Math.max(dp[0], nums[1])
    for(let i =2; i < nums.length; i++){
        dp[i] = Math.max(dp[i-2]+ nums[i], dp[i-1])
    }
    return dp[nums.length-1]
};
```

复杂度分析

时间复杂度：O(n)，其中 n 是房屋数量。只需遍历数组一次。

空间复杂度：O(n)，使用了大小为 n 的 DP 数组。可优化为 O(1) 使用滚动变量。

```javascript
var rob = function(nums) {
    if(nums.length ===1) return nums[0]
    let last = nums[0]
    let curr = Math.max(last, nums[1])
    for(let i =2; i < nums.length; i++){
        let temp = curr
        curr = Math.max(last+ nums[i], curr)
        last = temp
    }
    return curr
};
```

## 相关笔记

- [[JavaScript 算法基础第二天|链表基础]]
- [[JavaScript 算法基础第五天|图基础]]
- [[LeetCode Hot100 链表]]
- [[LeetCode Hot100 双指针 图]]
