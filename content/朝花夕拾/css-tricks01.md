---
title: "CSS 文字对齐"
date: 2018/3/18 20:46:25
tags:
  - CSS
  - 早期博客
  - 朝花夕拾
  - 笔试面试题
description: "CSS 文字对齐 - 早期技术探索与总结沉淀"
---

> [!note] 朝花夕拾 · 早期足迹
> 本文记录于 2017-2019 年早期前端探索时期，保留当时的真实成长轨迹与思考，归档作技术演进参考。

# CSS 文字对齐

### 在进行制作表单的时候为了使得让中文更加的顺眼可能会有让不同长度的文字左右对齐的需求就像这样

![](/static/img/csstrick01.png)



### HTML

先将文字放好

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
</head>
<body>
  <div>
    <span>姓名</span><br>
    <span>联系方式</span>
  </div>
  
</body>
</html>
```

### 	CSS

```css
div {
  border: 1px solid green;
}

span {
  border: 1px solid red;
  width: 5em;
  display: inline-block;
  
  text-align: justify;
  overflow: hidden;
  line-height: 20px;
  height: 20px;
}

span::after {
  content: '';
  width: 100%;
  display: inline-block;
}
```

就可以得到上图的样式，就可以将 border 删掉了。其实 CSS 感觉只要是将方法记住，而其中的道理的话就真的要好好的去记忆文档。
