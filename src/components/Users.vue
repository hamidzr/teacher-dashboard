<template>
  <div>
    <div>
      <!-- search bar and user creation bar -->
      <h5>Members: <a href="#" v-show="!isAddingUser" @click.prevent="toggleAddingUser" title="Create a new member">+</a>
        <a style="position: relative"
            href="#" v-show="!isAddingUser"
            @click.prevent="uploadCSV"
            title="Create members from CSV&#010;(columns: username,email,password)">
            <i style="top: 2px; position: absolute;" class="material-icons" >arrow_circle_up</i>
        </a>
        <a href="#" v-show="isAddingUser" @click.prevent="addUser"><i class="material-icons" title="Save user">check</i></a>
        <a href="#" v-show="isAddingUser" @click.prevent="toggleAddingUser"><i class="material-icons" title="Cancel">close</i></a>
      </h5>
    </div>
    <div v-if="isAddingUser">
      <div class="row">
        <div class="col s4">
          Username:
          <div class="input-field inline">
            <input v-model="newUser.username" type="text">
            <!-- <label for="email_inline">Username</label> -->
          </div>
        </div>
        <div class="col s4">
          Email:
          <div class="input-field inline">
            <input v-model="newUser.email" type="email" class="validate">
            <!-- <label for="email_inline">Email</label> -->
          </div>
        </div>
        <div class="col s4">
          Password:
          <div class="input-field inline">
            <input v-model="newUser.password" type="text">
            <!-- <label for="email_inline">Password</label> -->
          </div>
        </div>
      </div>

    </div>
    <table v-show="hasUsers" class="centered stripped highlight responsive-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <UserTableRow v-for="user in users" :key="user._id" :user="user"/>
      </tbody>
    </table>
  </div>
</template>

<script>
import UserTableRow from '@/components/UserTableRow.vue'
import groupMixins from '@/mixins/group'
import { mapActions } from 'vuex'

export default {
  name: 'users',
  props: ['groupId'],
  mixins: [groupMixins],
  data() {
    return {
      newUser: {
        username: '',
        email: '',
        groupId: this.groupId,
        password: '',
      },

      users: [],
      isAddingUser: false,
    }
  },
  components: {
    UserTableRow,
  },

  computed: {
    hasUsers() {
      return this.users.length !== 0;
    },
  },

  async created() {
    let group = await this.loadGroupMembers(this.groupId); // TODO (perf) duplicate fetches on group page
    this.users = group.users;
  },

  methods: {
    ...mapActions(['createUser']),

    toggleAddingUser() {
      this.isAddingUser = !this.isAddingUser;
      this.resetNewUser();
    },

    uploadCSV() {
        const inp = document.createElement('input');

        inp.type = 'file';
        inp.style.color = "transparent";
        inp.style.backgroundColor = "transparent";
        inp.style.border = "none";
        inp.style.outline = "none";
        inp.style.position = "absolute";
        inp.style.top = "0px";
        inp.style.left = "0px";
        inp.style.width = "0px";
        inp.style.height = "0px";
        inp.style.display = "none";
        inp.addEventListener(
            "change",
            async () => {
                document.body.removeChild(inp);
                const fileData = inp.files;
                const files = fileData instanceof FileList ? new Array(...fileData)
                    : fileData.target.files || fileData.dataTransfer.files;

                for (let i = files.length; i--;) {
                    const file = files[i];
                    if (file.type !== 'text/csv') {
                        const msg = files.length === 1 ?
                            `Incorrect file type: ${file.type}. (Expected CSV file!)` :
                            `File ${file.name} is not the expected type: ${file.type}. (Expected CSV file!)`;
                        alert(msg);
                        return;
                    }
                }

                const newUserErrors = [];
                const groupId = this.groupId;
                await Promise.all(files.map(async file => {
                    const text = await this.readTextFile(file);
                    const lines = text.split('\n')
                        .map(line => line.trim())
                        .filter(line => !!line);

                    await Promise.all(lines.map(async line => {
                        const [username, email, password] = line.split(',');
                        try {
                            await this.createUser({username, email, password, groupId});
                        } catch (err) {
                            const errMsg = err.response && err.response.data ?
                                err.response.data : err.message;
                            newUserErrors.push([username, errMsg]);
                        }
                    }));
                }));

                if (newUserErrors.length) {
                    const msg = 'Unable to create the following accounts:\n' +
                        newUserErrors.map(pair => pair.join(': ')).join('\n');
                    alert(msg);
                }
            },
            false
        );
        document.body.appendChild(inp);
        inp.click();
    },

    async readTextFile(file) {
        const frd = new FileReader();
        const deferred = {};
        deferred.promise = new Promise((resolve, reject) => {
            deferred.resolve = resolve;
            deferred.reject = reject;
        });

        frd.onloadend = e => deferred.resolve(e.target.result);
        frd.readAsText(file);

        return deferred.promise;
    },

    resetNewUser() {
      this.newUser = {
        username: '',
        email: '',
        groupId: this.groupId,
        password: '',
      };
    },

    async addUser() {
      this.isAddingUser = false;
      try {
        await this.createUser(this.newUser);
      } catch(e) {
        console.error(e.response.data);
        alert(e.response.data);
      }
    }
  }
}
</script>
