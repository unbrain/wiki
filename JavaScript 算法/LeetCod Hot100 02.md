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

