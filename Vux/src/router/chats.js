export default {
  path: '/chats',
  component: {template: '<router-view></router-view>'},
  children: [
    {
      path: '',
      name: 'chats',
      component: () => import('@/components/chats')
    },
    {
      path: ':id',
      name: 'chat',
      component: () => import('@/components/chats/chat/index.vue')
    }
  ]
}
