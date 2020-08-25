<template>
  <div class="ml-8">
    <li class="text-lg">
      {{ criterion.name }} ({{ criterion.absoluteWeight() }}%)
      <a @click="removeCriterion(criterion)">x</a>
    </li>

    <AdminCriteria
      :criteria="criterion.subcriteria"
      @criterion:add="addSubcriterion"
      @criterion:remove="removeSubcriterion"
    >
    </AdminCriteria>
  </div>
</template>

<script>
export default {
  name: 'AdminCriterion',
  props: {
    criterion: {
      type: Object,
      default() {
        return {}
      },
    },
  },
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
