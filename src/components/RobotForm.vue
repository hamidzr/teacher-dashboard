<template>
  <div>
    <form>
      <label>Robot name: </label>
      <input type="text" v-model="robot.robotId"/>
      <button v-if="isEditing" @click.prevent="updateRobot(robot)">Update</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['robot'],
  data() {
    return {
    }
  }, // end of data
  computed: {
    isEditing() {
      return this.robot._id;
    }
  },
  created() {
  },
  methods: {
    ...mapActions(['updateRobot']),
  }
}
</script>

