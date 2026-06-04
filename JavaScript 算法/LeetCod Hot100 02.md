[206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/)

```javascript
var reverseList = function(head) {
    let prev = null
    let curr = head
    while(curr) {
        let temp = curr.next
        curr.next = prev
        prev = curr
        curr = temp
    }
    return prev
};
```

复杂度分析

时间复杂度：O(n)，其中 n 是链表的长度。需要遍历链表一次。

空间复杂度：O(1)，只使用了常数额外空间。

[207. 课程表](https://leetcode.cn/problems/course-schedule/)

```javascript
var canFinish = function(numCourses, prerequisites) {
    const len = numCourses

    const grap = Array.from({length: len}, () => [])
    const deep = Array.from({length: len}, () => 0)

    for(let [course, prev] of prerequisites) {
        grap[prev].push(course)
        deep[course]++ 
    }

    let finish = []
    for(let i = 0; i< len; i++){
        if(deep[i] === 0) {
            finish.push(i)
        }
    }
    let finished = 0
    while(finish.length){
        let curr = finish.pop()
        finished++
        for(let item of grap[curr]) {
            deep[item]--
            if(deep[item] === 0) {
                finish.push(item)
            }
        }
    }
    return finished === len
};
```

复杂度分析

时间复杂度：O(V+E)，其中 V 是课程数（numCourses），E 是先修课程数（prerequisites 的长度）。构建邻接表需要 O(E)，拓扑排序遍历每个节点和边各一次。

空间复杂度：O(V+E)，邻接表存储了 E 条边，入度数组使用了 O(V) 空间。

[215. 数组中的第K个最大元素](https://leetcode.cn/problems/kth-largest-element-in-an-array/)

你必须设计并实现时间复杂度为 `O(n)` 的算法解决此问题

放弃最小堆


```javascript
var findKthLargest = function(nums, k) {
    let len = nums.length
    let left = 0
    let right = len-1
    const target = len - k
    const swap = (i, j) => {
        [nums[i], nums[j]] = [nums[j], nums[i]]
    }

    const dfs = (start, end) => {
        const povint = nums[end]
        let i = start
        let j = end - 1
        while(true) {
            while(i<=j && nums[i]<povint) i++
            while(i<=j && nums[j]>povint) j--
            if(i>=j) break
            swap(i, j)
            i++
            j--
        }
        swap(i, end)
        return i
    }


    while(left <= right) {
        const povintIndex = dfs(left, right)
        if(target === povintIndex) {
            return nums[target]
        } else if(povintIndex < target) {
            left = povintIndex +1
        } else {
            right = povintIndex-1
        }
    }
    return -1;
};
```

复杂度分析

时间复杂度：平均 O(n)，最坏 O(n²)。快速选择算法，每次分区将问题规模减半（平均情况），最坏情况发生在每次选择的基准值都是极端值时。

空间复杂度：O(1)，迭代实现，只使用了常数额外空间。


[208. 实现 Trie (前缀树)](https://leetcode.cn/problems/implement-trie-prefix-tree/)

```javascript

var Trie = function() {
    this.ch = {}
    this.isEnd = false
};

/** 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    let node = this
    for(let c of word) {
        if(!node.ch[c]) {
            node.ch[c] = new Trie()
        }
        node = node.ch[c]
    }
    node.isEnd = true
};

Trie.prototype.seachPrefix = function(word) {
    let node = this

    for(let c of word) {
        if(!node.ch[c]) {
            return null
        }
        node = node.ch[c]
    }

    return node
};


/** 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    const res = this.seachPrefix(word)
    return !!res?.isEnd
};

/** 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    const res = this.seachPrefix(prefix)
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

