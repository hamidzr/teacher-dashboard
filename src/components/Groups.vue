<template>
  <div>
    <div class="grid">
      <div v-for="group in groups" v-bind:key="group.name" class="card  teal">
        <router-link :to="{name: 'group', params: {id: group._id}}">
          <div class="card-content white-text">
            <span class="card-title">
              {{ group.name }}
            </span>
            <p>group description or users here</p>
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
    groups() {return this.$store.state.groups}
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

