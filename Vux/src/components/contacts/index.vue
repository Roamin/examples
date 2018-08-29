<template>
  <div>
    <x-header :left-options="{showBack: false}" class="header">Chat</x-header>
    <sticky>
      <tab default-color="#777" active-color="#ff4d64" class="header-tab">
        <tab-item selected>正在热映</tab-item>
        <tab-item>即将上映</tab-item>
      </tab>
    </sticky>

    <p v-for="i in 100">{{ i }}</p>
  </div>
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
  }
}
</script>

<style scoped>

</style>
