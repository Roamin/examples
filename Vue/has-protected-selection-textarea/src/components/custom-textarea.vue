<template>
  <textarea ref="textarea"
            @input="onInput"
            @keydown.delete="onDeleteKeyDown"
            v-model="val"></textarea>
</template>

<script>
export default {
  name: 'custom-textarea',
  props: {
    value: {
      required: true,
      type: [Number, String]
    },
    protectedSelection: {
      type: String,
      default: '0,0' // 'Start,End'
    }
  },
  data () {
    return {
      val: ''
    }
  },
  computed: {
    protectedSelectionStart () {
      return parseInt(this.protectedSelection.split(',')[0])
    },
    protectedSelectionEnd () {
      return parseInt(this.protectedSelection.split(',')[1])
    }
  },
  methods: {
    onInput () {
      this.$emit('input', this.val)
    },
    onDeleteKeyDown (e) {
      const {target} = e

      console.log(`deleteKeyDown:
        selectionStart: ${target.selectionStart}
        selectionStart: ${target.selectionEnd}
        length: ${target.value.length}
        value: ${target.value}
        keyCode: ${e.which}
      `)

      // 如果包含不能删除的区域，禁止
      if (this.isContainsProtectedSelection(target.selectionStart, target.selectionEnd)) {
        e.preventDefault()
      }
    },
    isContainsProtectedSelection (start, end) {
      // 第二个或条件这里其实没必要，因为假设不能删除的字符串就在开头
      // 如果字符串位置不固定，那么是需要的，且 props 的 protectedSelection 也需要动态计算
      return !(start > this.protectedSelectionEnd || end < this.protectedSelectionStart)
    }
  },
  mounted () {
    this.val = this.value
  }
}
</script>

<style scoped>

</style>
