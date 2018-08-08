<template>
  <div>
    <form>
      <legend>User form</legend>
      <label>username</label>
      <input type="text" required v-model="user.username"/>
      <label>email</label>
      <input type="text" v-model="user.email"/>
      <label>password</label>
      <input type="text" v-model="user.password"/>
      <button @click.prevent="saveNewUser">Save</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'groupView',
  props: ['groupId', 'user'],
  data() {
    return {
      // user: {
      //   username: '',
      //   email: '',
      //   password: ''
      // }
    }
  }, // end of data
  components: {
  },

  computed: {
  },

  async created() {
    console.log('my porp', this.user);
    // this.user.groupId = this.groupId;
  },
  methods: {
    ...mapActions(['createUser']),

    async saveNewUser() {
      this.user.groupId = this.groupId;
      await this.createUser(this.user);
    }
  }
}
</script>
