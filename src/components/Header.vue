<template>
  <header>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/groups/new">Group</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link v-if="!user" to="/login">Login</router-link>
      <a href="#" v-if="!!user" @click="logoutWithConfirm">Logout ({{ user.username }})</a>
    </div>
    header content
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

<style scoped lang="scss">
</style>
