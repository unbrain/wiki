## 排序

### 冒泡排序


```javascript
function bubble(arr) {
	let j = arr.length - 1
	for(let num = 0; num < arr.length-2; num++) {
		let i = 0
		while(i<j) {
			if(arr[i] > arr[i+1]) {
				[arr[i], arr[i+1]] = [arr[i+1], arr[i]]	
			}
			i = i+1
		}
		j--
	}
	return arr
}
```

```javascript
funtion buble(arr) {
	for(let i = 0; i < arr.length -1; i++) {
		for(let j = 0; j < arr.length -1 -i; j++) {
			if(arr[j] > arr[j+1]) {
				[arr[j], arr[j+1]] = [arr[j+1]， arr[j]]
			}
		}
	}
	return arr
}
```

### 选择排序

```javascript
const selectionSort = (arr) => {
	for(let i=0; i< arr.length -1; i++) {
		let max = i
		for(let j = i+1; j< arr.length; j++) {
			if(arr[j] > arr[max]) {
				max = j
			}
		}
		if(max !== i) {
			[arr[i], arr[max]] = [arr[max], arr[i]]
		}
	}
	return arr
}
```

### 插入排序

```javascript
const insertSort = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        for(let j = i;j > 0; j--) {
            if(arr[j]< arr[j-1]) {
                [arr[j], arr[j-1]] = [arr[j-1], arr[j]]
            }
        }
    }
    return arr
}
```

```javascript
const insertSort = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        const temp = arr[i]
        let j = i-1
        while(j>=0 && arr[j]>temp) {
	        arr[j+1] = arr[j]
	        j--
        }
        arr[j+1] = temp
    }
    return arr
}
```

### 归并排序

```javascript
cosnt mergeSort(arr) {
	
}
```