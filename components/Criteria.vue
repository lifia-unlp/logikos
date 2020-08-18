<template>
  <ul class="list-disc">
    <Criterion
      v-for="(criterion, key) in criteria"
      :key="key"
      :criterion="criterion"
      @criterion:remove="removeCriterion"
    >
    </Criterion>

    <button @click="toggleAdding">add</button>
    <button @click="toggleCompare">
      compare
    </button>

    <div v-if="adding">
      <label for="criterionName">Name: </label>
      <input v-model="criterionName" name="criterionName" type="text" />
      <button @click="addCriterion">add</button>
    </div>

    <ComparisonC
      v-if="comparing"
      :comparison="comparison"
      @comparison:rank="weightCriteria"
    >
    </ComparisonC>
  </ul>
</template>

<script>
import Criterion from '@/models/Criterion'
import Comparison from '@/models/Comparison'
import CriterionComponent from '@/components/Criterion.vue'

const c = {
  name: 'Criteria',
  props: ['criteria'],
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
    addCriterion() {
      this.$emit('criterion:add', new Criterion(this.criterionName))

      this.criterionName = ''
      this.adding = false
    },
    removeCriterion(criterion) {
      this.$emit('criterion:remove', criterion)
    },
    weightCriteria(ranking) {
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
