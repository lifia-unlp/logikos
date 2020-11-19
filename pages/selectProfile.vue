<template>
  <div>
    <div class="my-2">
      <label>Profile</label>
      <select v-model="selectedProfileId" class="profile-select">
        <option v-for="(profile, i) in profiles" :key="i" :value="profile._id">
          {{ profile.name }}
        </option>
      </select>
    </div>

    <div v-if="selectedProfileId" class="mt-4">
      <p class="text-secondary text-sm">{{ currentProfile.description }}</p>

      <div class="w-full h-full">
        <canvas id="pieChart"></canvas>
      </div>

      <Criterion
        v-for="(criterion, i) in currentProfile.criteria"
        :key="i"
        :criterion="criterion"
      >
      </Criterion>
    </div>

    <div class="flex justify-between">
      <nuxt-link to="/">
        Go back
      </nuxt-link>
      <nuxt-link to="/rank" class="btn">
        Finish
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Comparison from '@/models/Comparison.js'

import { mapState } from 'vuex'
import Chart from 'chart.js'
// import axios from 'axios'

export default {
  layout: 'frontend',
  data() {
    return {
      pieChart: {},
    }
  },
  computed: {
    ...mapState('frontend', ['alternatives']),
    ...mapState(['profiles']),
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
  methods: {
    _updatePieChart() {
      this.pieChart = new Chart(document.getElementById('pieChart'), {
        type: 'pie',
        data: {
          labels: this.currentProfile.criteria.map((c) => c.name),
          datasets: [
            {
              data: this.currentProfile.criteria.map((c) => c.absoluteWeight()),
              backgroundColor: [
                '#E9604E',
                '#17273E',
                '#71BBE8',
                '#0F7173',
                '#533A7B',
                '#4B244A',
              ],
            },
          ],
        },
      })
    },
    _loadComparisons() {
      this.$store.commit(
        'frontend/setComparisons',
        this.currentProfile
          .getComparableCriteria()
          .map((c) => new Comparison(this.alternatives, c))
      )
    },
  },
  watch: {
    selectedProfileId(newId, oldId) {
      this._updatePieChart()
      this._loadComparisons()
    },
  },
  created() {
    this.$store.dispatch('fetchProfiles')
  },
}
</script>

<style></style>
