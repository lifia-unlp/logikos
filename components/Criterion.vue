<template>
  <div class="ml-8">
    <li class="text-lg">
      {{ criterion.name }} ({{ criterion.absoluteWeight() }}%)
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
