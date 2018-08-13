<template>
  <tr :id="elementId()">
    <td>{{ user.username }}</td>
    <td class="email" :class="{ editable: editing }" :contenteditable="editing">{{ user.email }}</td>
    <td>
      <a href="#" v-if="editing" @click.prevent="save"><i class="material-icons" title="Save">check</i></a>
      <a href="#" v-if="editing" @click.prevent="cancelEditing"><i class="material-icons" title="Cancel">close</i></a>
      <a href="#" v-else @click.prevent="toggleEditing"><i class="material-icons" title="Edit">edit</i></a>
      <a href="#" @click.prevent="deleteUserConfirm()"><i class="material-icons" title="Delete">delete</i></a>
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
