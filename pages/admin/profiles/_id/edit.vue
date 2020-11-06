<template>
  <div class="container">
    <h1 class="title">New Profile</h1>

    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-8 box">
        <h2 class="text-secondary text-xl">Basic Information</h2>
        <div class="form-field">
          <label class="form-field-label">NAME</label>
          <input v-model="profile.name" class="form-field-input" type="text" />
        </div>

        <div class="form-field">
          <label class="form-field-label">DESCRIPTION</label>
          <textarea
            v-model="profile.description"
            class="form-field-input resize-none"
          >
          </textarea>
        </div>
      </div>

      <div class="col-span-4 row-span-2 box">
        <h2 class="text-primary text-2xl">"{{ profile.name }}"</h2>
        <p class="text-sm">{{ profile.description }}</p>

        <div class="w-full h-full">
          <canvas id="pieChart"></canvas>
        </div>
      </div>

      <div class="col-span-8 box">
        <div class="flex flex-wrap justify-between">
          <div>
            <h2 class="text-secondary text-xl mb-4">Criteria</h2>
          </div>
          <div>
            <font-awesome-icon
              :icon="['far', 'question-circle']"
              class="text-base text-gray-600 cursor-pointer"
            />
          </div>
        </div>

        <button
          class="text-accent text-sm cursor-pointer"
          v-if="
            profile.criteria.length > 1 &&
            !(showCriterionForm || showComparisonForm)
          "
          @click="compareCriteria"
        >
          <font-awesome-icon
            :icon="['fas', 'sort-amount-down']"
            class="text-accent text-base cursor-pointer"
          />
          Compare
        </button>

        <AdminCriterion2
          v-for="(criterion, i) in profile.criteria"
          :key="i"
          :criterion="criterion"
          :showActions="!(showCriterionForm || showComparisonForm)"
          @criterion:remove="removeCriterion(criterion)"
          @criterion:edit="editCriterion"
          @criterion:new="newSubcriterion"
          @comparison:new="compareSubcriteria"
        >
        </AdminCriterion2>

        <button
          class="text-accent text-sm cursor-pointer"
          v-if="!(showCriterionForm || showComparisonForm)"
          @click="newCriterion"
        >
          <font-awesome-icon :icon="['fas', 'plus']" />
          Add Criterion
        </button>
      </div>

      <div v-if="showCriterionForm" class="col-span-8 box">
        <div class="flex flex-wrap justify-between">
          <div>
            <h2 class="text-secondary text-xl mb-4">New Criterion</h2>
          </div>
          <div>
            <font-awesome-icon
              :icon="['far', 'question-circle']"
              class="text-base text-gray-600 cursor-pointer"
            />
          </div>
        </div>

        <CriterionForm2
          :originalCriterion="criterion ? criterion : undefined"
          @criterion:add="addCriterion"
          @comparison:new:preset="comparePreset"
        >
        </CriterionForm2>
      </div>

      <div v-if="showComparisonForm" class="col-span-8 box">
        <div class="flex flex-wrap justify-between">
          <div>
            <h2 class="text-secondary text-xl mb-4">Compare</h2>
          </div>
          <div>
            <font-awesome-icon
              :icon="['far', 'question-circle']"
              class="text-base text-gray-600 cursor-pointer"
            />
          </div>
        </div>

        <ComparisonForm2 :comparison="comparison" @comparison:rank="compare">
        </ComparisonForm2>
      </div>
    </div>

    <div class="mt-8">
      <button
        class="py-1 px-2 bg-primary text-white font-bold"
        @click="saveProfile"
      >
        Save
      </button>
      <nuxt-link
        class="py-1 px-2 bg-secondary text-white font-bold"
        to="/admin/profiles"
      >
        Back
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Comparison from '@/models/Comparison'
import Chart from 'chart.js'

import _ from 'lodash'

export default {
  data() {
    return {
      profile: {},
      piechart: {},
      originalName: '',
      showCriterionForm: false,
      showComparisonForm: false,
      parentCriterion: null,
      criterion: null,
      comparison: null,
      comparisonType: null,
    }
  },
  created() {
    this.profile = _.cloneDeep(
      this.$store.getters.getProfileById(this.$route.params.id)
    )

    this.originalName = this.profile.name
  },
  mounted() {
    const labels = this.profile.criteria.map((c) => c.name)

    const values = this.profile.criteria.map((c) => c.absoluteWeight())

    this.lineChart = new Chart(document.getElementById('pieChart'), {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            backgroundColor: ['#E9604E', '#17273E', '#71BBE8'],
            data: values,
          },
        ],
      },
    })
  },
  methods: {
    newCriterion() {
      this.showCriterionForm = true
    },
    newSubcriterion(parentCriterion) {
      this.showCriterionForm = true
      this.parentCriterion = parentCriterion
    },
    editCriterion(criterion) {
      this.criterion = criterion
      this.showCriterionForm = true
    },
    addCriterion(criterion) {
      if (this.criterion !== null) {
        Object.assign(this.criterion, criterion)
      } else if (this.parentCriterion !== null) {
        this.parentCriterion.addSubcriterion(criterion)
      } else {
        this.profile.addCriterion(criterion)
      }

      this.criterion = null
      this.parentCriterion = null
      this.showCriterionForm = false
    },
    removeCriterion(criterion) {
      this.profile.removeCriterion(criterion.name)
    },
    compareSubcriteria(parentCriterion) {
      this.parentCriterion = parentCriterion
      this.comparison = new Comparison(parentCriterion.subcriteria)
      this.comparisonType = 'SUBCRITERIA'
      this.showComparisonForm = true
    },
    comparePreset(...args) {
      const [criterion, presetValues] = args
      this.criterion = criterion
      this.comparison = new Comparison(presetValues)
      this.comparisonType = 'PRESET'
      this.showComparisonForm = true
    },
    compareCriteria() {
      this.comparison = new Comparison(this.profile.criteria)
      this.comparisonType = 'CRITERIA'
      this.showComparisonForm = true
    },
    compare(comparison) {
      if (this.comparisonType === 'PRESET') {
        this.criterion.preset = {
          values: comparison.alternatives,
          dm: comparison.dm,
        }
      } else {
        const ranking = comparison.rank()

        const criteria =
          this.comparisonType === 'SUBCRITERIA'
            ? this.parentCriterion.subcriteria
            : this.profile.criteria

        for (const rankedItem of ranking.ranking) {
          for (const criterion of criteria) {
            if (rankedItem.alternative === criterion) {
              criterion.weight = rankedItem.weight
            }
          }
        }
      }

      this.parentCriterion = null
      this.comparison = null
      this.comparisonType = ''
      this.showComparisonForm = false
    },
    saveProfile() {
      this.$store.dispatch('updateProfile', this.profile)

      this.$router.push({ name: 'admin-profiles' })
    },
  },
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
