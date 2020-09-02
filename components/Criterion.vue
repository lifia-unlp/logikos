<template>
  <div class="criterion">
    <li class="criterion-name">
      {{ criterion.name }} ({{ criterion.absoluteWeight() * 100 }}%)
    </li>

    <Criteria :criteria="criterion.subcriteria"></Criteria>
  </div>
</template>

<script>
export default {
  name: 'Criterion',
  props: {
    criterion: {
      type: Object,
      default() {
        return {}
      },
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
