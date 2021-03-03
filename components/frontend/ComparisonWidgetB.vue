<template>
  <div class="w-full">
    <canvas id="lineChart"></canvas>
    <p class="form-field__hint">
      &#128712; Drag each point representing an item/value in relation to the
      one with the anchor icon. Is it better? Is it worse? how much
      better/worse?
    </p>
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
  props: {
    comparison: Object,
    criterion: String,
  },
  mounted() {
    comparisonChartConfig.options.onDragEnd = this.lineChartDragAction

    this.lineChart = new Chart(
      document.getElementById('lineChart'),
      comparisonChartConfig
    )

    this.lineChart.data.labels = this.comparison.alternatives.map(
      (a) => a.label
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
      this.comparison.isCompared = true

      this.$store.commit('frontend/registerClick', this.criterion)
    },
  },
}
</script>

<style></style>
