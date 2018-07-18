<template>
  <div>
    <GroupForm />
  </div>
</template>

<script>
import GroupForm from '@/components/GroupForm.vue'

export default {
  name: 'groupView',
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

