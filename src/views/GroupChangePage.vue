<template>
  <div>
    <p>gp change page</p>
    <Users :groupId="id" :users="group.users" />
    <GroupForm :group="group" />
    <p>add a new user</p>
    <UserForm :groupId="id" :user="newUser" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import GroupForm from '@/components/GroupForm.vue'
import UserForm from '@/components/UserForm.vue'
import Users from '@/components/Users.vue'
import groupMixin from '@/mixins/group'

export default {
  name: 'groupChangePage',
  props: ['id'],
  mixins: [groupMixin],

  components: {
    GroupForm,
    UserForm,
    Users,
  },

  computed: {
  },

  data() {
    return {
      newUser: {
        username: '',
        password: '',
        email: '',
        groupId: this.id,
      }
    }
  },

  created() {
    if (this.hasGroup()) this.loadGroupData();
  },

  methods: {
    ...mapActions(['createUser']),

    hasGroup() {
      return !!this.id;
    },

  }

}

</script>
