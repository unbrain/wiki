---
title: LeetCode Hot100 - 环形链表
tags:
  - LeetCode
  - Hot100
  - 链表
  - 双指针
  - 快慢指针
description: 环形链表II(142)、环形链表(141)
---

[142. 环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii/)（见[[LeetCode Hot100 链表]]、[[LeetCode Hot100 双指针]]）

```javascript
var detectCycle = function(head) {
    if(!head) return null
    let fast = head
    let slow = head
    while(fast?.next?.next) {
        fast = fast.next.next
        slow = slow.next
        if(fast === slow) {
            let res = head
            while(res !== slow) {
                res = res.next
                slow = slow.next
            }
            return res
        }
    }

    return null
};
```

[141. 环形链表](https://leetcode.cn/problems/linked-list-cycle/)（见[[LeetCode Hot100 链表]]、[[LeetCode Hot100 双指针]]、[[JavaScript 算法基础第二天]]）

```javascript
var hasCycle = function(head) {
    let fast = head
    let slow = head
    while(fast?.next?.next) {
        fast = fast.next.next
        slow = slow.next
        if(fast ===slow) {
            return true
        }
    }
    return false
};
```

[139. 单词拆分](https://leetcode.cn/problems/word-break/)（见[[LeetCode Hot100 hash表]]）

```javascript
var wordBreak = function(s, wordDict) {
    const set = new Set(wordDict)
    const len = s.length
    const dp = Array.from({length: len + 1}).fill(false)
    dp[0] = true
    for(let i= 1; i<= len; i++) {
        for(let j = 0;j < i;j++) {
            if(dp[j] && set.has(s.slice(j, i))){
                dp[i] = true
                break
            }
        }
    }
    return dp[len]

};
```

[136. 只出现一次的数字](https://leetcode.cn/problems/single-number/)

```javascript
var singleNumber = function(nums) {
    let res = 0
    for(let x of nums) {
        res ^=x
    }
    return res
};
```

[647. 回文子串](https://leetcode.cn/problems/palindromic-substrings/)（见[[LeetCode Hot100 双指针]]）

```javascript
var countSubstrings = function(s) {
    if(!s.length) return 0
    let res= 0

    const extend = (l, r) => {
        while(l>=0 && r < s.length && s[l] == s[r]){
            l--
            r++
            res++
        }
    }

    for(let num = 0; num < s.length; num++) {
        extend(num, num)
        extend(num, num+1)
    }

    return res
};
```

[128. 最长连续序列](https://leetcode.cn/problems/longest-consecutive-sequence/)（见[[LeetCode Hot100 hash表]]）

```javascript
var longestConsecutive = function(nums) {
    const set = new Set(nums)
    let long = 0

    for (let num of set) {
        if(!set.has(num-1)) {
            currLong = 1
            n = 1
            while(set.has(num+n)) {
                currLong++
                n++
            }
            long = Math.max(long, currLong)
        }
    }
    return long
};
```

## 相关笔记

- [[JavaScript 算法基础第二天|链表基础]]
- [[LeetCode Hot100 链表]]
- [[LeetCode Hot100 双指针]]
