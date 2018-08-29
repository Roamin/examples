<template>
    <section>
      <x-header :left-options="{showBack: false}" class="header">Chat</x-header>

      <swipeout class="chat-list">
        <swipeout-item v-for="(chat, index) in chatList" :key="index">
          <div slot="right-menu">
            <swipeout-button @click.native="markChatAsRead(index)">Read</swipeout-button>
            <swipeout-button type="warn" @click.native="deleteChat(index)">Delete</swipeout-button>
          </div>
          <div slot="content">
            <panel :list="[chat]"></panel>
          </div>
        </swipeout-item>
      </swipeout>
    </section>
</template>

<script>
import {XHeader, Swipeout, SwipeoutItem, SwipeoutButton, Panel} from 'vux'

export default {
  components: {
    XHeader,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Panel
  },
  data () {
    return {
      chatList: [
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
    markAsRead (index) {
      console.log(index)
    },
    deleteChat (index) {
      console.log(index)
      this.chatList.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
