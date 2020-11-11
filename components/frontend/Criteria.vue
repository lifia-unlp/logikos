<template>
  <ul class="list-none">
    <Criterion
      v-for="(criterion, key) in criteria"
      :key="key"
      :criterion="criterion"
    >
    </Criterion>
  </ul>
</template>

<script>
import CriterionComponent from '@/components/frontend/Criterion'

const c = {
  name: 'Criteria',
  props: {
    criteria: Array,
  },
}

CriterionComponent.components = { Criteria: c }

c.components = { Criterion: CriterionComponent }

export default c
</script>
