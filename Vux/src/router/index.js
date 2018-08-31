import Vue from 'vue'
import Router from 'vue-router'

import chats from './chats'
import contacts from './contacts'
import me from './me'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/components/app'),
      children: [
        {
          path: '/',
          redirect: '/chats'
        },
        chats,
        contacts,
        me
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/login')
    },
    {
      path: '/full-page',
      name: 'full-page',
      component: () => import('@/components/full-page')
    }
  ]
})
