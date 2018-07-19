<template>
  <div class="home">
    <img src="../assets/logo.png">
    <Groups />
  </div>
</template>

<script>
// @ is an alias to /src
import Groups from '@/components/Groups.vue'

export default {
  name: 'home',
  components: {
    Groups
  }
}
</script>
