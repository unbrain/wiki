[438. 找到字符串中所有字母异位词](https://leetcode.cn/problems/find-all-anagrams-in-a-string/)

解题思路：

使用 26 个字母长度的数字  以及一个滑动窗口 

当遇到 0 left 右移

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

[49. 字母异位词分组](https://leetcode.cn/problems/group-anagrams/)

排序后 进行分组

```javascript
var groupAnagrams = function(strs) {
    const map = new Map()

    const getStrCode = (str) => {
        let arr = new Array(26).fill(0)
        for(let i of str) {
            arr[i.charCodeAt() - 97]++
        }
        return arr.join(',')
    }

    for(let str of strs) {
        let key = getStrCode(str)
        if(map.has(key)) {
            const val = map.get(key)
            val.push(str)
            map.set(key, val)
        } else {
            map.set(key, [str])
        }
    }

    return [...map.values()]
};
```

```javascript
var groupAnagrams = function(strs) {
    const map = new Map()
    for(let s of strs){
        const key = s.split('').sort().join('')
        if(!map.has(key)) {
            map.set(key, [])
        }
        map.get(key).push(s)
    }
    return [...map.values()]
};
```

[560. 和为 K 的子数组](https://leetcode.cn/problems/subarray-sum-equals-k/)

使用前缀和 

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    let map = new Map()
    map.set(0, 1)
    let preSum = 0
    let count = 0
    for(let num of nums) {
        preSum += num

        if(map.has(preSum-k)){
            count+=map.get(preSum - k)
        }
        map.set(preSum, (map.get(preSum) || 0) + 1)
    }
    return count
};
```


[17. 电话号码的字母组合](https://leetcode.cn/problems/letter-combinations-of-a-phone-number/)

使用回溯 

```javascript
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    if(!digits.length) return []
    const phoneMap = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz'
    }

    const res = []

    const backtrack = (path, index) => {
        if(path.length === digits.length) {
            res.push(path.join(''))
            return
        }
        const letters = phoneMap[digits[index]]

        for(let char of letters){
            path.push(char)
            backtrack(path, index+1)
            path.pop()
        }
    }

    backtrack([], 0)

    return res
};
```