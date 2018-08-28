<template>
  <view-box class="login-page">
    <div class="logo"></div>

    <group class="input-group">
      <x-input placeholder="Username" v-model="form.data.username"></x-input>
      <x-input type="password" placeholder="Password" v-model="form.data.password">
      </x-input>
    </group>

    <x-button type="primary" class="login-button" @click.native="login">登录</x-button>

    <flexbox class="more">
      <flexbox-item>
        <span>忘了密码？</span>
      </flexbox-item>

      <flexbox-item style="text-align: right;">
        <span>注册新账号</span>
      </flexbox-item>
    </flexbox>
  </view-box>
</template>

<script>
import {ViewBox, XButton, XInput, Flexbox, FlexboxItem, Group, Box, Divider, TransferDom} from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    ViewBox,
    XButton,
    XInput,
    Flexbox,
    FlexboxItem,
    Group,
    Box,
    Divider
  },
  data () {
    return {
      form: {
        data: {
          username: '',
          password: ''
        }
      },
      isLoading: false
    }
  },
  methods: {
    validate () {
      if (String(this.form.data.username).trim() === '') {
        return {
          error: '请填写用户名！'
        }
      }

      if (String(this.form.data.password).trim() === '') {
        return {
          error: '请填写密码！'
        }
      }

      return {
        error: false
      }
    },
    login () {
      const validation = this.validate()

      if (validation.error) {
        this.$vux.confirm.show({
          title: 'Error',
          showCancelButton: false,
          content: validation.error
        })

        setTimeout(() => {
          this.$vux.confirm.hide()
        }, 3000)

        return
      }

      this.$vux.loading.show()

      setTimeout(() => {
        this.$vux.loading.hide()

        this.$vux.confirm.show({
          title: 'Error',
          showCancelButton: false,
          content: 'The username or password is incorrect.'
        })
      }, 1000)
    }
  }
}
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  html, body {
    height: 100%;
  }

  body {
    background-color: #eee;
  }

  .login-page {
    position: relative;
    padding: 0 30px;
    box-sizing: border-box;
  }

  .logo {
    margin: 50px auto 30px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: url("../assets/logo.jpeg") center no-repeat;
    background-size: cover;
  }

  .input-group {
    margin-bottom: 15px;
  }

  .weui-cells {
    border-radius: 4px;

    &:before,
    &:after {
      display: none;
    }
  }

  .login-button {
    background-color: #146fdf !important;
  }

  .more {
    margin-bottom: 50px;
    padding-top: 15px;

    span {
      padding: 15px 10px;
      color: #246183;
    }
  }
</style>
