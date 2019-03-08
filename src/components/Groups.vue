<template>
  <div>
    <div v-if="!hasGroups">
      <p>Add a group to see it here.</p>
    </div>
    <div class="grid">
      <div v-for="group in groups" v-bind:key="group._id" class="card  teal">
        <router-link :to="{name: 'group', params: {id: group._id}}">
          <div class="card-content white-text">
            <span class="card-title">
              {{ group.name }}
            </span>
            <p>No description provided.</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

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
    groups() {return this.$store.state.groups},
    hasGroups() {
      return this.$store.state.groups.length !== 0;
    },
  },
  methods: {
    ...mapActions(['fetchGroups'])
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

