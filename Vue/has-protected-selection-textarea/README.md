# custom-text

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# 思路

- KeyDown 触发的时候
- 如果是删除操作（next）
- 获取当前选区（selectionStart 和 selectionEnd），如果当前 selection 在被保护文字区域 protectedSelection 范围内 （next）
- e.preventDefault() 阻止当前删除操作
- done

> 参考：
- [vue#按键修饰符](https://cn.vuejs.org/v2/guide/events.html#%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6)
- [vue#按键修饰符#keyCodes配置](https://cn.vuejs.org/v2/api/#keyCodes)，这个看情况，如果出现删除按键没匹配上，再使用这个配置吧


## Demo

- [preview](http://htmlpreview.github.io/?https://github.com/RoamIn/examples/blob/master/Vue/has-protected-selection-textarea/dist/index.html))
