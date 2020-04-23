<template>
  <div class="inline-inputs" :id="elementId()">
    <div>
      name:
      <span class="name" :contenteditable="editing">{{ servicesHost.categories.join('/') }}</span>
    </div>
    <div>
      URL:
      <span class="url" :contenteditable="editing">{{ servicesHost.url }}</span>
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
      editing: false,
    }
  },

  computed: {
    isNewKey() {
      return this.servicesHost._id === undefined;
    },
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

    toggleEditing() {
      this.editing = !this.editing;
    },

    cancelEditing() {
      this.resetFields();
      this.toggleEditing();
    },

    resetFields() {
      this.setValues({
        value: this.servicesHost.value,
      });
    },

    elementId() {
      return this.name;
    },

    setValues(keyVals) {
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
