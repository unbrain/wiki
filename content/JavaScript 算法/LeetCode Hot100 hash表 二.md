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

[208. 实现 Trie (前缀树)](https://leetcode.cn/problems/implement-trie-prefix-tree/)

出错点 新建的searchPrefix 写成 () => {} 导致无法找到 this

```javascript

var Trie = function() {
    this.children = {}
    this.isEnd = false
};

/** 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    let node = this
    for(let char of word) {
        if(!node.children[char]) {
            node.children[char] = new Trie()
        }
        node = node.children[char]
    }
    node.isEnd = true
};

Trie.prototype.searchPrefix = function(word) {
    let node = this
    for(let char of word) {
        if(!node.children[char]) {
            return null
        }
        node = node.children[char]
    }
    return node
}

/** 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    let res = this.searchPrefix(word)
    return !!res.isEnd
};

/** 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    let res = this.searchPrefix(prefix)
    return res !== null
};

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
```

[146. LRU 缓存](https://leetcode.cn/problems/lru-cache/)

使用 map 的 map.keys().next().value

```javascript
/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.map = new Map()
    this.capacity = capacity
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if(!this.map.has(key)) return -1

    const val = this.map.get(key)
    this.map.delete(key)
    this.map.set(key, val)
    return val
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if(this.map.has(key)) {
        this.map.delete(key)
    }
    this.map.set(key, value)

    if(this.map.size > this.capacity) {
        const res = this.map.keys().next().value
        this.map.delete(res)
    }
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
```


[3. 无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    let max = 0
    let left = 0
    let set = new Set()
    for (let right = 0; right < s.length; right++) {
        while (set.has(s[right])) {
            set.delete(s[left])
            left++
        }
        set.add(s[right])
        max = Math.max(max, right - left + 1)
    }
    return max
};
```

[621. 任务调度器](https://leetcode.cn/problems/task-scheduler/)

解题思路

前面的桶的长度是 n+1
任务种类的个数 -1 * n+1 再加上 最多个数的种类个数

```javascript
/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function(tasks, n) {
    let buketLength = n+1
    let count = 0 
    let MaxCount = 0
    let MaxCountCate = 0
    let arr = new Array(26).fill(0)
    for(let char of tasks) {
        let num = char.charCodeAt() - 65
        arr[num]++
    }
    for(let num of arr) {
        if(num !== 0) {
            count++
        }
        if(num> MaxCount) {
            MaxCount = num
            MaxCountCate = 1
        } else if(num === MaxCount){
            MaxCountCate++
        }
    }

    return Math.max(tasks.length, buketLength * (MaxCount-1) +MaxCountCate)
};
```

[105. 从前序与中序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
let indexMap = new Map()
var buildTree = function (preorder, inorder) {

    for (let i = 0; i < inorder.length; i++) {
        indexMap.set(inorder[i], i)
    }

    return buildSubTree(preorder, inorder, 0, preorder.length - 1, 0, inorder.length - 1)
};

const buildSubTree = (preorder, inorder, preLeft, preRight, inLeft, inRight) => {
    if (preLeft > preRight) {
        return null
    }
    let rootVal = preorder[preLeft]

    let root = new TreeNode(rootVal)
    let inOrderIndex = indexMap.get(rootVal)
    let leftSubTreeLength = inOrderIndex - inLeft


    root.left = buildSubTree(preorder, inorder, preLeft + 1, preLeft + leftSubTreeLength, inLeft, inOrderIndex - 1)
    root.right = buildSubTree(preorder, inorder, preLeft + leftSubTreeLength + 1, preRight, inOrderIndex + 1, inRight)
    return root
}
```