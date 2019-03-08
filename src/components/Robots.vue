<template>
  <div>
    <div v-if="!hasRobots">
      <p>Setup a robot to see it here.</p>
    </div>
    <div class="grid">
      <div v-for="robot in robots" v-bind:key="robot._id" class="card" :class="{ teal: robot.isPublic, blue: !robot.isPublic }">
        <router-link :to="{name: 'robot', params: {id: robot._id}}">
          <div class="card-content white-text">
            <span class="card-title">
              {{ robot.robotId }}
            </span>
              <i v-if="robot.isLive" class="material-icons" title="recently online">signal_wifi_4_bar</i>
              <i v-else class="material-icons" title="offline">signal_wifi_off </i>

            <p>{{ robot.isPublic ? 'Public' : 'Protected' }}, Users: {{ robot.users.length }}</p>
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
      state: this.$store.state,
    }
  }, // end of data
  created() {
    this.fetchRobots();
    this.fetchAliveRobots();
  },
  computed: {
    robots() { // almost
      let robots = this.state.robots;
      robots = robots.map(r => {
        r.isLive = this.state.liveRobots.includes(r.robotId);
        return r;
      });
      return robots;
    },
    hasRobots() {
      return this.$store.state.robots.length !== 0;
    },
  },
  methods: {
    ...mapActions(['fetchRobots', 'fetchAliveRobots'])
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

