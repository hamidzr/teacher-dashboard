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
import { mapActions } from 'vuex'

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
    ...mapActions(['createGroup']),
  }
}
</script>

