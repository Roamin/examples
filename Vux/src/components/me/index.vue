<template>
  <div>
    <x-header :left-options="{showBack: false}" class="header">Me</x-header>

    <group>
      <cell title="Wallet" is-link>
        <x-icon type="social-bitcoin" size="20" slot="icon"></x-icon>
      </cell>
    </group>

    <group>
      <cell title="Settings" is-link>
        <x-icon type="settings" size="20" slot="icon"></x-icon>
      </cell>
    </group>
  </div>
</template>

<script>
import {Group, Cell, XHeader, Tab, TabItem, Tabbar, TabbarItem, Swiper, Sticky} from 'vux'

export default {
  components: {
    Group,
    Cell,
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
