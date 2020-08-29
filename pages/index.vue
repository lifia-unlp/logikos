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
          v-for="(comparison, i) in comparisons"
          :key="i"
          class="inline p-1 m-1 bg-blue-400 rounded text-white font-bold"
        >
          <nuxt-link
            v-if="alternatives.length >= 2"
            :to="{
              name: 'compare',
              params: { id: i },
            }"
          >
            {{ comparison.criterion.name }} -
            {{ comparison.isCompared ? 'SI' : 'NO' }}
          </nuxt-link>

          <template v-else>
            {{ comparison.criterion.name }}
          </template>
        </li>
      </ul>
    </div>

    <div class="mt-4">
      <h1 class="text-lg font-bold">Celulares</h1>

      <label class="font-bold">URL</label>
      <input v-model="alternativeURL" class="border rounded" type="text" />
      <button
        class="p-1 m-1 border-2 border-blue-400 rounded text-xs font-bold"
        @click="fetchAlternative()"
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

import Comparison from '@/models/Comparison'

export default {
  data() {
    return {
      alternativeURL: '',
    }
  },
  computed: {
    ...mapState(['profiles']),
    ...mapState('frontend', ['comparisons', 'alternatives']),
    selectedProfileId: {
      get() {
        return this.$store.state.frontend.selectedProfileId
      },
      set(value) {
        this.$store.commit('frontend/setSelectedProfileId', value)
      },
    },
    currentProfile() {
      return this.$store.getters.getProfileById(this.selectedProfileId)
    },
  },
  watch: {
    selectedProfileId(newId, oldId) {
      this.loadComparisons()
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
              this.$store.commit('frontend/addAlternative', response.data)
              this.loadComparisons()
              this.alternativeURL = ''
            }
          })
      }
    },
    loadComparisons() {
      this.$store.commit(
        'frontend/setComparisons',
        this.currentProfile
          .getComparableCriteria()
          .map((c) => new Comparison(this.alternatives, c))
      )
    },
  },
}
</script>
