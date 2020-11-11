<template>
  <div>
    <h1 class="title">Profiles</h1>

    <div class="searchInput">
      <input
        v-model="searchInput"
        class="w-full bg-transparent italic text-secondary text-opacity-50"
        type="text"
        placeholder="Type a name, description, criterion or author..."
      />
    </div>

    <ProfilesTable :profiles="filteredProfiles"></ProfilesTable>

    <div class="flex justify-end">
      <nuxt-link class="button-new" to="/admin/profiles/new">
        + New Profile
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      searchInput: '',
    }
  },
  computed: {
    ...mapState(['profiles']),
    filteredProfiles() {
      return this.profiles.filter((profile) =>
        profile.name.toLowerCase().includes(this.searchInput.toLowerCase())
      )
    },
  },
  created() {
    this.$store.dispatch('fetchProfiles')
  },
}
</script>

<style>
.title {
  @apply mt-8 text-4xl text-secondary;
}

.searchInput {
  @apply w-full mx-auto my-4 px-4 py-1 bg-white;
}

.button-new {
  @apply mt-4 px-2 py-1 bg-secondary text-white text-sm;
}
</style>
