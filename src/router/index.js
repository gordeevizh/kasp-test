import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/components/IndexPage'
import KasperskyUsers from '@/components/KasperskyUsers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/users',
      name: 'Users',
      component: KasperskyUsers
    }
  ]
})
