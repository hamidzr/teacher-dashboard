<template>
  <div :id="elementId()">
    <h3>
      <span class="name" :class="{ editable: editing }" contenteditable="editing">{{ robot.robotId }}</span>
      <a href="#" v-show="editing" @click.prevent="save"><i class="material-icons" title="Save">check</i></a>
      <a href="#" v-show="editing" @click.prevent="cancelEditing"><i class="material-icons" title="Cancel">close</i></a>
      <a href="#" v-if="editing" @click.prevent="confirmDestroy"><i class="material-icons" title="Delete robot">delete</i></a>
      <a href="#" v-else @click.prevent="toggleEditing"><i class="material-icons" title="Edit">edit</i></a>
      <!-- <router-link :to="{name: 'robotEdit', params: {id: id}}"><i class="material-icons">edit</i></router-link> -->
    </h3>
    <Users :robotId="id" :users="robot.users" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Users from '@/components/Users.vue'


export default {
  name: 'robotPage',
  props: ['id'],
  components: {
    Users,
  },
  data() {
    return {
      editing: false,
      aUser: {
        username: '',
        email: '',
        password: '',
      },
    }
  }, // end of data

  created() {
    this.loadRobotData(this.id);
  },

  methods: {
    ...mapActions(['updateRobot']),

    // TODO refactor editable field to its own component
    async save() {
      this.toggleEditing();
      let robot = {...this.robot, ...this.readValues(['name'])};
      try {
        await this.updateRobot(robot);
        this.robot.robotId = robot.name; // try to keep the bindings?
      } catch (e) {
        console.error(e);
        alert(e.response.data);
      }
    },

    async confirmDestroy() {
      if (confirm(`Are you use you want to delete ${this.robot.robotId}`)) {
        let robotName = this.robot.robotId;
        try {
          await this.deleteRobot(this.robot);
          this.$router.push({name: 'robots'});
          alert(`robot ${robotName} deleted.`);
        } catch (e) {
          console.error(e);
          alert(e.response.data);
        }
      }
    },

    cancelEditing() {
      this.resetFields();
      this.toggleEditing();
    },

    resetFields() {
      this.setValues({
        name: this.robot.robotId
      })
    },

    toggleEditing() {
      this.editing = !this.editing;
    },

    setValues(keyVals) {
      for (let key in keyVals) {
        document.querySelector(`#${this.elementId()} .${key}`).innerText = keyVals[key];
      }
    },

    readValues(keys) {
      let keyVals = {};
      keys.forEach(key => {
        keyVals[key] = document.querySelector(`#${this.elementId()} .${key}`).innerText.trim();
      });
      return keyVals;
    },

    elementId() {
      return '_' + this.robot._id;
    },

  }
}
</script>

