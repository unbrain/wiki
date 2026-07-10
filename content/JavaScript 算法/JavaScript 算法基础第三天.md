# 集合与字典

## Set（集合）

### 概念

Set 是一种不包含重复值的数据结构，底层实现类似于哈希表，查找和操作的时间复杂度为 O(1)。

### 常见操作

```javascript
const set = new Set()

set.add(1)
set.has(1)     // true
set.delete(1)  // true
set.has(1)     // false
set.size       // 0

// 数组去重
const arr = [1, 2, 2, 3, 3, 4]
const unique = [...new Set(arr)]  // [1, 2, 3, 4]
```

### 遍历

```javascript
const set = new Set([1, 2, 3])

for (const item of set)           // 1 2 3
for (const item of set.keys())    // 1 2 3
for (const item of set.values())  // 1 2 3
for (const [k, v] of set.entries()) // [1,1] [2,2] [3,3]（为兼容 Map 接口）
set.forEach(v => {})              // 1 2 3

// 遍历结果是有序的，按插入顺序
const s = new Set([3, 1, 2])
[...s]  // [3, 1, 2]
```

## Map（字典）

### 概念

Map 是一种键值对数据结构，键可以是任意类型（对象、函数等），查找和操作的时间复杂度为 O(1)。

```javascript
const map = new Map()

map.set('key', 'value')
map.get('key')    // 'value'
map.has('key')    // true
map.delete('key') // true
map.size          // 0

// 任意类型键
const obj = {}
map.set(obj, 'object value')
```

### 遍历

```javascript
const map = new Map([['a', 1], ['b', 2], ['c', 3]])

for (const [key, value] of map)  // ['a',1] ['b',2] ['c',3]
for (const key of map.keys())    // 'a' 'b' 'c'
for (const value of map.values()) // 1 2 3
for (const [k, v] of map.entries()) // ['a',1] ['b',2] ['c',3]
map.forEach((v, k) => {})         // 1:'a' 2:'b' 3:'c'
```

## 数组去重

```javascript
// Set
const unique1 = [...new Set(arr)]

// 双循环（不推荐）
const unique2 = []
for (const item of arr) {
  if (!unique2.includes(item)) unique2.push(item)
}

// 使用 Map 统计频率
const count = new Map()
for (const item of arr) {
  count.set(item, (count.get(item) || 0) + 1)
}
```

## Set vs Map

| 特性 | Set | Map |
|------|-----|-----|
| 存储 | 单值 | 键值对 |
| 键类型 | 值本身 | 任意类型 |
| 插入 | O(1) | O(1) |
| 查找 | O(1) | O(1) |
| 删除 | O(1) | O(1) |
| 场景 | 去重、存在性检查 | 映射、计数、缓存 |

## 练习题

- [349. 两个数组的交集](https://leetcode.cn/problems/intersection-of-two-arrays)

```javascript
var intersection = function(nums1, nums2) {
    const set = new Set(nums1);
    const res = []
    nums2.forEach(item => {
        if(set.has(item)) {
            res.push(item)
            set.delete(item)
        }
    })
    return res
};
```

- 时间复杂度：O(m + n)
- 空间复杂度：O(m + n)

- [20. 有效的括号](https://leetcode.cn/problems/valid-parentheses)

```javascript
var isValid = function(s) {
    const map = new Map()
    map.set('(',')')
    map.set('[',']')
    map.set('{','}')
    const res = []
    for(let i = 0; i < s.length; i++) {
        if(map.has(s[i])) {
            res.push(s[i])
        } else if(s[i] === map.get(res[res.length -1])) {
            res.pop()
        } else {
            return false
        }
    }
    return res.length === 0
};
```

- 时间复杂度：O(n)
- 空间复杂度：O(n)

- [1. 两数之和](https://leetcode.cn/problems/two-sum)

```javascript
var twoSum = function(nums, target) {
    const map = new Map()

    for(let i = 0; i < nums.length; i++) {
        if(map.has(nums[i])) {
            return [i, map.get(nums[i])]
        }
        map.set(target - nums[i], i)
    }
};
```

- 时间复杂度：O(n)
- 空间复杂度：O(n)

- [3. 无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters)

```javascript
var lengthOfLongestSubstring = function (s) {

    let l = 0
    let max = 0
    let set = new Set()
    for(let r = 0; r < s.length; r++) {
        while (set.has(s[r])){
            set.delete(s[l])
            l++
        }
        set.add(s[r])
        max = Math.max(max, r-l+1)
    }

    return max

};
```

- 时间复杂度：O(n)
- 空间复杂度：O(Σ)，Σ 为字符集大小

- [76. 最小覆盖子串](https://leetcode.cn/problems/minimum-window-substring)

```javascript
var minWindow = function(s, t) {
    let l = 0
    let r = 0
    let map = new Map()
    let str = ''
    for(item of t) {
        map.set(item, map.get(item) ? map.get(item) + 1 : 1)
    }
    let need = map.size
    console.log(map)
    while(r < s.length) {
        if(map.has(s[r])) {
            map.set(s[r], map.get(s[r]) - 1)
            if(map.get(s[r]) === 0) {
                need -= 1
            }
        }
        console.log(map, 'l:', l , 'r:', r)
        while(need === 0){
            const curr = s.slice(l, r+1)
            console.log(curr)
            if(!str || str.length > curr.length){
                str = curr
            }
            const c2= s[l]
            if(map.has(c2)) {
                map.set(c2,map.get(c2)+1)
                if(map.get(c2)) need+=1
            }
            l++
        }
        r++
    }

    return str
};
```

- 时间复杂度：O(m + n)
- 空间复杂度：O(Σ)，Σ 为字符集大小
