<template>
  <div class="container">
    <h1 class="text-4xl">Neo-logikos</h1>

    <div class="mt-2">
      <label class="font-bold">Profile</label>
      <select v-model="selectedProfileId">
        <option v-for="(profile, i) in profiles" :key="i" :value="profile._id">
          {{ profile.name }}
        </option>
      </select>
    </div>

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

    <div class="mt-4">
      <h1 class="text-lg font-bold">Celulares</h1>

      <label class="font-bold">URL</label>
      <input v-model="alternativeURL" class="border rounded" type="text" />
      <button
        @click="fetchAlternative()"
        class="p-1 m-1 border-2 border-blue-400 rounded text-xs font-bold"
      >
        Search
      </button>
    </div>

    <Phone
      v-for="(alternative, key) in alternatives"
      :key="key"
      :phone="alternative"
    >
    </Phone>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import axios from 'axios'

export default {
  data() {
    return {
      selectedProfileId: null,
      alternativeURL: '',
      alternatives: [],
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
  methods: {
    fetchAlternative() {
      if (!this.alternatives.find((a) => a.url === this.alternativeURL)) {
        axios
          .get(`http://localhost:9000/alternative?url=${this.alternativeURL}`)
          .then((response) => {
            if (!('error' in response.data)) {
              this.alternatives.push(response.data)
              this.alternativeURL = ''
            }
          })
      }
    },
  },
}
</script>
