<template>
  <div class="container">
    <h1 class="text-4xl">Neo-logikos</h1>

    <label class="block font-bold">Profiles</label>
    <select v-model="selectedProfileId">
      <option v-for="(profile, i) in profiles" :key="i" :value="profile._id">
        {{ profile.name }}
      </option>
    </select>

    <div v-if="selectedProfileId">
      <p>
        Perfil seleccionado: {{ currentProfile.name }}
        <nuxt-link
          class="cursor-default"
          :to="{
            name: 'profiles-id',
            params: { id: currentProfile._id },
          }"
        >
          (ver)
        </nuxt-link>
      </p>

      <ul>
        <li
          v-for="(criterion, i) in currentProfile.getComparableCriteria()"
          :key="i"
          class="inline p-1 m-1 bg-blue-400 rounded text-white font-bold"
        >
          {{ criterion.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      selectedProfileId: null,
    }
  },
  computed: {
    ...mapState(['profiles']),
    currentProfile() {
      return this.$store.getters.getProfileById(this.selectedProfileId)
    },
  },
  created() {
    this.$store.dispatch('fetchProfiles')
  },
}
</script>
