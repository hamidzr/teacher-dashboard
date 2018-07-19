<template>
  <div>
    <p v-if="id">showing a group</p>
    <p v-if="!id">Creating a new group /new</p>
    <p>{{ group.name }}</p>
    <GroupForm />
  </div>
</template>

<script>
import GroupForm from '@/components/GroupForm.vue'
import { mapActions } from 'vuex'

export default {
  name: 'groupView',
  props: ['id'],
  data() {
    return {
    }
  }, // end of data
  components: {
    GroupForm
  },

  computed: {
    group() {
      let group = this.findGroup() || {
        name: '',
      };
      console.log('group', group);
      return group;
    },
  },

  async created() {
      if (this.hasGroup()) {
        this.loadData();
      }
  },
  methods: {
    ...mapActions(['fetchGroup', 'addMember', 'fetchMembers']),

    hasGroup() {
      return !!this.id;
    },

    async loadData() {
      if (!this.findGroup()) await this.fetchGroup(this.id);
      await this.fetchMembers(this.id);
    },

    findGroup() {
      let group = this.$store.state.groups.find(g => g._id === this.id);
      return group;
    },
  }
}
</script>

