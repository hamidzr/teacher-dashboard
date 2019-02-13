<template>
  <div>
    <h3>Edit {{ group.name }}</h3>
    <Users :groupId="id" :users="group.users" />
    <RobotForm :group="group" />
    <p>add a new user</p>
    <UserForm :groupId="id" :user="newUser" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import RobotForm from '@/components/RobotForm.vue'
import UserForm from '@/components/UserForm.vue'
import Users from '@/components/Users.vue'
import groupMixin from '@/mixins/group'

export default {
  name: 'groupChangePage',
  props: ['id'],
  mixins: [groupMixin],

  components: {
    RobotForm,
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
    if (this.hasRobot()) this.loadRobotData(this.id);
  },

  methods: {
    ...mapActions(['createUser']),

    hasRobot() {
      return !!this.id;
    },

  }

}

</script>
