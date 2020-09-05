<template>
  <div class="w-1/2">
    <div class="my-2">
      <label>Profile</label>
      <select v-model="selectedProfileId" class="profile-select">
        <option v-for="(profile, i) in profiles" :key="i" :value="profile._id">
          {{ profile.name }}
        </option>
      </select>
      <nuxt-link
        v-if="selectedProfileId"
        class="default-button"
        :to="{
          name: 'profiles-id',
          params: { id: currentProfile._id },
        }"
      >
        Ver
      </nuxt-link>
    </div>

    <div v-if="selectedProfileId">
      <Comparison
        v-for="(comparison, i) in comparisons"
        :key="i"
        :id="i"
        :comparison="comparison"
        :canCompare="alternatives.length >= 2"
      >
      </Comparison>
    </div>

    <div class="mt-4">
      <h1 class="text-2xl text-logikos">Phones</h1>

      <input
        v-model="alternativeUrl"
        class="border rounded px-2 py-1 w-2/3"
        type="text"
      />
      <button class="default-button" @click="fetchAlternative()">
        Add
      </button>
    </div>

    <Phone
      v-for="(alternative, key) in alternatives"
      :key="key"
      :phone="alternative"
    >
    </Phone>

    <nuxt-link
      to="/rank"
      v-if="alternatives.length >= 2 && selectedProfileId"
      class="default-button"
    >
      Rank!
    </nuxt-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

import Comparison from '@/models/Comparison'

export default {
  data() {
    return {
      alternativeUrl: '',
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
      if (!this.alternatives.find((a) => a.url === this.alternativeUrl)) {
        axios
          .get(`http://localhost:9000/alternative?url=${this.alternativeUrl}`)
          .then((response) => {
            if (!('error' in response.data)) {
              this.$store.commit('frontend/addAlternative', response.data)
              this.loadComparisons()
              this.alternativeUrl = ''
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

<style>
.profile-select {
  @apply appearance-none w-2/3 bg-white border border-gray-400 px-2 py-1 pr-8 rounded shadow leading-tight;
}

.profile-select:hover {
  @apply border-gray-500;
}

.profile-select:focus {
  @apply outline-none shadow-outline;
}

.default-button {
  @apply px-2 py-1 border rounded;
}
</style>
