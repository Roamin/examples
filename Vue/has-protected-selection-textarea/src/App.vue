<template>
  <div id="app">
    <custom-textarea rows="6"
                     :protected-selection="protectedSelection"
                     v-model="str"></custom-textarea>
    <div>{{ JSON.stringify(str, null, 4) }}</div>
  </div>
</template>

<script>
import CustomTextarea from './components/custom-textarea'

export default {
  name: 'App',
  components: {
    CustomTextarea
  },
  data () {
    return {
      str: 'Try to delete me~\n', // 假设这是初始值
      protectedSelection: '0,18' // 起点为：0，终点为上述 str 初始值的长度：15
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  textarea {
    width: 400px;
    background: #fff;
    box-shadow: none;
    border: 1px solid #ccc;
  }
</style>
