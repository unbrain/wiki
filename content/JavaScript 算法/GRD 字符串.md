
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