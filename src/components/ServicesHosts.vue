<template>
  <div>
    <div>
      <!-- search bar and user creation bar -->
      <h5>Additional Services: <a href="#" v-show="!isAddingHost" @click.prevent="toggleAddingHost" title="Register additional services hosts for the group">+</a>
        <a href="#" v-show="isAddingHost" @click.prevent="addHost"><i class="material-icons" title="Register additional services URL">check</i></a>
        <a href="#" v-show="isAddingHost" @click.prevent="toggleAddingHost"><i class="material-icons" title="Cancel">close</i></a>
      </h5>
    </div>
    <div v-show="isAddingHost">
      <div class="row">
        <div class="col s6">
          Name:
          <div class="input-field inline">
            <input v-model="newServiceHost.name" type="text">
          </div>
        </div>
        <div class="col s6">
          URL:
          <div class="input-field inline">
            <input v-model="newServiceHost.url" type="text">
          </div>
        </div>
      </div>

    </div>
    <table v-show="hasHosts" class="centered stripped highlight responsive-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>URL</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <ServicesHostTableRow v-for="servicesHost in servicesHosts" :key="servicesHost.categories[0]" :servicesHost="servicesHost" :groupId="groupId"/>
      </tbody>
    </table>
  </div>
</template>

<script>
/* globals M */
import ServicesHostTableRow from '@/components/ServicesHostTableRow.vue'
import groupMixins from '@/mixins/group'
import { mapActions } from 'vuex'

const EmptyServicesHostData = {
    url: '',
    name: ''
};

export default {
  name: 'servicesHosts',
  props: ['groupId'],
  mixins: [groupMixins],
  data() {
    return {
      newServiceHost: EmptyServicesHostData,
      servicesHosts: [],
      isAddingHost: false,
    }
  },
  components: {
    ServicesHostTableRow,
  },

  computed: {
    hasHosts() {
      return this.servicesHosts.length !== 0;
    },
    display() {
        return this.isAddingHost ? 'block' : 'none';
    },
  },

  mounted: function() {
    const select = this.$el.querySelectorAll('select');
    M.FormSelect.init(select);
  },

  async created() {
    let group = await this.loadGroup(this.groupId); // TODO (perf) duplicate fetches on group page
    console.log('group:', group);
    this.servicesHosts = group.servicesHosts;
  },

  methods: {
    ...mapActions(['setServicesHosts']),

    toggleAddingHost() {
      this.isAddingHost = !this.isAddingHost;
      this.newServiceHost = EmptyServicesHostData;
    },

    async addHost() {
      this.isAddingHost = false;
      const servicesHosts = this.servicesHosts.concat({
        url: this.newServiceHost.url,
        categories: [this.newServiceHost.name]
      });

      try {
        await this.setServicesHosts({groupId: this.groupId, servicesHosts});
      } catch(e) {
        console.error(e);
        console.error(e.response.data);
        alert(e.response.data);
      }
    },
  }
}
</script>
