<template>
  <tr :id="elementId()">
    <td>{{ apiKey.provider }}</td>
    <td :class="{ editable: editing }" :contenteditable="editing">{{ apiKey.value }}</td>
    <td>
      <a href="#" v-if="editing" @click.prevent="save"><i class="material-icons" title="Save">check</i></a>
      <a href="#" v-if="editing" @click.prevent="cancelEditing"><i class="material-icons" title="Cancel">close</i></a>
      <a href="#" v-else @click.prevent="toggleEditing"><i class="material-icons" title="Edit">edit</i></a>
      <a href="#" @click.prevent="deleteAPIKeyConfirm()"><i class="material-icons" title="Delete">delete</i></a>
    </td>
  </tr>
</template>

<script>
import APIKey from '@/components/APIKey'

export default {
  name: 'APIKeyTableRow',
  extends: APIKey
}
</script>
