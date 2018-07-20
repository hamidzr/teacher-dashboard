<template>
  <div class="home">
    <router-link to="/groups/new">New Group</router-link>
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
