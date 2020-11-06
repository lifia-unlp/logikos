<template>
  <ul class="list-none">
    <AdminCriterion
      v-for="(criterion, key) in criteria"
      :key="key"
      :criterion="criterion"
      @criterion:remove="removeCriterion"
    >
    </AdminCriterion>

    <button
      v-if="criteria.length > 1"
      class="mx-1 text-logikos-dark cursor-pointer"
      @click="toggleCompare"
    >
      <font-awesome-icon :icon="['fas', 'chart-line']" class="text-sm" />
      Compare
    </button>

    <button
      class="mx-1 text-xs text-accent cursor-pointer"
      @click="toggleAdding"
    >
      <font-awesome-icon :icon="['fas', 'plus']" />
      Add criterion
    </button>

    <CriterionForm v-if="adding" @criterion:add="addCriterion"></CriterionForm>

    <ComparisonForm
      v-if="comparing"
      :comparison="comparison"
      @comparison:rank="weightCriteria"
    >
    </ComparisonForm>
  </ul>
</template>

<script>
import Comparison from '@/models/Comparison'
import AdminCriterion from '@/components/AdminCriterion'

const c = {
  name: 'AdminCriteria',
  props: {
    criteria: Array,
  },
  data() {
    return {
      criterionName: '',
      comparison: null,
      adding: false,
      comparing: false,
    }
  },
  methods: {
    toggleAdding() {
      this.adding = !this.adding
    },
    toggleCompare() {
      this.comparison = new Comparison(this.criteria)

      this.comparing = !this.comparing
    },
    addCriterion(criterion) {
      this.$emit('criterion:add', criterion)

      this.adding = false
    },
    removeCriterion(criterion) {
      this.$emit('criterion:remove', criterion)
    },
    weightCriteria(comparison) {
      const ranking = comparison.rank()

      for (const rankedItem of ranking.ranking) {
        for (const criterion of this.criteria) {
          if (rankedItem.alternative === criterion) {
            criterion.weight = rankedItem.weight
          }
        }
      }

      this.comparing = false
    },
  },
}

AdminCriterion.components = { AdminCriteria: c }

c.components = { AdminCriterion }

export default c
</script>

<style>
.button-default {
  @apply py-1 px-2 border-2 rounded border-orange-400 text-xs;
}
</style>
