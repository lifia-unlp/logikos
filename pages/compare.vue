<template>
  <div>
    <h1 class="text-4xl">{{ criterion }}</h1>

    <div class="w-full">
      <canvas id="lineChart"></canvas>
    </div>

    <nuxt-link class="btn" to="/selectProfile">Volver</nuxt-link>
  </div>
</template>

<script>
import comparisonChartConfig, {
  convertChartToAHP,
  convertAHPToChart,
} from '@/charts/comparisonChartConfig'

import Chart from 'chart.js'
import 'chartjs-plugin-dragdata'

export default {
  layout: 'frontend',
  data() {
    return {
      lineChart: {},
    }
  },
  computed: {
    comparison() {
      return this.$store.state.frontend.comparisons[this.criterion]
    },
    criterion() {
      return this.$route.query.criterion
    },
  },
  mounted() {
    comparisonChartConfig.options.onDragEnd = this.lineChartDragAction

    this.lineChart = new Chart(
      document.getElementById('lineChart'),
      comparisonChartConfig
    )

    this.lineChart.data.labels = this.comparison.alternatives.map(
      (a) => `${a.label} - ${a[this.criterion]}`
    )
    this.lineChart.data.datasets[0].data = this.comparison.dm.matrix[0].map(
      convertAHPToChart
    )

    this.lineChart.update()
  },
  methods: {
    lineChartDragAction(e, datasetIndex, column, value) {
      this.comparison.dm.setCell(0, column, convertChartToAHP(value))
      this.comparison.dm.autocomplete3()
      this.$store.commit('frontend/setCompared', this.criterion)
    },
  },
}
</script>
<style>
.btn {
  @apply py-1 px-2 bg-secondary text-white font-bold;
}
</style>
