<template>
  <div>
    <ul>
      <li v-for="(criterion, key) in criteria" :key="key">
        {{ criterion.name }} - ({{ criterion.weight }}%)
        <button @click="removeCriterion(criterion)">x</button>
      </li>
    </ul>

    <label for="criterionName">Name: </label>
    <input v-model="criterionName" name="criterionName" type="text" />
    <button @click="addCriterion">add</button>
  </div>
</template>

<script>
import Criterion from '@/models/Criterion'

export default {
  name: 'Criteria',
  props: ['criteria'],
  data() {
    return {
      criterionName: '',
    }
  },
  methods: {
    addCriterion() {
      this.$emit('add:criterion', new Criterion(this.criterionName))

      this.criterionName = ''
    },
    removeCriterion(criterion) {
      this.$emit('remove:criterion', criterion)
    },
  },
}
</script>
