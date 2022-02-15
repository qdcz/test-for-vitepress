[[toc]]
[1231](../client/html)

## 测试学习文档
阿松大
# 7
456

### 1.454
456

### 2.454
545

::: tip
This is a tip
:::

::: info
This is an info box
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: details
This is a details block, which does not work in Internet Explorer or Edge.
:::


::: danger STOP
Danger zone, do not proceed
:::

::: details Click me to view the code
```js
console.log('Hello, VitePress!')
```
:::


```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

---
title: about1
navbar: false
---


# {{ $frontmatter.title }}


| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

:tada: :100:

{{ 1 + 1 }}

<script setup>
import { useData } from 'vitepress'
const { page } = useData()
</script>

<pre>{{ page }}</pre>