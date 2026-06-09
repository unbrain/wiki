
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

```javascript
var isPalindrome = function(head) {
    if(!head) return false
    let fast = head
    let slow = head

    while(fast?.next?.next) {
        slow = slow.next
        fast = fast.next.next
    }
    let prev = null
    let mid = slow.next
    let curr = mid
    slow.next = null
    while(curr) {
        let temp = curr.next
        curr.next = prev
        prev = curr
        curr = temp
    }

    let p1 = head
    let p2 = prev

    while(p1&&p2) {
        if(p1.val === p2.val) {
            p1= p1.next
            p2 = p2.next
        } else {
            return false
        }
    }
    return true
};
```


[148. 排序链表](https://leetcode.cn/problems/sort-list/)

解题思路：

归并排序  但是二分使用快慢指针操作链表

```javascript
```