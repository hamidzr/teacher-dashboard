<template>
  <div>
    <p>gp change page</p>
  </div>
</template>

<script>
import GroupForm from '@/components/GroupForm.vue'

export default {
  name: 'groupChangePage',
  props: ['id'],
  components: {
    GroupForm,
  }

}

</script>
