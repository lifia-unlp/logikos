<template>
  <div>
    <h1 class="text-4xl font-thin text-logikos mb-4">
      Compare by {{ criterion }}
    </h1>

    <component
      :is="comparisonWidget"
      :comparison="comparison"
      :criterion="criterion"
    ></component>

    <div class="mt-8 flex justify-between">
      <nuxt-link to="/selectProfile">Back</nuxt-link>
      <button @click="saveComparison" class="btn">Save</button>
    </div>
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

    this.$store.commit('frontend/startComparison', {
      criterion: this.criterion,
      widget: this.$route.query.widget,
    })
  },
  methods: {
    saveComparison() {
      this.$store.commit('frontend/updateComparison', {
        id: this.criterion,
        comparison: this.comparison,
      })

      this.$store.commit('frontend/endComparison', this.criterion)

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
