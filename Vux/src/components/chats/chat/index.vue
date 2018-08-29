<template>
    <section>
      <x-header class="header"
                :left-options="{backText: 'Chats'}"
                :right-options="{showMore: true}" @on-click-back="goBack">416 Studio</x-header>

      <ul>
        <msg v-for="(msg, index) in msgList" :key="index" :msg="msg"></msg>
      </ul>
    </section>
</template>

<script>
import {XHeader, Swipeout, SwipeoutItem, SwipeoutButton, Panel} from 'vux'
import Msg from './msg'

export default {
  components: {
    XHeader,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Panel,

    Msg
  },
  data () {
    return {
      msgList: [
        {
          avatar: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          name: 'Vinci',
          desc: '[Photo]',
          url: '/chats/1'
        },
        {
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: 'Group 2',
          desc: 'Vinci: Just go. If you go too, let\'s me known. Gnite',
          url: '/chats/2'
        },
        {
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: 'Home',
          desc: '[Photo]',
          url: '/chats/3'
        },
        {
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: 'Kitty',
          desc: '[Photo]',
          url: '/chats/4'
        },
        {
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: 'Kitty',
          desc: '[Photo]',
          url: '/chats/5'
        },
        {
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: 'Kitty',
          desc: '[Photo]',
          url: '/chats/6'
        },
        {
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: 'Kitty',
          desc: '[Photo]',
          url: '/chats/7'
        },
        {
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: 'Kitty',
          desc: '[Photo]',
          url: '/chats/8'
        },
        {
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: 'Kitty',
          desc: '[Photo]',
          url: '/chats/9'
        },
        {
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: 'Kitty',
          desc: '[Photo]',
          url: '/chats/10'
        },
        {
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: 'Kitty',
          desc: '[Photo]',
          url: '/chats/11'
        }
      ]
    }
  },
  methods: {
    goBack () {
      this.$router.go({
        name: 'chats'
      })
    }
  }
}
</script>

<style scoped>

</style>
