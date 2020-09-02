<template>
  <div>
    <h1 class="title">Profiles</h1>

    <div>
      <input
        v-model="searchInput"
        class="searchInput"
        type="text"
        placeholder="Search..."
      />
    </div>

    <ProfilesTable :profiles="filteredProfiles"></ProfilesTable>

    <div class="flex justify-end">
      <nuxt-link class="button-new" to="/admin/profiles/new">
        new profile
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
  @apply text-5xl text-logikos;
}

.searchInput {
  @apply w-full mx-auto my-4 px-2 py-1 border rounded italic;
}

.button-new {
  @apply pl-1 border-l-2 border-logikos-orange text-logikos-light italic;
}
</style>
