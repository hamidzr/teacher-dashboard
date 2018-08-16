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
    async loadGroupData(groupId) {
      groupId = groupId || this.groupId || this.id; // backward compatibility
      await this.fetchGroup(groupId);
      await this.fetchUsers(groupId);
      let group = await this.getGroupById(groupId);
      this.group = group;
      return group;
    },

  },

};

