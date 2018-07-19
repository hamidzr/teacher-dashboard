<template>
  <div>
    <div class="grid">
      <div v-for="group in groups" v-bind:key="group.name" class="card  teal">
        <router-link :to="{name: 'group', params: {id: group._id}}">
          <div class="card-content white-text">
            <span class="card-title">
              {{ group.name }}
            </span>
            <p>group description or members here</p>
          </div>
        </router-link>
      </div>
    </div>

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

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 2rem;
  grid-auto-rows: minmax(100px, auto);
}

.card:hover {
  box-shadow: 1px 1px 2px 2px gray;
}
</style>

