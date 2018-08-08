<template>
  <div class="inline-inputs" :id="htmlId()">
    <div>
      email:
      <span class="email" :contenteditable="editing">{{ user.email }}</span>
    </div>
    <div>
      username:
      <span class="username" :contenteditable="editing">{{ user.username }}</span>
    </div>
    <div v-if="isNewUser" >
      password:
      <span class="password" :contenteditable="editing">{{ user.password }}</span>
    </div>
    <a href="#" v-if="editing" @click.prevent="save"><i class="material-icons">check</i></a>
    <a href="#" v-else @click.prevent="toggleEditing"><i class="material-icons">edit</i></a>
    <a href="#" @click.prevent="deleteUserConfirm()"><i class="material-icons">delete</i></a>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'user',
  props: ['user', 'groupId'],
  data() {
    return {
      editing: false,
    }
  },

  computed: {
    isNewUser() {
      return this.user._id === undefined;
    },
  },

  methods: {
    ...mapActions(['deleteUser', 'updateUser', 'createUser']),
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
      let userValues = {...this.user, ...this.readValues()};
      try {
        if (this.isNewUser()) {
          await this.createUser(userValues);
        } else {
          await this.updateUser(userValues);
        }
      } catch (e) {
        // revert html values back?
        alert('failed to save user', e);
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

<style>
.inline-inputs div {
  display: inline;
}
</style>
