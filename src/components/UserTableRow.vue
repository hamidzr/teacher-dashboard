<template>
  <tr :id="htmlId()">
    <td class="username" :contenteditable="editing">{{ user.username }}</td>
    <td class="email" :contenteditable="editing">{{ user.email }}</td>
    <td>
      <a href="#" v-if="editing" @click.prevent="save"><i class="material-icons">check</i></a>
      <a href="#" v-else @click.prevent="toggleEditing"><i class="material-icons">edit</i></a>
      <a href="#" @click.prevent="deleteUserConfirm()"><i class="material-icons">delete</i></a>
    </td>
  </tr>
</template>

<script>
import User from '@/components/User'

export default {
  name: 'UserTableRow',
  extends: User
}
</script>
