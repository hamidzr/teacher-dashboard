<template>
  <div>
    <ul>
      <li v-for="grp in groups" :key="grp.name">{{ grp.name }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'groups',
  data() {
    return {
    }
  }, // end of data
  created() {
    this.fetchGroups()
  },
  computed: {
    groups() {return this.$store.state.groups}
  },
  methods: {
    async fetchGroups() {
      const endpoint = this.$store.state.SERVER_ADDRESS + '/api/groups'
      let { data: groups } = await axios.get(endpoint, {
        withCredentials: true,
      })
      this.$store.state.groups = groups;
      return groups;
    },
  }
}
</script>

