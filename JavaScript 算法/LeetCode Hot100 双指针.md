[160. 相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/)（见[[LeetCode Hot100 链表]]）

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


[234. 回文链表](https://leetcode.cn/problems/palindrome-linked-list/)（见[[LeetCode Hot100 链表]]）

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


[148. 排序链表](https://leetcode.cn/problems/sort-list/)（见[[LeetCode Hot100 链表]]）

解题思路：

归并排序  但是二分使用快慢指针操作链表

```javascript

const merge = (l, r) => {
    const dummy = new ListNode()
    let curr = dummy
    while(l&&r) {
        if(l.val < r.val) {
            curr.next = l
            l = l.next
        } else {
            curr.next = r
            r = r.next
        }
        curr = curr.next
    }
    curr.next = l || r
    return dummy.next
}
var sortList = function(head) {
    if(!head || !head?.next) return head
    let fast = head
    let slow = head
    let mid = undefined

    while(fast?.next?.next){
        slow = slow.next
        fast = fast.next.next
    }
    mid = slow.next
    slow.next = null

    let l = sortList(head)
    let r = sortList(mid)

    return merge(l, r)
};

```


[142. 环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii/)（见[[LeetCode Hot100 链表]]）

解题思路

找到相交节点： a+b = c

相交后 一个回到起点  当再次相遇时就是相交节点
```javascript
var detectCycle = function(head) {
    if(!head) return head
    let fast = head
    let slow = head

    while(fast?.next?.next) {
        slow = slow.next
        fast = fast.next.next
        if(fast === slow) {
            slow = head
            while(fast !== slow) {
                fast = fast.next
                slow = slow.next
            }
            return slow
        }
    }
    return null
};

```

[141. 环形链表](https://leetcode.cn/problems/linked-list-cycle/)（见[[LeetCode Hot100 链表]]、[[LeetCod Hot100 04.md]]、[[JavaScript 算法基础第二天]]）

可以忽略 此题解法见上一题

[647. 回文子串](https://leetcode.cn/problems/palindromic-substrings/)（见[[LeetCod Hot100 04.md]]）

解题思路

此题双指针 中心扩散解法 注意奇偶

```javascript
var countSubstrings = function(s) {
    let count = 0

    const expand = (i, j) => {
        while(i>=0&&j < s.length && s[i] === s[j]) {
            i--;
            j++
            count++
        }
    }

    for(let i = 0; i < s.length; i++) {
        expand(i, i)
        expand(i, i+1)
    }

    return count
};
```

[287. 寻找重复数](https://leetcode.cn/problems/find-the-duplicate-number/)

解题思路：
注意是 1-n 的数 有唯一一个重复数 所以这个数组当做链表其一定有环
可以看作[[LeetCode Hot100 链表#142. 环形链表 II|环形链表 II]]的变种看待进行解题

使用 快慢指针 同时 a+b = c

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
    let slow = nums[0]
    let fast = nums[0]

    do {
        slow = nums[slow]
        fast = nums[nums[fast]]
    } while(fast !== slow)

    slow = nums[0]
    while(fast !== slow){
        slow = nums[slow]
        fast = nums[fast]
    }
    return fast
};
```

[283. 移动零](https://leetcode.cn/problems/move-zeroes/)

解题思路 : 快慢指针
非零的全部往前放

```javascript

var moveZeroes = function(nums) {
    let slow = 0
    let fast = 0

    while(fast< nums.length) {
        if(nums[fast]) {
            [nums[slow], nums[fast]] = [nums[fast], nums[slow]]
            slow++
        }
        fast++
    }
};
```

[11. 盛最多水的容器](https://leetcode.cn/problems/container-with-most-water/)

解题思路：
双指针 两头向中心移动
每次移动移动保持最大高

```javascript
var maxArea = function(height) {
    let max = 0
    let left = 0
    let right = height.length-1
    while(left <right) {
        let maxheight = Math.min(height[left], height[right])
        let area = maxheight * (right-left)
        max = Math.max(max, area)
        if(height[left] > height[right]) {
            right --
        } else {
            left++
        }
    }

    return max
};
```

[19. 删除链表的倒数第 N 个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/)（见[[LeetCode Hot100 链表]]）

解题思路
快慢指针  快指针先走 n 步即可  注意使用虚拟节点 这样真实的头节点就变成了“第二个节点”，任何删除操作都可以统一逻辑

```javascript
var removeNthFromEnd = function(head, n) {
    let dummy = new ListNode(0, head)
    let slow = dummy
    let fast = dummy
    while(n) {
        fast = fast.next
        n--
    }

    while(fast.next) {
        slow = slow.next
        fast = fast.next
    }
    slow.next = slow.next.next
    return dummy.next
};
```


[5. 最长回文子串](https://leetcode.cn/problems/longest-palindromic-substring/)

解题思路

双指针判断是否为回文  然后判断长度

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    let maxStr = ''

    const expand = (i, j) => {
        while(i>=0 && j <s.length && s[i] === s[j]) {
            let len = j-i+1
            if(len>maxStr.length) {
                maxStr = s.slice(i, j+1)
            }
            i--
            j++
        }
    }

    for(let i = 0; i<s.length;i++){
        expand(i, i)
        expand(i, i+1)
    }

    return maxStr
};
```
