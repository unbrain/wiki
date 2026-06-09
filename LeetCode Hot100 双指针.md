
[160. 相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/)

解题思路：

双指针 指针 遇到 null 分别转到 headA headB 如果 最后 null 则无相交 如果不是 null 但是相等则是相交列表

```javascript
var getIntersectionNode = function (headA, headB) {
    let p1 = headA
    let p2 = headB

    while(p1 !== p2) {
        p1 = p1 ? p1.next : headB
        p2 = p2 ? p2.next : headA
    }

    return p1
};
```


[234. 回文链表](https://leetcode.cn/problems/palindrome-linked-list/)

解题思路

快慢指针 找到 mid  翻转 fast 
遍历 head fast val 相等则认定为回文链表

