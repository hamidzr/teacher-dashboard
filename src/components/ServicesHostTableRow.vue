<template>
  <tr :id="elementId()">
    <td class="name">{{ servicesHost.categories[0] }}</td>
    <td>{{ servicesHost.url }}</td>
    <td>
      <a href="#" @click.prevent="deleteServicesHostConfirm()"><i class="material-icons" title="Delete">delete</i></a>
      <a href="#" v-if="isInvalid" @click.prevent="invalidURL()"><i class="material-icons" style="color: red" title="NetsBlox services not found at the given URL. Is the URL correct?">error</i></a>
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
