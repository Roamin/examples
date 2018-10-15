<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>

    <html-to-canvas></html-to-canvas>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import HtmlToCanvas from './components/HtmlToCanvas'

export default {
  name: 'App',
  components: {
    HelloWorld,
    HtmlToCanvas
  }
}
</script>

<style>
  body {
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-top: 60px;
  }
</style>
