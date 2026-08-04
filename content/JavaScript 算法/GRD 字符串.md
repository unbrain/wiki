---
title: GRD 字符串刷题
tags:
  - LeetCode
  - GRD
  - 字符串
  - 滑动窗口
  - 双指针
description: 回文串、字母异位词、无重复字符最长子串、最小覆盖子串等字符串高频题
aliases:
  - 字符串刷题
---

[125. 验证回文串](https://leetcode.cn/problems/valid-palindrome/)

```javascript
var isPalindrome = function(s) {
    let str = s.trim().toLowerCase().match(/[a-z0-9]/g)
    if(!str) return true
    let left = 0
    let right = str.length -1
    while(left < right) {
        if(str[left]===str[right]){
            left++
            right--
        } else {
            return false
        }
    }
    return true
};
```

[242. 有效的字母异位词](https://leetcode.cn/problems/valid-anagram/)

```javascript
var isAnagram = function(s, t) {
    if(s.length !== t.length) return false
    const arrs = new Array(26).fill(0)
    const arrt = new Array(26).fill(0)

    for(let i = 0; i < s.length;i++){
        arrs[s.charCodeAt(i) - 97]++
        arrt[t.charCodeAt(i) - 97]++
    }
    return arrs.join(',') === arrt.join(',')
};
```

[409. 最长回文串](https://leetcode.cn/problems/longest-palindrome/)

```javascript
var longestPalindrome = function(s) {
    let set = new Set()
    let len = 0
    for(const c of s) {
        if(set.has(c)) {
            set.delete(c)
            len+=2
        } else {
            set.add(c)
        }
    }
    return set.size ? len + 1: len
};
```

[3. 无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)

```javascript
var lengthOfLongestSubstring = function (s) {
    let left = 0
    let max = 0
    let set = new Set()
    for(let right = 0; right< s.length; right++) {
        while(set.has(s[right])) {
            set.delete(s[left])
            left++
        }
        set.add(s[right])
        max = Math.max(max, right-left+1)
    }

    return max
};
```

[8. 字符串转换整数 (atoi)](https://leetcode.cn/problems/string-to-integer-atoi/)

```javascript
var myAtoi = function(s) {
    let i = 0, sign = 1, num =0
    while(s[i] === ' ') i++
    if(s[i] === '+' || s[i] === '-'){
        sign = s[i] === '-' ? -1 : 1
        i++
    }
    while(i<s.length && s[i]>='0' && s[i]<='9') {
        num = num * 10 + (s.charCodeAt(i) - 48)
        if(num * sign > 2**31-1) return 2**31-1
        if(num * sign < -(2**31) ) return -(2**31)
        i++
    }
    return sign * num
};
```

[5. 最长回文子串](https://leetcode.cn/problems/longest-palindromic-substring/)

```javascript
var longestPalindrome = function(s) {
    let maxStr = ''
    const expand = (i,j) => {
        while(i>=0 && s[i] === s[j]&& j<=s.length-1) {
            let cur = j-i+1
            if(maxStr.length < cur) {
                maxStr = s.slice(i, j+1)
            }
            i--;
            j++
        }
    }
    for(let i = 0; i < s.length; i++) {
        expand(i, i)
        expand(i, i+1)
    }
    return maxStr
};
```

[438. 找到字符串中所有字母异位词](https://leetcode.cn/problems/find-all-anagrams-in-a-string/)

```javascript
var findAnagrams = function(s, p) {
    let res = []
    const arr = new Array(26).fill(0)
    for(let char of p) {
        arr[char.charCodeAt(0)-97]++
    }
    for(let left = 0, right = 0; right<s.length; right++){
        const cur = s.charCodeAt(right)-97
        arr[cur]--
        while(arr[cur] < 0) {
            arr[s.charCodeAt(left) - 97]++
            left++
        }
        if(p.length === right - left+1){
            res.push(left)
        }
    }
    return res
};
```

[76. 最小覆盖子串](https://leetcode.cn/problems/minimum-window-substring/)

```javascript
var minWindow = function (s, t) {
    if (s.length < t.length) return "";

    let map = new Map();
    for (let char of t) {
        map.set(char, (map.get(char) || 0) + 1);
    }

    let l = 0, r = 0;
    let need = map.size; // 缺少的字符种类数
    let start = 0;
    let minLen = Infinity;

    while (r < s.length) {
        let c = s[r];
        if (map.has(c)) {
            map.set(c, map.get(c) - 1);
            // 当某字符的需求量减到 0，说明该字符在窗口内的数量已经达标
            if (map.get(c) === 0) {
                need--;
            }
        }

        // 当所有字符种类都达标了，尝试收缩左窗口
        while (need === 0) {
            // 更新最小覆盖子串的长度和起始位置
            if (r - l + 1 < minLen) {
                start = l;
                minLen = r - l + 1;
            }

            let c2 = s[l];
            if (map.has(c2)) {
                // 如果本来是 0，说明刚好达标，移出后就不达标了
                if (map.get(c2) === 0) {
                    need++;
                }
                map.set(c2, map.get(c2) + 1);
            }
            l++; // 左指针右移
        }
        r++; // 右指针右移
    }

    return minLen === Infinity ? "" : s.slice(start, start + minLen);
};
```


[236. 二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/)

```javascript
var lowestCommonAncestor = function(root, p, q) {
    if(root === q || root === p || !root) {
        return root
    }
    const left = lowestCommonAncestor(root.left, p, q)
    const right = lowestCommonAncestor(root.right, p, q)

    if(left!==null &&right!==null){
        return root
    }
    return left || right
};
```


[199. 二叉树的右视图](https://leetcode.cn/problems/binary-tree-right-side-view/)

```javascript

```

## 相关笔记

- [[经典 150 滑动窗口|滑动窗口题目]]（无重复字符的最长子串、最小覆盖子串）
- [[经典 150 数字 字符串|数字与字符串题目]]（回文串、atoi）
- [[经典 150 哈希表|哈希表题目]]（字母异位词）
- [[经典 150 双指针|双指针题目]]（回文、最长回文子串）