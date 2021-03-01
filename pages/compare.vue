<template>
  <div>
    <h1 class="text-4xl">{{ criterion }}</h1>

    <component :is="comparisonWidget" :comparison="comparison"></component>

    <nuxt-link class="btn" to="/selectProfile">Back</nuxt-link>
    <button @click="saveComparison" class="btn">Save</button>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  layout: 'frontend',
  components: {
    ComparisonWidgetA: () => import('@/components/frontend/ComparisonWidgetA'),
    ComparisonWidgetB: () => import('@/components/frontend/ComparisonWidgetB'),
  },
  data() {
    return {
      comparison: {},
    }
  },
  computed: {
    comparisonWidget() {
      return (
        'ComparisonWidget' + (this.$route.query.widget || 'B').toUpperCase()
      )
    },
    criterion() {
      return this.$route.query.criterion
    },
  },
  created() {
    this.comparison = _.cloneDeep(
      this.$store.getters['frontend/getComparisonByCriterion'](this.criterion)
    )
  },
  methods: {
    saveComparison() {
      this.$store.commit('frontend/updateComparison', {
        id: this.criterion,
        comparison: this.comparison,
      })

      this.$router.push('/selectProfile')
    },
  },
}
</script>
<style>
.btn {
  @apply py-1 px-2 bg-secondary text-white font-bold;
}
</style>
