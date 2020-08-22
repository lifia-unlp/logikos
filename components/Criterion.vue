<template>
  <div class="ml-8" style="border: 1px solid red;">
    <li>
      {{ criterion.name }} - {{ criterion.absoluteWeight() }}
      <a @click="removeCriterion(criterion)">x</a>
    </li>

    <Criteria
      :criteria="criterion.subcriteria"
      @criterion:add="addSubcriterion"
      @criterion:remove="removeSubcriterion"
    >
    </Criteria>
  </div>
</template>

<script>
export default {
  name: 'Criterion',
  props: ['criterion'],
  methods: {
    removeCriterion(criterion) {
      this.$emit('criterion:remove', criterion)
    },
    addSubcriterion(subcriterion) {
      this.criterion.addSubcriterion(subcriterion)
    },
    removeSubcriterion(subcriterion) {
      this.criterion.removeSubcriterion(subcriterion.name)
    },
  },
}
</script>
