---
title: LeetCode Hot100 - 哈希表
tags:
  - LeetCode
  - Hot100
  - 哈希表
  - 数组
description: 两数组交集、多数元素、单词拆分等哈希表题目
aliases:
  - 哈希表
---

[160. 相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/) 见[[LeetCode Hot100 链表]]

[169. 多数元素](https://leetcode.cn/problems/majority-element/)（见[[LeetCode Hot100 多数元素与除自身以外]]）

多数元素是指在数组中出现次数 **大于** `⌊ n/2 ⌋` 的元素。

解题思路根据提示 这个数出现的次数大于其他数出现的总和

```javascript
var majorityElement = function(nums) {
    let num = 0
    let curr;
    for(let i = 0; i <nums.length; i++) {
        if(num === 0){
            curr = nums[i]
        }
        if(nums[i]===curr){
            num++
        } else {
            num--
        }
    }
    return curr
};
```

[139. 单词拆分](https://leetcode.cn/problems/word-break/)（见[[LeetCode Hot100 环形链表]]）

解题思路： 动态规划

dp[0] = true

return dp[s.length -1]

dp[x] = dp[j] && dp[x-j]

```javascript
var wordBreak = function(s, wordDict) {
    const set = new Set(wordDict)
    const len = s.length
    const dp = Array.from({length: len+1}, () => false)
    dp[0] = true
    for(let i = 1; i <= len; i++) {
        for(let j = 0; j< i; j++){
            if(dp[j] && set.has(s.slice(j,i))) {
                dp[i] = true
            }
        }
    }
    return dp[len]
};
```

[128. 最长连续序列](https://leetcode.cn/problems/longest-consecutive-sequence/)（见[[LeetCode Hot100 环形链表]]）

解题思路

存入 set

如果一个数减去 1 找不到 那么他就是起点

```javascript
var longestConsecutive = function(nums) {
    const set = new Set(nums)
    let long = 0
    for(let num of set) {
        if(!set.has(num-1)){
            let n = 1
            while(set.has(num + n)) {
                n++
            }
            long = Math.max(long, n)
        }
    }
    return long
};
```

[448. 找到所有数组中消失的数字](https://leetcode.cn/problems/find-all-numbers-disappeared-in-an-array/)（见[[LeetCode Hot100 位运算与动态规划]]）

对于能够找的数进行 *-1 这样子少了的数的位置将是大于 0 的数


```javascript
var findDisappearedNumbers = function(nums) {
    for(let i = 0; i< nums.length; i++){
        let num = Math.abs(nums[i]) - 1
        nums[num] = nums[num] > 0 ? -nums[num]: nums[num]
    }
    let res = []
    for(let i = 0; i< nums.length; i++){
        if(nums[i]>0) {
            res.push(i+1)
        }
    }
    return res
};
```

[438. 找到字符串中所有字母异位词](https://leetcode.cn/problems/find-all-anagrams-in-a-string/)

## 相关笔记

- [[JavaScript 算法基础第三天|集合与字典]]
- [[LeetCode Hot100 hash表 二|哈希表(二)]]
- [[LeetCode Hot100 链表|链表专题]]
- [[LeetCode Hot100 双指针|双指针]]
