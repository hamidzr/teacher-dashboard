<template>
  <div>
    <li>username: {{ user.username }}, email: {{ user.email }}
      <a href="#" ><i class="material-icons">edit</i></a>
      <a href="#" @click.prevent="deleteUserConfirm()"><i class="material-icons">delete</i></a>
    </li>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'user',
  props: ['user'],
  data() {
    return {
      editing: false,
    }
  },

  methods: {
    ...mapActions(['deleteUser', 'editUser']),
    async deleteUserConfirm() {
      if (confirm(`are you sure you want to delete user ${this.user.username}?`)) {
        return await this.deleteUser(this.user);
      }
    }
  }
}
</script>
