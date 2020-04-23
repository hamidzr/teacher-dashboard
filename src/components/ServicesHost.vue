<template>
  <div class="inline-inputs" :id="elementId()">
    <div>
      name:
      <span class="name">{{ servicesHost.categories.join('/') }}</span>
    </div>
    <div>
      URL:
      <span class="url">{{ servicesHost.url }}</span>
    </div>
    <a href="#" @click.prevent="deleteServicesHostConfirm()"><i class="material-icons" title="Delete">delete</i></a>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'servicesHost',
  props: ['servicesHost', 'groupId'],
  data() {
    return {
    }
  },

  computed: {
    name() {
        return this.servicesHost.categories.join('/');
    }
  },

  methods: {
    ...mapActions(['deleteServicesHost']),

    async deleteServicesHostConfirm() {
      const confirmed = confirm(`Are you sure you want to unregister "${this.name}"?`);
      // TODO: How should we do this?
      if (confirmed) {
        try {
          return await this.deleteServicesHost({groupId: this.groupId, servicesHost: this.servicesHost});
        } catch (e) {
          console.error(e);
          alert(e.response.data);
        }
      }
    },

    elementId() {
      return this.name;
    },
  }
}
</script>

<style>
.inline-inputs div {
  display: inline;
}
</style>
