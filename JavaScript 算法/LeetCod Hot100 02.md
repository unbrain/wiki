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