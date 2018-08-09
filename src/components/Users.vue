<template>
  <div>
    <div>
      <!-- search bar and user creation bar -->
      <h5>Members: <a href="#" v-show="!isAddingUser" @click.prevent="toggleAddingUser" title="Create a new member">+</a>
        <a href="#" v-show="isAddingUser" @click.prevent="addUser"><i class="material-icons" title="Save user">check</i></a>
        <a href="#" v-show="isAddingUser" @click.prevent="toggleAddingUser"><i class="material-icons" title="Cancel">close</i></a>
      </h5>
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
    <table v-show="hasUsers" class="centered stripped highlight responsive-table">
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

  computed: {
    hasUsers() {
      return this.users.length !== 0;
    }
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
      try {
        let createdUser = await this.createUser(this.newUser);
        this.users.push(createdUser)
      } catch(e) {
        console.error(e);
        alert(e);
      }
    }
  }
}
</script>
