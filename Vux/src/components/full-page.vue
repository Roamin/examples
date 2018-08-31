<template>
  <view-box :body-padding-top="bodyPaddingBottom" :body-padding-bottom="bodyPaddingTop">
    <x-header class="header" ref="header" v-transfer-dom></x-header>

    <div class="content">
      <p v-for="i in 50">{{ i }}</p>
    </div>

    <tabbar ref="tabbar" v-transfer-dom>
      <tabbar-item>
        <span slot="label">Wechat</span>
      </tabbar-item>
      <tabbar-item>
        <span slot="label">DingDing</span>
      </tabbar-item>
      <tabbar-item>
        <span slot="label">QQ</span>
      </tabbar-item>
    </tabbar>
  </view-box>
</template>

<script>
import {ViewBox, XHeader, Tabbar, TabbarItem, TransferDom} from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem
  },
  data () {
    return {
      bodyPaddingTop: 0,
      bodyPaddingBottom: 0
    }
  },
  mounted () {
    this.bodyPaddingTop = this.$refs.header.$el.clientHeight + 'px'
    this.bodyPaddingBottom = this.$refs.tabbar.$el.clientHeight + 'px'
  }
}
</script>

<style lang="less">
  html,
  body {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }

  .header {
    position: absolute !important;
    top: 0;
    left: 0;
    width: 100%;
  }

  .content {
    text-align: center;
    color: #333;

    p {
      margin: 12px;
      line-height: 36px;
      background-color: orange;
    }
  }
</style>
