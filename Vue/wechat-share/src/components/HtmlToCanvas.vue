<template>
  <div>
    <button>Share</button>
    <button @click="capture">Capture</button>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'

export default {
  name: 'html-to-canvas',
  props: {
    selector: {
      type: String,
      default: 'body'
    }
  },
  data () {
    return {}
  },
  methods: {
    capture () {
      const $selector = document.querySelector(this.selector)
      const box = window.getComputedStyle($selector)
      const scale = this.getDPR()
      const canvas = document.createElement('canvas')

      const width = parseInt(box.width)
      const height = parseInt(box.height)

      // 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
      canvas.width = width * scale
      canvas.height = height * scale
      // 设定 canvas css宽高为 DOM 节点宽高
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      // 获取画笔
      const context = canvas.getContext('2d')

      // 将所有绘制内容放大像素比倍
      context.scale(scale, scale)

      html2canvas($selector, {
        canvas,
        scale,
        width: box.width,
        height: box.height
      }).then((canvas) => {
        this.toImg(canvas.toDataURL('image/png'), width, height)
      })
    },
    getDPR () {
      if (window.devicePixelRatio && window.devicePixelRatio > 1) {
        return window.devicePixelRatio
      }

      return 1
    },
    toImg (data, width, height) {
      const img = new Image()

      img.src = data
      img.width = width
      img.height = height
      img.style.position = 'absolute'
      img.style.top = 0
      img.style.left = 0
      // img.style.width = '100%'

      document.body.appendChild(img)
    }
  }
}
</script>

<style scoped>

</style>
