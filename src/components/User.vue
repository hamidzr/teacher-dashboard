<template>
  <div :id="htmlId()">
    <li>username:
      <span class="username" :contenteditable="editing">{{ user.username }}</span>
      email:
      <span class="email" :contenteditable="editing">{{ user.email }}</span>
      <a href="#" v-if="editing" @click.prevent="save"><i class="material-icons">check</i></a>
      <a href="#" v-else @click.prevent="toggleEditing"><i class="material-icons">edit</i></a>
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
    ...mapActions(['deleteUser', 'updateUser']),
    async deleteUserConfirm() {
      if (confirm(`are you sure you want to delete user ${this.user.username}?`)) {
        return await this.deleteUser(this.user);
      }
    },

    toggleEditing() {
      this.editing = !this.editing;
    },

    async save() {
      this.toggleEditing();
      let updatedUser = {...this.user, ...this.readValues()};
      try {
        await this.updateUser(updatedUser);
      } catch (e) {
        // revert html values back?
        alert('failed to update user', e);
      }
    },

    htmlId() {
      return '_' + this.user._id;
    },

    readValues() {
      let username = document.querySelector(`#${this.htmlId()} .username`).innerText;
      let email = document.querySelector(`#${this.htmlId()} .email`).innerText;
      this.user.username = username;
      // this.user.email = email;
      return {username, email};
    }
  }
}
</script>
