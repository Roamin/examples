<template>
  <view-box>
    <router-view></router-view>

    <tabbar class="footer">
      <tabbar-item selected>
        <x-icon type="chatbubble" slot="icon"></x-icon>
        <span slot="label">Chats</span>
      </tabbar-item>
      <tabbar-item>
        <x-icon type="ios-contact-outline" slot="icon"></x-icon>
        <span slot="label">Contacts</span>
      </tabbar-item>
      <tabbar-item>
        <x-icon type="ios-person" slot="icon"></x-icon>
        <span slot="label">Me</span>
      </tabbar-item>
    </tabbar>
  </view-box>
</template>

<script>
import {ViewBox, XHeader, Tab, TabItem, Tabbar, TabbarItem, Swiper, Sticky} from 'vux'

export default {
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
  methods: {

  }
}
</script>

<style lang="less">
  html,
  body {
    height: 100%;
  }

  body {
    background-color: #efeff4;
  }

  .header {
    color: #fff;
    background-color: #1d1c21 !important;
  }

  .footer {
    background-color: #f8f8f8 !important;
  }
</style>
