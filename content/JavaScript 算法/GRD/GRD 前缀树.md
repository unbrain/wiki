---
title: GRD 前缀树刷题
tags:
  - LeetCode
  - GRD
  - 前缀树
  - Trie
description: 208. 实现 Trie（前缀树）：insert、search、startsWith 三件套
aliases:
  - 前缀树
---

[208. 实现 Trie (前缀树)](https://leetcode.cn/problems/implement-trie-prefix-tree/)

```javascript
var Trie = function() {
    this.isEnd = false
    this.ch = {}
};

Trie.prototype.insert = function(word) {
    let node = this
    for(let c of word) {
        if(!node.ch[c]) {
            node.ch[c] = new Trie()   // 路径断了就新建节点
        }
        node = node.ch[c]             // 关键：每轮换房间（往下走一层）
    }
    node.isEnd = true                 // 走完整个单词才打结束标记
};

Trie.prototype.searchPrefix = function(word) {
    let node = this
    for(let char of word) {
        if(node.ch[char]) {
            node = node.ch[char]
        } else {
            return null               // 路径断了
        }
    }
    return node                       // 返回路径末端的节点
}

Trie.prototype.search = function(word) {
    const node = this.searchPrefix(word)
    return node ? node.isEnd : false  // 精确匹配：路径通 + 有结束标记
};

Trie.prototype.startsWith = function(prefix) {
    const node = this.searchPrefix(prefix)
    return !!node                     // 前缀匹配：路径通即可
};
```

## 复杂度

| 操作 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| insert | O(L) | O(L) |
| search / startsWith | O(L) | O(1) |

L 为单词长度；建树总空间 O(26 · 总字符数)，前缀共享。

## 关键套路

**节点不存字符，靠父节点 `ch` 的 key 标识自己**；`insert` 路径断了就 `new Trie()`，查询返回 `null` 代表路径断；`isEnd` 区分"完整单词"和"仅是前缀"。挂 `prototype` 的方法要访问 `this`，**别用箭头函数**。

关联：[[LeetCode Hot100 hash表 二]]、[[LeetCode Hot100 反转链表与课程表]] 中亦有 208 题记录。


## 进阶：139. 单词拆分（Trie + DP 推式）

[139. 单词拆分](https://leetcode.cn/problems/word-break/)

**解法一 · Set 拉式（首选）**：

```javascript
var wordBreak = function(s, wordDict) {
    const dict = new Set(wordDict)
    let dp = Array.from({length: s.length+1}, () => false)
    dp[0] = true                                  // 起跑线：空前缀可拆
    for(let i = 1; i< dp.length;i++) {
        for(let j = 0; j<i;j++) {
            const str = s.slice(j, i)
            if(dp[j] && dict.has(str)) {          // 必须两个条件：前面拆得动 && 子串在字典
                dp[i] = true
                break
            }
        }
    }
    return dp[s.length]
};
```

**解法二 · Trie 推式（加分项）**：

```javascript
var Trie = function() {
    this.isEnd = false
    this.ch = {}
};

Trie.prototype.insert = function(word) {
    let node = this
    for(let c of word) {
        if(!node.ch[c]) node.ch[c] = new Trie()
        node = node.ch[c]
    }
    node.isEnd = true
};

var wordBreak = function(s, wordDict) {
    const n = s.length
    const root = new Trie()
    for(const w of wordDict) root.insert(w)       // 字典全部进树

    const dp = new Array(n + 1).fill(false)
    dp[0] = true

    for(let i = 0; i < n; i++) {
        if(!dp[i]) continue                       // 站不上去就跳过
        let node = root                           // 新单词必须从 root 重新走
        for(let k = i; k < n; k++) {              // 从位置 i 出发往后推
            node = node.ch[s[k]]
            if(!node) break                       // 路径断了，再往后不可能通
            if(node.isEnd) dp[k + 1] = true       // 走过一个完整单词，点亮新格子
        }
    }
    return dp[n]
};
```

**DP 状态**：`dp[i]` = s 前 i 个字符能否被拆分。**转移**：`dp[i] = true` 当存在 `j < i`，`dp[j] = true` 且 `s[j..i)` 在字典中。

**两种写法对比**：

| 写法 | 思路 | 复杂度 | 实测（n=300 极端 case） |
|------|------|--------|----------------------|
| Set 拉式 | 每个 i 回头看所有 j，`dp[j] && set.has(s.slice(j,i))`，j 从 `i-maxLen` 起剪枝 | O(n·L²) | ~0.05 ms |
| Trie 推式 | 每个 dp 为 true 的位置出发，沿 Trie 走，遇 isEnd 点亮 `dp[k+1]` | O(n·L) | ~0.2 ms |

**为什么 Trie 理论更优却实测更慢**：`Set.has` 是 V8 内置 C++ 哈希表，`node.ch[s[k]]` 是 JS 对象属性访问，常数大数倍；且 139 的 `n ≤ 300`，剪枝后 Set 版运算量极小。Trie 的优势在**规模大 + 查询多**的场景（自动补全、敏感词过滤）。

**易错点（经典坑）**：转移条件漏写 `dp[j]` —— 反例 `s = "abcde"`，字典 `["abc", "cde"]`：i=5 时 j=2，`"cde"` 在字典但 `dp[2] = false`（"ab" 拆不动），漏检查会错误返回 true。**字典里有词 ≠ 能接上**，转移方程的每个条件都要落进代码。

**关键套路**：新单词从 root 重新走；`node = node.ch[s[k]]` 为 undefined 立即 break；dp 比 s 多 1 格（`dp[n]` 才是答案）。

关联：[[LeetCode Hot100 hash表]]、[[LeetCode Hot100 环形链表]] 中 139 题占位链接；DP 系列见 [[LeetCode Hot100 动态规划]]。
