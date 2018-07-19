<template>
  <div>
    <p v-if="id">showing a group</p>
    <p v-if="!id">Creating a new group /new</p>
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
      groupName: '',
      groupMembers: [] // username, email, password
    }
  }, // end of data
  components: {
    GroupForm
  },
  async created() {
    if (this.hasGroup()) await this.fetchMembers(this.id);
  },
  methods: {
    ...mapActions(['addMember', 'fetchMembers']),

    hasGroup() {
      return !!this.id;
    }
  }
}
</script>

