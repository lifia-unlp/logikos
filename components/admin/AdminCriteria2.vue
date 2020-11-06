<template>
  <div class="w-full">
    <AdminCriterion2
      v-for="(criterion, key) in criteria"
      :key="key"
      :criterion="criterion"
    >
    </AdminCriterion2>
  </div>
</template>

<script>
import AdminCriterion2 from '@/components/AdminCriterion2'

const c = {
  name: 'AdminCriteria2',
  props: {
    criteria: Array,
  },
}

AdminCriterion2.components = { AdminCriteria2: c }

c.components = { AdminCriterion2 }

export default c
</script>
