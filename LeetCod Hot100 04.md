[142. 环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii/)

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

[141. 环形链表](https://leetcode.cn/problems/linked-list-cycle/)

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

[139. 单词拆分](https://leetcode.cn/problems/word-break/)

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

[647. 回文子串](https://leetcode.cn/problems/palindromic-substrings/)

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