<template>
  <header>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link v-show="!user" to="/login">Login</router-link>
      <a href="#" v-show="!!user" @click="logout">Logout</a>
    </div>
    header content
  </header>
</template>

<script>
import authMixin from '@/mixins/auth'

export default {
  name: 'Header',
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
  }
}
</script>

<style scoped lang="scss">
</style>
