
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

```