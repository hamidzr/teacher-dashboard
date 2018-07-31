<template>
  <div>
    <form>
      <label>Group name: </label>
      <input type="text" v-model="group.name"/>
      <button v-if="isEditing" @click.prevent="updateGroup(group)">Update</button>
      <button v-else @click.prevent="createGroup(group.name)">Create</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['group'],
  data() {
    return {
    }
  }, // end of data
  computed: {
    isEditing() {
      return this.group._id;
    }
  },
  created() {
  },
  methods: {
    ...mapActions(['createGroup', 'updateGroup']),
  }
}
</script>

