<template>
  <div class="home">
    <img src="../assets/logo.png">
    <p>Welcome to NetsBlox teacher dashboard.</p>
    <p>Server address: {{ SERVER_ADDRESS }}</p>
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
