<template>
  <div>
    <table class="centered stripped highlight responsive-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <UserTableRow v-for="user in users" :key="user.username" :user="user"/>
      </tbody>
    </table>
  </div>
</template>

<script>
import UserTableRow from '@/components/UserTableRow.vue'

export default {
  name: 'users',
  props: ['groupId', 'users'],
  components: {
    UserTableRow,
  },
}
</script>
