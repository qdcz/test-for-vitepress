## HTML
[HTML](../client/javaScript/index.md)
## CSS
[CSS](../client/javaScript/index.md)
## JavaScript
[JavaScript](../client/javaScript/index.md)
## Vue
[Vue](../client/javaScript/index.md)
## React
[React](../client/javaScript/index.md)
## ThreeJs
[ThreeJs](../client/javaScript/index.md)
## MongoDB
[MongoDB](../client/javaScript/index.md)
## Mysql
[Mysql](../client/javaScript/index.md)
## NodeJs
[NodeJs](../client/javaScript/index.md)
## express
[express](../client/javaScript/index.md)
## koa
[koa](../client/javaScript/index.md)
## egg
[egg](../client/javaScript/index.md)
## nestJs
[nestJs](../client/javaScript/index.md)




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