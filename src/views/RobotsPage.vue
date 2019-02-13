<template>
  <div class="home">
    <h2>Your Robots
      <a href="#" @click.prevent="newRobot">+</a>
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

  computed: {
    robots() {return this.$store.state.robots}
  },

  methods: {
    ...mapActions(['updateRobot']),
  }
}
</script>
