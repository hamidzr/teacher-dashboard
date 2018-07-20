<template>
  <div>
    <p v-if="id">showing a group</p>
    <p v-if="!id">Creating a new group /new</p>
    <p>{{ group.name }}</p>
    <UserForm v-if="id" :user="aUser" :groupId="id"/>
    <ul>
      <li v-for="user in group.users" :key="user.username">{{ user.username }}</li>
    </ul>
    <GroupForm />
  </div>
</template>

<script>
import GroupForm from '@/components/GroupForm.vue'
import UserForm from '@/components/UserForm.vue'
import { mapActions } from 'vuex'

export default {
  name: 'groupPage',
  props: ['id'],
  data() {
    return {
      aUser: {
        username: '',
        email: '',
        password: '',
      },
      group: {
        name: '',
        users: []
      },
    }
  }, // end of data
  components: {
    GroupForm,
    UserForm,
  },

  computed: {
    // group() {
    //   let group = this.findGroup() || {
    //     name: '',
    //     users: []
    //   };
    //   console.log('group', group);
    //   return group;
    // },
  },

  async created() {
    if (this.hasGroup()) {
      this.loadData();
    } else {
      this.group = {
        name: '',
        users: []
      };
    }
  },
  methods: {
    ...mapActions(['fetchGroup', 'createUser', 'fetchUsers']),

    hasGroup() {
      return !!this.id;
    },

    // loads group data. assumes that there is such data
    async loadData() {
      let group = this.findGroup();
      this.group = group ? group : await this.fetchGroup(this.id);
      this.group.users = this.group.users ? group.users : await this.fetchUsers(this.id);
      console.log('thisgp', this.group);
    },

    findGroup() {
      let group = this.$store.state.groups.find(g => g._id === this.id);
      return group;
    },
  }
}
</script>

