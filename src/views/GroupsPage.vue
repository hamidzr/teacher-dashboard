<template>
  <div class="home">
    <h2>Your Groups
      <router-link to="/groups/new">+</router-link>
    </h2>
    <Groups />
  </div>
</template>

<script>
import Groups from '@/components/Groups.vue'

export default {
  name: 'groupsPage',
  components: {
    Groups
  }
}
</script>
