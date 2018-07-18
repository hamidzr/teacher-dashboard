<template>
  <div class="home">
    <img src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Groups />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Groups from '@/components/Groups.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    Groups
  }
}
</script>
