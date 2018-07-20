<template>
  <div>
    <p>{{ group.name }}</p>
    <router-link :to="{name: 'groupEdit', params: {id: group._id}}"><i class="material-icons">edit</i></router-link>
    <ul>
      <li v-for="user in group.users" :key="user.username">{{ user.username }}</li>
    </ul>
  </div>
</template>

<script>
import groupMixin from '@/mixins/group'


export default {
  name: 'groupPage',
  props: ['id'],
  mixins: [groupMixin],
  data() {
    return {
      aUser: {
        username: '',
        email: '',
        password: '',
      },
    }
  }, // end of data
  components: {
  },

  computed: {
  },

  created() {
    this.loadGroupData();
  },

  methods: {
  }
}
</script>

