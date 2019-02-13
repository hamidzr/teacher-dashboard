<template>
  <header>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/groups">Groups</router-link> |
      <router-link to="/robots">Roboscape</router-link> |
      <router-link to="/help">Help</router-link> |
      <router-link v-if="!user" to="/login">Login</router-link>
      <a href="#" v-if="!!user" @click="logoutWithConfirm">Logout ({{ user.username }})</a>
    </div>
  </header>
</template>

<script>
import authMixin from '@/mixins/auth'

export default {
  name: 'headerComp',
  props: {
  },
  mixins: [
    authMixin
  ],
  created() {
    document.authenticator = this.authenticator // make authenticator available globally for DEV
    this.fetchUser()
  },
  methods: {
    logoutWithConfirm() {
      if (confirm('Are you sure?')) this.logout()
    }
  }
}
</script>

<style lang="scss">
header {
  text-align: center;
  margin-bottom: 1rem;
}

#nav { /* should be using nav */
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
