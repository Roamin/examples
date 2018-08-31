<template>
  <view-box :body-padding-top="'46px'" :body-padding-bottom="bodyPaddingBottom">
    <loading v-model="isLoading"></loading>
    <router-view></router-view>

    <tabbar class="tabbar" ref="tabbar" v-transfer-dom>
      <tabbar-item selected :link="{name: 'chats'}">
        <x-icon type="chatbubble" slot="icon"></x-icon>
        <span slot="label">Chats</span>
      </tabbar-item>
      <tabbar-item :link="{name: 'contacts'}">
        <x-icon type="ios-contact-outline" slot="icon"></x-icon>
        <span slot="label">Contacts</span>
      </tabbar-item>
      <tabbar-item :link="{name: 'me'}">
        <x-icon type="ios-person" slot="icon"></x-icon>
        <span slot="label">Me</span>
      </tabbar-item>
    </tabbar>
  </view-box>
</template>

<script>
import {ViewBox, XHeader, Tab, TabItem, Tabbar, TabbarItem, Swiper, Sticky, TransferDom} from 'vux'
import {mapState, mapActions} from 'vuex'

export default {
  directives: {
    TransferDom
  },
  components: {
    ViewBox,
    XHeader,
    Tab,
    TabItem,
    Tabbar,
    TabbarItem,
    Swiper,
    Sticky
  },
  data () {
    return {
      bodyPaddingBottom: 0,
      bannerList: [{
        url: 'javascript:',
        img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
        title: '送你一朵fua'
      }, {
        url: 'javascript:',
        img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
        title: '送你一辆车'
      }, {
        url: 'javascript:',
        img: 'https://static.vux.li/demo/5.jpg', // 404
        title: '送你一次旅行',
        fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
      }]
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading
    })
  },
  methods: {
    ...mapActions({})
  },
  mounted () {
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

  body {
    background-color: #efeff4;
  }

  .x-header {
    position: absolute !important;
    top: 0;
    left: 0;
    width: 100%;
    color: #fff;
    background-color: #1d1c21 !important;
  }

  .tabbar {
    background-color: #f8f8f8 !important;
  }
</style>
