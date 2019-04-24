<template>
  <div class="home">
    <h2>Your Robots
      <a href="#" @click.prevent="reload"><i class="material-icons" title="reload">cached</i></a>
    </h2>
    <Robots />
  </div>
</template>

<script>
import Robots from '@/components/Robots.vue'
import { mapActions } from 'vuex'

export default {
  name: 'robotsPage',
  components: {
    Robots
  },

  data() {
    return {
    }
  },

  computed: {
  },

  async created() {
  },

  methods: {
    ...mapActions(['fetchRobots', 'fetchAliveRobots']),

    async reload() {
      await this.fetchAliveRobots();
      await this.fetchRobots();
    },
  }
}
</script>
