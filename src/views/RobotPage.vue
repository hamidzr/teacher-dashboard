<template>
  <div :id="elementId()" v-if="robot">
    <h3>
      <span class="name" :class="{ editable: editing }" contenteditable="editing">Robot: {{ robot.robotId }}</span>
      <!-- <a href="#" v-show="editing" @click.prevent="save"><i class="material-icons" title="Save">check</i></a> -->
      <!-- <a href="#" v-show="editing" @click.prevent="cancelEditing"><i class="material-icons" title="Cancel">close</i></a> -->
      <!-- <a href="#" v-if="editing" @click.prevent="confirmDestroy"><i class="material-icons" title="Delete robot">delete</i></a> -->
      <a href="#" @click.prevent="pullRobotInfo"><i class="material-icons" title="reload">cached</i></a>
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
          <!-- FIXME positioning -->
          <label>
            <input name="group1" type="radio" value="true" v-model="newUser.hasAccess" checked />
            <span>True</span>
          </label>
          <label>
            <input name="group1" value="false" v-model="newUser.hasAccess" type="radio"/>
            <span>False</span>
          </label>
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
  props: ['id'], // robot mongo id
  //components: {
  //  Users,
  //},
  data() {
    return {
      editing: false,
      newUser: {
        username: '',
        hasAccess: 'true',
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

    allowedUsers() {
      return this.robot.users.filter(u => u.hasAccess);
    }
  },

  async created() {
    this.pullRobotInfo();
  },

  methods: {
    ...mapActions(['updateRobot', 'fetchRobot', 'updateUserAccess']),

    // TODO refactor editable field to its own component
    async save() {
      this.toggleEditing();
    },

    resetNewUser() {
      this.newUser = {
        username: '',
        hasAccess: 'true',
      }
    },

    async pullRobotInfo() {
      return this.fetchRobot(this.id);
    },

    async addUser() {
      let newUser = this.newUser;
      console.log('gonna ad user', newUser.username);
      try {
        await this.updateUserAccess({robotMongoId: this.id, user: this.newUser});
      } catch (e) {
        console.error(e);
        alert(e.response.data);
      }
      this.toggleAddingUser();
      this.resetNewUser();
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

