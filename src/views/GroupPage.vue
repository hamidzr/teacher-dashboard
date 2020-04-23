<template>
  <div :id="elementId()">
    <h3>
      <span class="name" :class="{ editable: editing }" contenteditable="editing">{{ group.name }}</span>
      <a href="#" v-show="editing" @click.prevent="save"><i class="material-icons" title="Save">check</i></a>
      <a href="#" v-show="editing" @click.prevent="cancelEditing"><i class="material-icons" title="Cancel">close</i></a>
      <a href="#" v-if="editing" @click.prevent="confirmDestroy"><i class="material-icons" title="Delete group">delete</i></a>
      <a href="#" v-else @click.prevent="toggleEditing"><i class="material-icons" title="Edit">edit</i></a>
      <!-- <router-link :to="{name: 'groupEdit', params: {id: id}}"><i class="material-icons">edit</i></router-link> -->
    </h3>
    <Users :groupId="id" :users="group.users" />
    <APIKeys :groupId="id" :keys="group.apiKeys" />
    <ServicesHosts :groupId="id" :keys="group.servicesHosts" />
  </div>
</template>

<script>
import groupMixin from '@/mixins/group'
import { mapActions } from 'vuex'
import Users from '@/components/Users.vue'
import APIKeys from '@/components/APIKeys.vue'
import ServicesHosts from '@/components/ServicesHosts.vue'


export default {
  name: 'groupPage',
  props: ['id'],
  mixins: [groupMixin],
  components: {
    Users,
    APIKeys,
    ServicesHosts,
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
    this.loadGroupMembers(this.id);
  },

  methods: {
    ...mapActions(['updateGroup', 'deleteGroup']),

    // TODO refactor editable field to its own component
    async save() {
      this.toggleEditing();
      let group = {...this.group, ...this.readValues(['name'])};
      try {
        await this.updateGroup(group);
        this.group.name = group.name; // try to keep the bindings?
      } catch (e) {
        console.error(e);
        alert(e.response.data);
      }
    },

    async confirmDestroy() {
      if (confirm(`Are you use you want to delete ${this.group.name}`)) {
        let gpName = this.group.name;
        try {
          await this.deleteGroup(this.group);
          this.$router.push({name: 'groups'});
          alert(`group ${gpName} deleted.`);
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
        name: this.group.name
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
      return '_' + this.group._id;
    },

  }
}
</script>

