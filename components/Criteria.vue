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

    <div v-if="adding">
      <label for="criterionName">Name: </label>
      <input v-model="criterionName" name="criterionName" type="text" />
      <button @click="addCriterion">add</button>
    </div>
  </ul>
</template>

<script>
import Criterion from '@/models/Criterion'

import CriterionComponent from '@/components/Criterion.vue'

const c = {
  name: 'Criteria',
  props: ['criteria'],
  data() {
    return {
      criterionName: '',
      adding: false,
    }
  },
  methods: {
    toggleAdding() {
      this.adding = !this.adding
    },
    addCriterion() {
      this.$emit('criterion:add', new Criterion(this.criterionName))

      this.criterionName = ''
      this.adding = false
    },
    removeCriterion(criterion) {
      this.$emit('criterion:remove', criterion)
    },
  },
}

CriterionComponent.components = { Criteria: c }

c.components = { Criterion: CriterionComponent }

export default c
</script>
