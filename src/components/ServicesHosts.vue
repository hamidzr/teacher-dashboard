<template>
  <div>
    <div>
      <!-- search bar and user creation bar -->
        
      <h5>Additional Services: <!--<a href="#" @click.prevent="showHelp"><i class="material-icons" style="font-size: 20px; margin-right: 5px; vertical-align: middle;" title="More information...">info_outline</i></a>-->
        <a href="#" v-show="!isAddingHost" @click.prevent="toggleAddingHost" title="Register additional services hosts for the group" style="vertical-align: middle">+</a>
        <a href="#" v-show="isAddingHost" @click.prevent="addHost"><i class="material-icons" title="Register additional services URL" style="vertical-align: middle">check</i></a>
        <a href="#" v-show="isAddingHost" @click.prevent="toggleAddingHost"><i class="material-icons" title="Cancel" style="vertical-align: middle">close</i></a>
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

    async showHelp() {
      // TODO: Should I write this up on the community forum? On a blog? Open a modal?
    }
  }
}
</script>
