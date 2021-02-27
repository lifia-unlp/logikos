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

    <div v-show="selectedProfileId" class="mt-4">
      <p v-if="selectedProfileId" class="text-secondary text-sm">
        {{ currentProfile.description }}
      </p>

      <div class="w-full h-full">
        <canvas id="pieChart"></canvas>
      </div>

      <template v-if="selectedProfileId">
        <Criterion
          v-for="(criterion, i) in currentProfile.criteria"
          :key="i"
          :criterion="criterion"
        >
        </Criterion>
      </template>
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
  watch: {
    selectedProfileId(newId, oldId) {
      this._updatePieChart()
      this._loadComparisons()
    },
  },
  created() {
    this.$store.dispatch('fetchProfiles')
  },
  mounted() {
    if (this.selectedProfileId !== null) {
      this._updatePieChart()
      this._loadComparisons()
    }
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
      const criteria = this.currentProfile.getComparableCriteria()

      const comparisons = {}

      for (const criterion of criteria) {
        comparisons[criterion.name] = new Comparison(this.alternatives)
      }

      this.$store.commit('frontend/setComparisons', comparisons)
    },
  },
}
</script>

<style></style>
