<template>
  <div>
    <div class="grid">
      <div v-for="robot in robots" v-bind:key="robot._id" class="card  teal">
        <router-link :to="{name: 'robot', params: {id: robot._id}}">
          <div class="card-content white-text">
            <span class="card-title">
              {{ robot.robotId }}
            </span>
            <p>robot description or users here</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'robots',
  data() {
    return {
    }
  }, // end of data
  created() {
    this.fetchRobots()
  },
  computed: {
    robots() {return this.$store.state.robots}
  },
  methods: {
  ...mapActions(['fetchRobots'])
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

