<template>
  <div :id="elementId()" v-if="robot">
    <h3>
      <span class="name" :class="{ editable: editing }" contenteditable="editing">Robot: {{ robot.robotId }}</span>
      <!-- <a href="#" v-show="editing" @click.prevent="save"><i class="material-icons" title="Save">check</i></a> -->
      <!-- <a href="#" v-show="editing" @click.prevent="cancelEditing"><i class="material-icons" title="Cancel">close</i></a> -->
      <!-- <a href="#" v-if="editing" @click.prevent="confirmDestroy"><i class="material-icons" title="Delete robot">delete</i></a> -->
      <a href="#" @click.prevent="fetchRobot(this.id)"><i class="material-icons" title="reload">cached</i></a>
      <!-- <router-link :to="{name: 'robotEdit', params: {id: id}}"><i class="material-icons">edit</i></router-link> -->
    </h3>
    <p>Public: {{ robot.isPublic }}</p>

    <div>
      <!-- search bar and useradd bar -->
      <h5>Users: <a href="#" v-show="!isAddingUser" @click.prevent="toggleAddingUser" title="Create a new member">+</a>
        <a href="#" v-show="isAddingUser" @click.prevent="addUser"><i class="material-icons" title="Save user">check</i></a>
        <a href="#" v-show="isAddingUser" @click.prevent="toggleAddingUser"><i class="material-icons" title="Cancel">close</i></a>
      </h5>
    </div>

    <div v-if="isAddingUser">
      <div class="row">
        <div class="col s6">
          Username:
          <div class="input-field inline">
            <input v-model="newUser.username" type="text">
            <!-- <label for="email_inline">Username</label> -->
          </div>
        </div>
        <div class="col s6">
          hasAccess:
          <div class="input-field inline">
            <input v-model="newUser.email" type="email" class="validate">
            <!-- <label for="email_inline">Email</label> -->
          </div>
        </div>
      </div>

    </div>

    <table v-show="hasUsers" class="centered stripped highlight responsive-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Has Access</th>
          <th>Updated At</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in robot.users" :key="user.username">
          <td>{{ user.username }}</td><td>{{ user.hasAccess }}</td><td>{{ user.updatedAt }}</td>
        </tr>
        <!-- <UserTableRow v-for="user in users" :key="user._id" :user="user"/> -->
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'robotPage',
  props: ['id'],
  //components: {
  //  Users,
  //},
  data() {
    return {
      editing: false,
      newUser: {
        username: '',
        hasAccess: '',
        updatedAt: '',
      },
      isAddingUser: false,
    }
  }, // end of data

  computed: {
    ...mapGetters(['getRobotByMongoId']),
    robot() {
      return this.getRobotByMongoId(this.id);
    },
    hasUsers() {
      return this.robot.users.length !== 0;
    },

  },

  async created() {
    await this.fetchRobot(this.id);
  },

  methods: {
    ...mapActions(['updateRobot', 'fetchRobot']),

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

    toggleAddingUser() {
      this.isAddingUser = !this.isAddingUser;
    }
  }
}
</script>

