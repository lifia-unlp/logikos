<template>
  <ul class="list-none">
    <Criterion
      v-for="(criterion, key) in criteria"
      :key="key"
      :criterion="criterion"
      @criterion:remove="removeCriterion"
    >
    </Criterion>

    <button
      class="py-1 px-2 border-2 rounded border-indigo-300 text-xs"
      @click="toggleAdding"
    >
      Add
    </button>
    <button
      v-if="criteria.length > 0"
      class="py-1 px-2 border-2 rounded border-indigo-300 text-xs"
      @click="toggleCompare"
    >
      Compare
    </button>

    <CriterionForm v-if="adding" @criterion:add="addCriterion"></CriterionForm>

    <ComparisonC
      v-if="comparing"
      :comparison="comparison"
      @comparison:rank="weightCriteria"
    >
    </ComparisonC>
  </ul>
</template>

<script>
// import Criterion from '@/models/Criterion'
import Comparison from '@/models/Comparison'
import CriterionComponent from '@/components/Criterion.vue'

const c = {
  name: 'Criteria',
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

CriterionComponent.components = { Criteria: c }

c.components = { Criterion: CriterionComponent }

export default c
</script>
