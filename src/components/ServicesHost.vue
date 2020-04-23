<template>
  <div class="inline-inputs" :id="elementId()">
    <div>
      name:
      <span class="name">{{ name }}</span>
    </div>
    <div>
      URL:
      <span class="url">{{ servicesHost.url }}</span>
    </div>
    <a href="#" @click.prevent="deleteServicesHostConfirm()"><i class="material-icons" title="Delete">delete</i></a>
    <a href="#" @click.prevent="deleteServicesHostConfirm()"><i class="material-icons" style="color: red" title="NetsBlox services not found at the given URL. Is the URL correct?">error</i></a>
    <a href="#" v-if="isInvalid" @click.prevent="invalidURL()"><i class="material-icons" style="color: red" title="NetsBlox services not found at the given URL. Is the URL correct?">error</i></a>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'servicesHost',
  props: ['servicesHost', 'groupId'],
  data() {
    return {
        isInvalid: false
    }
  },

  computed: {
    name() {
        return this.servicesHost.categories.join('/');
    },
  },

  created: async function() {
    const {url} = this.servicesHost;
    let pending = true;
    const setInvalidOnTimeout = () => {
        if (pending) {
            this.isInvalid = true;
            pending = false;
        }
    };

    try {
        setTimeout(setInvalidOnTimeout, 2500);

        const { data: services } = await axios.get(url);
        services.forEach(serviceMetadata => {
            const {name, categories} = serviceMetadata;
            if (!name || !categories) {
                throw new Error('Invalid service metadata: ' + serviceMetadata);
            }
        });
    } catch (err) {
        this.isInvalid = true;
    }
    pending = false;
  },

  methods: {
    ...mapActions(['deleteServicesHost']),

    async deleteServicesHostConfirm() {
      const confirmed = confirm(`Are you sure you want to unregister "${this.name}"?`);
      if (confirmed) {
        try {
          return await this.deleteServicesHost({groupId: this.groupId, servicesHost: this.servicesHost});
        } catch (e) {
          console.error(e);
          alert(e.response.data);
        }
      }
    },

    async invalidURL() {
      const msg = `NetsBlox services not found at ${this.servicesHost.url}. It is recommended to unregister any invalid NetsBlox services hosts.` +
        `\n\nWould you like to unregister "${this.name}"?`;
      const confirmed = confirm(msg);
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
