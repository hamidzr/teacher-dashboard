<template>
  <div>
    <li>username: {{ user.username }}, email: {{ user.email }}</li>
  </div>
</template>

<script>
export default {
  name: 'user',
  props: ['user'],
}
</script>
