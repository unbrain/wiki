
[160. 相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/)

```javascript
var getIntersectionNode = function (headA, headB) {
    let p1 =headA
    let p2 = headB
    while(p1 !==  p2) {
        p1 = p1 === null ? headB : p1.next
        p2 = p2 === null ? headA : p2.next
    }

    return p1
};
```

复杂度分析

时间复杂度：O(m+n)，其中 m 和 n 是分别是链表 headA 和 headB 的长度。两个指针同时遍历两个链表，每个指针遍历两个链表各一次。

空间复杂度：O(1)。

[236. 二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/)

```javascript
var lowestCommonAncestor = function(root, p, q) {
    if(root ===null || root === q || root===p) {
        return root
    }

    const l = lowestCommonAncestor(root.left, p, q)
    const r = lowestCommonAncestor(root.right, p, q)

    if(l !==null && r !== null) {
        return root
    }

    return l ? l : r
};
```