<template>
  <div>
    <div>
      <!-- search bar and user creation bar -->
      <h5>API Keys: <a href="#" v-show="!isAddingKey" @click.prevent="toggleAddingKey" title="Register an API key for the group">+</a>
        <a href="#" v-show="isAddingKey" @click.prevent="addKey"><i class="material-icons" title="Save API key">check</i></a>
        <a href="#" v-show="isAddingKey" @click.prevent="toggleAddingKey"><i class="material-icons" title="Cancel">close</i></a>
      </h5>
    </div>
    <div v-show="isAddingKey">
      <div class="row">
        <div class="col s6">
          API Provider:
          <div class="input-field inline">
            <select v-model="newAPIKey.provider">
                <option v-for="option in apiProviders" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>
        </div>
        <div class="col s6">
          Key:
          <div class="input-field inline">
            <input v-model="newAPIKey.value" type="text">
          </div>
        </div>
      </div>

    </div>
    <table v-show="hasKeys" class="centered stripped highlight responsive-table">
      <thead>
        <tr>
          <th>API Provider</th>
          <th>Key</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <APIKeyTableRow v-for="apiKey in apiKeys" :key="apiKey._id" :apiKey="apiKey"/>
      </tbody>
    </table>
  </div>
</template>

<script>
/* globals M */
import APIKeyTableRow from '@/components/APIKeyTableRow.vue'
import groupMixins from '@/mixins/group'
import { mapActions } from 'vuex'

const EmptyAPIKeyData = groupId => ({
    _id: '',
    provider: '',
    value: '',
    groups: [groupId],
});
let API_PROVIDERS = [];
(async function setAPIProviders() {
  const endpoint = `http://localhost:5000/services/keys/providers`;
  const response = await fetch(endpoint, {credentials: 'include'});
  const apiProviders = (await response.json()).map(o => o.provider);

  API_PROVIDERS.splice(0, API_PROVIDERS.length, ...apiProviders);
})();

export default {
  name: 'apiKeys',
  props: ['groupId'],
  mixins: [groupMixins],
  data() {
    return {
      newAPIKey: EmptyAPIKeyData(this.groupId),
      apiKeys: [],
      isAddingKey: false,
      apiProviders: API_PROVIDERS
    }
  },
  components: {
    APIKeyTableRow,
  },

  updated() {
    const select = this.$el.querySelectorAll('select');
    M.FormSelect.init(select);
  },
  computed: {
    hasKeys() {
      return this.apiKeys.length !== 0;
    },
    display() {
        return this.isAddingKey ? 'block' : 'none';
    },
  },

  mounted: function() {
    const select = this.$el.querySelectorAll('select');
    M.FormSelect.init(select);
  },

  async created() {
    let group = await this.loadGroupAPIKeys(this.groupId); // TODO (perf) duplicate fetches on group page
    this.apiKeys = group.apiKeys;
  },

  methods: {
    ...mapActions(['createAPIKey']),

    toggleAddingKey() {
      this.isAddingKey = !this.isAddingKey;
      this.resetNewKey();
    },

    resetNewKey() {
      this.newAPIKey = EmptyAPIKeyData(this.groupId);
    },

    async addKey() {
      this.isAddingKey = false;
      try {
        await this.createAPIKey(this.newAPIKey);
      } catch(e) {
        console.error(e.response.data);
        alert(e.response.data);
      }
    }
  }
}
</script>
