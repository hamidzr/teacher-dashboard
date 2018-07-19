import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Group from './views/Group.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/groups/new',
      name: 'groupNew',
      component: Group
    },
    { // used for viewing and editing the group
      path: '/groups/:id',
      name: 'group',
      component: Group,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login',
      beforeEnter() {
        let destination = location.href
        location.href = `https://login.netsblox.org?redirect=${destination}`
      }
    },
  ]
})
