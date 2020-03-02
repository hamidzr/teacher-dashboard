<template>
  <div class="inline-inputs" :id="elementId()">
    <div>
      provider:
      <span class="provider" :contenteditable="editing">{{ apiKey.provider }}</span>
    </div>
    <div>
      value:
      <span class="value" :contenteditable="editing">{{ apiKey.value }}</span>
    </div>
    <a href="#" v-if="editing" @click.prevent="save"><i class="material-icons" title="Save">check</i></a>
    <a href="#" v-if="editing" @click.prevent="cancelEditing"><i class="material-icons" title="Cancel">close</i></a>
    <a href="#" v-else @click.prevent="toggleEditing"><i class="material-icons" title="Edit">edit</i></a>
    <a href="#" @click.prevent="deleteAPIKeyConfirm()"><i class="material-icons" title="Delete">delete</i></a>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'apiKey',
  props: ['apiKey', 'groupId'],
  data() {
    return {
      editing: false,
    }
  },

  computed: {
    isNewKey() {
      return this.apiKey._id === undefined;
    },
  },

  methods: {
    ...mapActions(['deleteAPIKey', 'updateAPIKey', 'createAPIKey']),

    async deleteAPIKeyConfirm() {
      const confirmed = confirm(`Are you sure you want to delete API key for ${this.apiKey.provider}?`);
      if (confirmed) {
        try {
          return await this.deleteAPIKey(this.apiKey);
        } catch (e) {
          console.error(e);
          alert(e.response.data);
        }
      }
    },

    toggleEditing() {
      this.editing = !this.editing;
    },

    cancelEditing() {
      this.resetFields();
      this.toggleEditing();
    },

    resetFields() {
      this.setValues({
        value: this.apiKey.value,
      });
    },

    async save() {
      this.toggleEditing();
      try {
        if (this.isNewKey) {
          const apiKey = {...this.apiKey, ...this.readValues(['provider', 'value'])};
          await this.createAPIKey(apiKey);
        } else {
          const apiKey = {...this.apiKey, ...this.readValues(['value'])};
          await this.updateAPIKey(apiKey);
        }
      } catch (e) {
        // revert html values back?
        this.resetFields();
        console.error(e);
        alert('failed to save apiKey', e.response.data);
      }
    },

    elementId() {
      console.log(this);
      return '_' + this.apiKey._id;
    },

    setValues(keyVals) {
      console.log('setting values:', keyVals);
      const entries = Object.entries(keyVals);
      for (let i = entries.length; i--;) {
        const [key, value] = entries[i];
        document.querySelector(`#${this.elementId()} .${key}`).innerText = value;
      }
    },

    readValues(keys) {
      let keyVals = {};
      keys.forEach(key => {
        keyVals[key] = document.querySelector(`#${this.elementId()} .${key}`).innerText.trim();
      });
      return keyVals;
    }
  }
}
</script>

<style>
.inline-inputs div {
  display: inline;
}
</style>
