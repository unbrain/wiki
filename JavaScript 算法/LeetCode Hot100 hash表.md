  
[160. 相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/) 见[[LeetCode Hot100 链表]]

[169. 多数元素](https://leetcode.cn/problems/majority-element/)

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

[139. 单词拆分](https://leetcode.cn/problems/word-break/)

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

[128. 最长连续序列](https://leetcode.cn/problems/longest-consecutive-sequence/)

解题思路

存入 set

如果一个数减去 1 找不到 那么他就是起点

```javascript

```