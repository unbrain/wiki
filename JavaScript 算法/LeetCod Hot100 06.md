[416. 分割等和子集](https://leetcode.cn/problems/partition-equal-subset-sum/)

```javascript
var canPartition = function(nums) {
    const sum = nums.reduce((a, b) => a+b)
    if(sum % 2 !== 0) return false
    const target = sum / 2
    const dp = new Array(target+1).fill(false)
    dp[0] = true
    for(let i = 0; i < nums.length; i++) {
        for(let j = target; j >= nums[i]; j--) {
            dp[j] = dp[j] || dp[j -nums[i]]
        }
    }

    return dp[target]
};
```

[406. 根据身高重建队列](https://leetcode.cn/problems/queue-reconstruction-by-height/)

```javascript
var reconstructQueue = function(people) {
	//从高到矮排序，身高相同 `k` 小的在前
    people.sort(([h1,k1], [h2, k2]) => {
        if(h1!==h2) {
            return h2-h1
        } else {
            return k1-k2
        }
    })
    const res = []
    //根据自己的 `k` 值，强行插队
    for(let i = 0; i< people.length;i++){
        const p = people[i]
        res.splice(p[1], 0, p)
    }
    return res
};
```


[394. 字符串解码](https://leetcode.cn/problems/decode-string/)

```javascript
var decodeString = function(s) {
    const strStack = []
    const numStack = []
    let res = ''
    let multi = 0

    for(let char of s) {
        if(+char >= 0 && +char <=9) {
            multi = multi * 10 + (+char)
        } else if(char === '[') {
            numStack.push(multi)
            multi = 0
            strStack.push(res)
            res = ''
        } else if(char === ']') {
            let currMulti = numStack.pop()
            let currRes = strStack.pop()
            res = currRes+ res.repeat(currMulti)
        } else {
            res +=char
        }
    }
    return res
};
```


[347. 前 K 个高频元素](https://leetcode.cn/problems/top-k-frequent-elements/)


```javascript
var topKFrequent = function(nums, k) {
    class MinHeap {
        constructor() {
            this.heap = []
        }
        size() {
            return this.heap.length
        }
        parentIndex(i) {
            return (i-1)>>1
        }
        leftIndex(i) {
            return i * 2 +1
        }
        rightIndex(i) {
            return i * 2 +2
        }
        swap(i, j) {
            [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
        }
        shiftUp(index) {
            let i = index
            while(i>0) {
                let pi = this.parentIndex(i)
                if(this.heap[pi].val > this.heap[i].val) {
                    this.swap(i, pi)
                    i = pi
                } else break
            }
        }
        shiftDown(i) {
            let li = this.leftIndex(i)
            let ri = this.rightIndex(i)

            let si = this.heap[li]?.val > this.heap[ri]?.val ? ri: li
            if(this.heap[si] && this.heap[si].val < this.heap[i].val) {
                this.swap(si, i)
                this.shiftDown(si)
            }
        }
        push(item) {
            this.heap.push(item)
            this.shiftUp(this.size() - 1)
        }
        pop() {
            this.heap[0] = this.heap.pop()
            this.shiftDown(0)
        }
    }

    const map = new Map()
    nums.forEach(item => {
        map.set(item, map.get(item) ? map.get(item) + 1 : 1)
    })
    const heap = new MinHeap()
    for([key, val] of map) {
        heap.push({key, val})
        if(heap.size() > k) {
            heap.pop()
        }
    }
    return heap.heap.map(item => item.key)
};
```

