// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import FastClick from 'fastclick'
import '@/theme.less'
import 'vux/src/styles/reset.less'
import store from './store'

import { Group, Cell, Loading, DatetimePlugin, BusPlugin, DevicePlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, AjaxPlugin, TransferDomDirective } from 'vux'

Vue.component('group', Group)
Vue.component('cell', Cell)
Vue.component('loading', Loading)

// plugins
Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(AjaxPlugin)
Vue.use(BusPlugin)
Vue.use(DatetimePlugin)

Vue.use(TransferDomDirective)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  template: '<router-view></router-view>'
}).$mount('#app-box')
