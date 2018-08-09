<template>
  <div id="app">
    <Header />
      <div class="container">
        <router-view/>
      </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'home',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
$color-black: black;

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: white;
}

body {
  background-color: $color-black;
}

.editable {
  font-style: italic;
  color: black;
  text-shadow: 0px 0px 20px rgb(251, 255, 0);
  /* font-size: 1.2rem; */
  /* text-decoration: underline; */
  /* text-decoration-style: dashed; */
}
</style>
