<template>
  <div>
    <form>
      <label>Group name: </label>
      <input type="text" v-model="groupName"/>
      <button @click.prevent="createGroup">Create</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'groupForm',
  data() {
    return {
      groupName: ''
    }
  }, // end of data
  created() {
  },
  methods: {
    async createGroup() {
      let name = this.groupName;
      console.log('creating group', name);
      const endpoint = this.$store.state.SERVER_ADDRESS + '/api/groups'
      let response = await axios.post(endpoint, {name: name}, {
        withCredentials: true
      })
      console.log(response);
    },
  }
}
</script>

