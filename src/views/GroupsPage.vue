<template>
  <div class="home">
    <h2>Your Groups
      <a href="#" @click.prevent="newGroup">+</a>
    </h2>
    <Groups />
  </div>
</template>

<script>
import Groups from '@/components/Groups.vue'
import { mapActions } from 'vuex'

export default {
  name: 'groupsPage',
  components: {
    Groups
  },

  computed: {
    groups() {return this.$store.state.groups}
  },

  methods: {
    ...mapActions(['createGroup', 'updateGroup']),

    async newGroup() {
      const baseName = 'newGroup';
      let suggestedName = baseName + '1';
      let exists = name => !!this.groups.find(g => g.name === name);
      while (exists(suggestedName)) {
        let curNum = parseInt(suggestedName.match(/\d+/)[0]);
        curNum++;
        suggestedName = baseName + curNum;
      }
      if (confirm('Are you sure you want to create a new group?')) await this.createGroup(suggestedName);
    }
  }
}
</script>
