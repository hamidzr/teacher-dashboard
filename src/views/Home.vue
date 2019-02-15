<template>
  <div class="home">
    <a :href="SERVER_ADDRESS" target="_blank"><img src="../assets/logo.png"></a>
    <p>Welcome to NetsBlox teacher dashboard.</p>
    <p>Server address: <a :href="SERVER_ADDRESS" target="_blank">{{ SERVER_ADDRESS }}</a></p>
  </div>
</template>

<script>
import store from '@/store';

export default {
  name: 'home',
  components: {
  },
  data() {
    return {
      SERVER_ADDRESS: store.state.SERVER_ADDRESS,
    }
  }
}
</script>

<style scoped>
img {
  max-width: 10vw;
  max-height: 10vh;
}
</style>
