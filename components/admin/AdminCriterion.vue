<template>
  <div class="criterion">
    <li class="criterion-name">
      {{ criterion.name }} ({{ criterion.absoluteWeight() * 100 }}%)
      <font-awesome-icon
        :icon="['far', 'trash-alt']"
        @click="removeCriterion(criterion)"
        class="mx-1 text-logikos-dark text-base cursor-pointer"
      />
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

<style>
.criterion {
  @apply ml-8;
}

.criterion-name {
  @apply text-2xl font-light;
}
</style>
