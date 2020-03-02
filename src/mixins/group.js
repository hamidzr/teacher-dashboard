import { mapActions, mapGetters } from 'vuex'

export default  {
  data: function() {
    return {
      group: {
        name: '',
        users: [],
        apiKeys: []
      },
    }; // end of data
  },

  computed: {
    ...mapGetters(['getGroupById']),
    // QUESTION should there be an async group computed property which loads the data?!
  },

  methods: {
    ...mapActions(['fetchGroup', 'fetchGroupMembers', 'fetchGroupAPIKeys']),

    // loads group data. assumes that there is such data
    async loadGroupMembers(groupId) {
      groupId = groupId || this.groupId || this.id; // backward compatibility
      await this.fetchGroup(groupId);
      let group = await this.getGroupById(groupId);
      await this.fetchGroupMembers(groupId);
      this.group = group;
      return group;
    },
    async loadGroupAPIKeys(groupId) {
      await this.fetchGroup(groupId);
      let group = await this.getGroupById(groupId);
      await this.fetchGroupAPIKeys(groupId);
      this.group = group;
      return group;
    },
  },

};

