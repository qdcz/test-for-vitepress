## 前端

[HTML](../service/NodeJs/index.md)

[CSS](../service/NodeJs/index.md)

[JavaScript](../client/javaScript/index.md)

[TypeScript](../client/TypeScript/index.md)

[Vue](../service/NodeJs/index.md)

[React](../service/NodeJs/index.md)

[ThreeJs](../service/NodeJs/index.md)

[Electron](../client/Electron/index.md)

## 后端

[NodeJs](../service/NodeJs/index.md)

[MongoDB](../service/Mongodb/index.md)

[Mysql](../service/NodeJs/index.md)

[express](../service/NodeJs/index.md)

[koa](../service/koa/index.md)

[egg](../service/NodeJs/index.md)

[nestJs](../service/NodeJs/index.md)





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