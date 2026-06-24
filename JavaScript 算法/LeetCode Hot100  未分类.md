[48. 旋转图像](https://leetcode.cn/problems/rotate-image/)

解题思路 对角线加对称

```javascript
var rotate = function(matrix) {
    let n = matrix.length
    for(let i = 0; i< n; i++) {
        for(let j = i+1; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
        }
    }

    for(let i = 0; i< n;i++){
        matrix[i].reverse()
    }
    return matrix
};
```

  
[56. 合并区间](https://leetcode.cn/problems/merge-intervals/)

```javascript
var merge = function(intervals) {
    if(!intervals.length) return []
    intervals.sort((a, b) => a[0] - b[0])
    const res = [intervals[0]]
    let last = res[0]

    for(let i = 1; i< intervals.length;i++) {
        let curr = intervals[i]
        let last = res[res.length - 1]
        if(curr[0]>last[1]) {
            res.push(curr)
            last = curr
        } else {
            last[1] < curr[1] && (last[1] = curr[1])
        }
    }

    return res
};
```