import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import GroupPage from './views/GroupPage.vue'
import GroupsPage from './views/GroupsPage.vue'
import GroupChangePage from './views/GroupChangePage.vue'
import RobotPage from './views/RobotPage.vue'
import RobotsPage from './views/RobotsPage.vue'
import RobotChangePage from './views/RobotChangePage.vue'
import Help from './views/Help.vue'
import store from './store'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/groups',
      name: 'groups',
      component: GroupsPage
    },
    {
      path: '/groups/new',
      name: 'groupNew',
      component: GroupChangePage,
    },
    {
      path: '/groups/:id/edit',
      name: 'groupEdit',
      component: GroupChangePage,
      props: true
    },
    { // used for viewing
      path: '/groups/:id',
      name: 'group',
      component: GroupPage,
      props: true
    },
    {
      path: '/robots',
      name: 'robots',
      component: RobotsPage,
    },
    {
      path: '/robots/:id/edit',
      name: 'robotEdit',
      component: RobotChangePage,
      props: true
    },
    { // used for viewing
      path: '/robots/:id',
      name: 'robot',
      component: RobotPage,
      props: true
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    },
    {
      path: '/login',
      beforeEnter() {
        let destination = location.href
        location.href = `https://login.netsblox.org?url=${store.state.SERVER_ADDRESS}&redirect=${destination}`
      }
    },
  ]
})
