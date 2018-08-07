<template>
  <div>
    <h3>{{ group.name }}
      <router-link :to="{name: 'groupEdit', params: {id: id}}"><i class="material-icons">edit</i></router-link>
    </h3>
    <h5>Members: +</h5>
    <Users :groupId="id" :users="group.users" />
  </div>
</template>

<script>
import groupMixin from '@/mixins/group'
import Users from '@/components/Users.vue'


export default {
  name: 'groupPage',
  props: ['id'],
  mixins: [groupMixin],
  components: {
    Users,
  },
  data() {
    return {
      aUser: {
        username: '',
        email: '',
        password: '',
      },
    }
  }, // end of data

  computed: {
  },

  created() {
    this.loadGroupData();
  },

  methods: {
  }
}
</script>

