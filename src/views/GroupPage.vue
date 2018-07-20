<template>
  <div>
    <p>{{ group.name }}</p>
    <ul>
      <li v-for="user in group.users" :key="user.username">{{ user.username }}</li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'


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
  },

  computed: {
    ...mapGetters(['getGroupById']),
    // QUESTION should there be an async group computed property which loads the data?!
  },

  created() {
    this.loadData();
  },

  methods: {
    ...mapActions(['fetchGroup', 'createUser', 'fetchUsers']),

    // loads group data. assumes that there is such data
    async loadData() {
      let group = this.getGroupById(this.id);
      group = group ? group : await this.fetchGroup(this.id);
      group.users = group.users ? group.users : await this.fetchUsers(this.id);
      this.group = group;
      return group;
    },

  }
}
</script>

