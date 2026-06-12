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

[49. 字母异位词分组](https://leetcode.cn/problems/group-anagrams/)

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