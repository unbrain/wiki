
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

