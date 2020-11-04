<template>
  <div>
    <div class="flex flex-wrap mb-4">
      <div class="w-full">
        <canvas id="lineChart"></canvas>
        <p class="text-xs text-gray-600">
          &#128712; Drag each point representing an item/value in relation to
          the one with the anchor icon. Is it better? Is it worse? how much
          better/worse?
        </p>
      </div>
      <div class="w-full flex flex-wrap justify-evenly items-center">
        <table>
          <tr v-for="(row, i) in comparison.dm.matrix" :key="i">
            <td
              v-for="(cell, j) in row"
              :key="j"
              class="border-2 border-gray-300"
            >
              <input
                class="w-10 h-10 text-center bg-transparent"
                v-model="comparison.dm.matrix[i][j]"
                @change="invert(i, j)"
              />
            </td>
          </tr>
        </table>
        <div>
          <p class="text-center tracking-wider text-secondary text-lg">
            CONSISTENCY RATIO
          </p>
          <p class="text-center text-2xl">
            {{ comparison.dm.consistencyRatio() }}
          </p>
        </div>
      </div>
    </div>
    <button class="button-default" @click="save">
      Save comparison
    </button>
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
    comparison: {
      type: Object,
      default() {
        return {}
      },
    },
  },
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
    this.lineChart.data.datasets[0].data = this.comparison.dm.matrix[0].map(
      convertAHPToChart
    )

    this.lineChart.update()
  },
  methods: {
    invert(row, col) {
      this.comparison.dm.setReciprocalValue(col, row)

      this.$set(this.comparison.dm.matrix, col, this.comparison.dm.matrix[col])
    },

    lineChartDragAction(e, datasetIndex, column, value) {
      this.comparison.dm.setCell(0, column, convertChartToAHP(value))
      this.comparison.dm.autocomplete2()
    },

    save() {
      this.$emit('comparison:rank', this.comparison)
    },
  },
}
</script>
