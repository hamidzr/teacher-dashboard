<template>
  <tr :id="elementId()">
    <td class="name">{{ servicesHost.categories[0] }}</td>
    <td :class="{ editable: editing, value: true }" :contenteditable="editing">{{ servicesHost.url }}</td>
    <td>
      <a href="#" v-if="editing" @click.prevent="save"><i class="material-icons" title="Save">check</i></a>
      <a href="#" v-if="editing" @click.prevent="cancelEditing"><i class="material-icons" title="Cancel">close</i></a>
      <a href="#" @click.prevent="deleteServicesHostConfirm()"><i class="material-icons" title="Delete">delete</i></a>
    </td>
  </tr>
</template>

<script>
import ServicesHost from '@/components/ServicesHost'

export default {
  name: 'ServicesHostTableRow',
  extends: ServicesHost
}
</script>
