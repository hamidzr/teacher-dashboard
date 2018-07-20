import { mapActions, mapGetters } from 'vuex'

export default  {
  data: function() {
    return {
      group: {
        name: '',
        users: []
      },
    }; // end of data
  },

  computed: {
    ...mapGetters(['getGroupById']),
    // QUESTION should there be an async group computed property which loads the data?!
  },

  methods: {
    ...mapActions(['fetchGroup', 'fetchUsers']),

    // loads group data. assumes that there is such data
    async loadGroupData() {
      let group = this.getGroupById(this.id);
      group = group ? group : await this.fetchGroup(this.id);
      group.users = group.users ? group.users : await this.fetchUsers(this.id);
      this.group = group;
      return group;
    },

  }
};

