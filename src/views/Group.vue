<template>
  <div>
    <p v-if="id">showing a group</p>
    <p v-if="!id">Creating a new group /new</p>
    <GroupForm />
  </div>
</template>

<script>
import GroupForm from '@/components/GroupForm.vue'

export default {
  name: 'groupView',
  props: ['id'],
  data() {
    return {
      groupName: ''
    }
  }, // end of data
  components: {
    GroupForm
  },
  created() {
  },
  methods: {
  }
}
</script>

