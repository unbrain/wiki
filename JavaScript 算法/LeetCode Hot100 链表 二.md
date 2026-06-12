[438. 找到字符串中所有字母异位词](https://leetcode.cn/problems/find-all-anagrams-in-a-string/)

```javascript
var findAnagrams = function(s, p) {
    let count = []
    let arr = new Array(26).fill(0)

    for(let code of p) {
        let num = code.charCodeAt() - 97
        arr[num] +=1
    }


    for(let left = 0, right =0; right < s.length; right++) {
        let num = s[right].charCodeAt() - 97
        arr[num]--

        while(arr[num]<0){
            arr[s.charCodeAt(left)-97]++
            left++
        }

        if(right - left +1 === p.length){
            count.push(left)
        }
    }
    return count
};
```