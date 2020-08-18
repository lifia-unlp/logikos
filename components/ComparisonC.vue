<template>
  <div class="border-solid border-2">
    <p>Comparison</p>
    <div class="flex mb-4">
      <div class="w-1/2">
        <canvas id="lineChart"></canvas>
      </div>
      <div class="w-1/2">
        <table>
          <tr v-for="(row, i) in comparison.dm.matrix" :key="i">
            <td v-for="(cell, j) in row" :key="j">
              <input
                v-model="comparison.dm.matrix[i][j]"
                @change="invert(i, j)"
              />
            </td>
          </tr>
        </table>
        <p>CR: {{ comparison.dm.consistencyRatio() }}</p>
      </div>
    </div>
    <button @click="save">Save comparison</button>
  </div>
</template>

<script>
import comparisonChartConfig from '@/charts/comparisonChartConfig'

import Chart from 'chart.js'
import 'chartjs-plugin-dragdata'

export default {
  name: 'ComparisonC',
  props: ['comparison'],
  data() {
    return {
      lineChart: {},
    }
  },
  mounted() {
    comparisonChartConfig.options.onDragEnd = this.lineChartDragAction

    this.lineChart = new Chart(
      document.getElementById('lineChart'),
      comparisonChartConfig
    )

    this.lineChart.data.labels = this.comparison.alternatives.map((a) =>
      a.toString()
    )
    this.lineChart.data.datasets[0].data = this.comparison.dm.matrix[0]

    this.lineChart.update()
  },
  methods: {
    invert(row, col) {
      this.comparison.dm.setReciprocalValue(col, row)

      this.$set(this.comparison.dm.matrix, col, this.comparison.dm.matrix[col])
    },

    lineChartDragAction(e, datasetIndex, column, value) {
      this.comparison.dm.setCell(0, column, value)
      this.comparison.dm.autocomplete()
    },

    save() {
      this.$emit('comparison:rank', this.comparison.rank())
    },
  },
}
</script>
