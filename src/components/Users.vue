<template>
  <div>
    <div>
      <!-- search bar and user creation bar -->
      <button v-if="!isAddingUser" @click="toggleAddingUser">Create User</button>
      <button v-else @click="addUser">Save User</button>
    </div>
    <div v-if="isAddingUser">
      <div class="row">
        <div class="col s4">
          Username:
          <div class="input-field inline">
            <input v-model="newUser.username" type="text">
            <!-- <label for="email_inline">Username</label> -->
          </div>
        </div>
        <div class="col s4">
          Email:
          <div class="input-field inline">
            <input v-model="newUser.email" type="email" class="validate">
            <!-- <label for="email_inline">Email</label> -->
          </div>
        </div>
        <div class="col s4">
          Password:
          <div class="input-field inline">
            <input v-model="newUser.password" type="text">
            <!-- <label for="email_inline">Password</label> -->
          </div>
        </div>
      </div>

    </div>
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
import { mapActions } from 'vuex'

export default {
  name: 'users',
  props: ['groupId', 'users'],
  data() {
    return {
      newUser: {
        username: '',
        email: '',
        groupId: this.groupId,
        password: '',
      },

      isAddingUser: false,
    }
  },
  components: {
    UserTableRow,
  },

  methods: {
    ...mapActions(['createUser']),
    toggleAddingUser() {
      this.isAddingUser = !this.isAddingUser;
      this.resetNewUser();
    },

    resetNewUser() {
      this.newUser = {
        username: '',
        email: '',
        groupId: this.groupId,
        password: '',
      };
    },

    async addUser() {
      this.isAddingUser = false;
      await this.createUser(this.newUser);
      this.newUser
    }
  }
}
</script>
