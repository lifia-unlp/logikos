<template>
  <div>
    <h1 class="text-4xl">{{ comparison.criterion.name }}</h1>

    <div class="w-1/2">
      <canvas id="lineChart"></canvas>
    </div>

    <nuxt-link class="py-1 px-2 border-2 rounded font-bold text-xs" to="/">
      Volver
    </nuxt-link>
  </div>
</template>

<script>
import comparisonChartConfig from '@/charts/comparisonChartConfig'

import Chart from 'chart.js'
import 'chartjs-plugin-dragdata'

export default {
  data() {
    return {
      lineChart: {},
    }
  },
  computed: {
    comparison() {
      return this.$store.state.frontend.comparisons[this.$route.params.id]
    },
  },
  mounted() {
    comparisonChartConfig.options.onDragEnd = this.lineChartDragAction

    this.lineChart = new Chart(
      document.getElementById('lineChart'),
      comparisonChartConfig
    )

    this.lineChart.data.labels = this.comparison.alternatives.map(
      (a) => `${a.model} - ${a[this.comparison.criterion.getAttribute()]}`
    )
    this.lineChart.data.datasets[0].data = this.comparison.dm.matrix[0]

    this.lineChart.update()
  },
  methods: {
    lineChartDragAction(e, datasetIndex, column, value) {
      this.comparison.dm.setCell(0, column, value)
      this.comparison.dm.autocomplete()
      this.$store.commit('frontend/setCompared', this.$route.params.id)
    },
  },
}
</script>
