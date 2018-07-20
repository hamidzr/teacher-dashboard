<template>
  <div>
    <ul>
      <User v-for="user in users" :key="user.username" :user="user"/>
    </ul>
  </div>
</template>

<script>
import User from '@/components/User.vue'

export default {
  name: 'users',
  props: ['groupId', 'users'],
  components: {
    User,
  },
}
</script>
