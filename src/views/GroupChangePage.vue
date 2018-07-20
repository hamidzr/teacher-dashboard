<template>
  <div>
    <p>gp change page</p>
    <GroupForm :group="group" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import GroupForm from '@/components/GroupForm.vue'
import groupMixin from '@/mixins/group'

export default {
  name: 'groupChangePage',
  props: ['id'],
  mixins: [groupMixin],

  components: {
    GroupForm,
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
