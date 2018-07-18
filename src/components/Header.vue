<template>
  <header>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Login</router-link>
    </div>
    header content
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
  }
}
</script>

<style scoped lang="scss">
</style>
