---
title: LeetCode Hot100 - 链表
tags:
  - LeetCode
  - Hot100
  - 链表
  - 双指针
  - 反转链表
description: 相交链表(160)、回文链表(234)、环形链表等链表题目
aliases:
  - 链表专题
---

[160. 相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/)

```javascript
var getIntersectionNode = function (headA, headB) {
    let p1 = headA
    let p2 = headB

    while(p1 !== p2) {
        p1 = p1 !== null ? p1.next : headB
        p2 = p2 !== null ? p2.next : headA
    }
    return p1
};
```


[234. 回文链表](https://leetcode.cn/problems/palindrome-linked-list/)（见[[LeetCode Hot100 双指针]]、[[LeetCode Hot100]]）

```javascript
var isPalindrome = function(head) {
    let fast = head
    let slow = head

    while(fast?.next?.next) {
        fast = fast.next.next
        slow = slow.next
    }

    let mid = slow.next
    slow.next = null
    let prev = null
    let cur = mid
    while(cur) {
        let temp = cur.next
        cur.next = prev
        prev = cur
        cur = temp
    }

    let p1 = head
    let p2 = prev

    while(p1 && p2) {
        if(p1.val === p2.val) {
            p1 = p1.next
            p2 = p2.next
        } else {
            return false
        }
    }
    return true
};
```

[206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/)（见[[LeetCode Hot100 反转链表与课程表]]、[[JavaScript 算法基础第二天]]）

```javascript
var reverseList = function(head) {
    let prev = null
    let curr = head
    while(curr) {
        const temp = curr.next
        curr.next = prev
        prev = curr
        curr = temp
    }
    return prev
};
```

[148. 排序链表](https://leetcode.cn/problems/sort-list/)（归并+快慢指针，见[[LeetCode Hot100 双指针]]、[[LeetCode Hot100 多数元素与除自身以外]]）

```javascript
const merge = (l, r) => {
    let dummy = new ListNode()
    let cur = dummy
    while(l&&r){
        if(l.val < r.val){
            cur.next = l
            l = l.next
        }else {
            cur.next = r
            r=r.next
        }
        cur = cur.next
    }
    cur.next = l||r
    return dummy.next
}
var sortList = function(head) {
    if(!head || !head.next) return head
    let fast = head
    let slow = head

    while(fast?.next?.next) {
        slow = slow.next
        fast = fast.next.next
    }
    let mid = slow.next
    slow.next = null

    let left = sortList(head)
    let right = sortList(mid)

    return merge(left, right)
};
```

[146. LRU 缓存](https://leetcode.cn/problems/lru-cache/)（见[[LeetCode Hot100 多数元素与除自身以外]]）

```javascript
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
```

141 同下（[[LeetCode Hot100 双指针]]见快慢指针解法）
[142. 环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii/)（见[[LeetCode Hot100 双指针]]、[[LeetCode Hot100 环形链表]]、[[JavaScript 算法基础第二天]]）
```javascript
var detectCycle = function(head) {
    if(!head) return head

    let fast = head
    let slow = head

    while(fast?.next?.next) {
        fast = fast.next.next
        slow = slow.next
        if(fast === slow) {
            slow = head
            while(slow !== fast) {
                fast = fast.next
                slow = slow.next
            }
            return slow
        }
    }
    return null
};
```


[114. 二叉树展开为链表](https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/)

要做到**原地修改**且符合**前序遍历**的顺序，最直观的方法是**倒过来遍历**：即按照 **右 $\to$ 左 $\to$ 根** 的顺序遍历。

这样我们可以用一个指针 `pre` 记录上一次遍历过的节点，每次把当前节点的右指针指向 `pre`，左指针清空，再把 `pre` 更新为当前节点。因为是倒序，所以当我们改动当前节点的指针时，它的左右子树其实已经处理完了，绝对不会迷路！

```javascript
var flatten = function(root) {
    let pre = null
    const dfs =(node) => {
        if(!node) return

        dfs(node.right)
        dfs(node.left)

        node.right = pre
        node.left = null
        pre = node
    }
    dfs(root)
};
```

[2. 两数相加](https://leetcode.cn/problems/add-two-numbers/)（见[[JavaScript 算法基础第二天]]）

```javascript
var addTwoNumbers = function(l1, l2) {
    const l3 = new ListNode()
    let p1 = l1
    let p2 = l2
    let p3 = l3

    let carry = 0
    while(p1 || p2) {
        const v1 = p1?.val ?? 0
        const v2 = p2?.val ?? 0
        const v = v1 + v2 + carry
        carry = Math.floor(v / 10)
        p1 = p1?.next
        p2 = p2?.next
        p3.next = new ListNode(v % 10)
        p3 = p3.next
    }
    if(carry) {p3.next = new ListNode(carry)}
    return l3.next
};

```


[19. 删除链表的倒数第 N 个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/)

解题思路 快慢指针（[[LeetCode Hot100 双指针]]） 快指针跑快 n 个节点即可

[21. 合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/)（见[[JavaScript 算法基础第七天]]）

```javascript
var mergeTwoLists = function(list1, list2) {
    let dummy = new ListNode()
    let p = dummy
    while(list1 && list2) {
        if(list1.val < list2.val) {
            p.next = list1
            list1 = list1.next
        } else {
            p.next = list2
            list2 = list2.next
        }
        p = p.next
    }
    p.next= list1 || list2
    return dummy.next
};
```

[23. 合并 K 个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists/)（见[[JavaScript 算法基础第六天]]）

解题思路：

之前是用最小堆

本次使用归并 两两合并


```javascript
merge = (l1, l2) => {
    const dummy = new ListNode()
    let p = dummy
    while(l1&&l2){
        if(l1.val < l2.val) {
            p.next = l1
            l1= l1.next
        }else {
            p.next = l2
            l2 = l2.next
        }
        p = p.next
    }
    p.next = l1 || l2
    return dummy.next
}
var mergeKLists = function (lists) {
    let len = lists.length
    if(len === 0) return null
    for(let interval = 1; interval < len; interval*=2) {
        for(let i = 0; i < len -interval; i += interval*2) {
            lists[i] = merge(lists[i], lists[i+interval])
        }
    }
    return lists[0]
};
```

## 相关笔记

- [[JavaScript 算法基础第二天|链表基础]]
- [[LeetCode Hot100 双指针|双指针]]
- [[JavaScript 算法基础第六天|堆与优先队列]]
- [[JavaScript 算法基础第七天|归并排序]]
- [[GRD 链表|GRD 链表刷题]]
