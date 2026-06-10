[42. 接雨水](https://leetcode.cn/problems/trapping-rain-water/)

解题思路：
双指针  
两头对齐，向中靠拢
谁矮算谁，木桶效应
大则更新，小则灌水

```javascript
    while(left <= right) {
        if (height[left] < height[right]) {
            if(height[left] >= maxLeft) {
                maxLeft = height[left]
            } else {
                count += maxLeft - height[left]
            }
            left++
        } else {
            if(height[right]>=maxRight) {
                maxRight = height[right]
            } else {
                count+=maxRight -height[right]
            }
            right--
        }
    }



    return count
```