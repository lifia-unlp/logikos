<template>
  <div>
    <div class="flex flex-wrap justify-between">
      <div>
        <h2 class="text-secondary text-xl mb-4">Compare</h2>
      </div>
      <div>
        <HelpPopover title="Comparison">
          Compare a set of criteria or preset values. Drag the points of the
          widget to specify the relationship of importance between an element to
          the leftmost. If you want to, you can check more details of the
          comparison: the resulting decision matrix and consistency of it.
        </HelpPopover>
      </div>
    </div>

    <div class="flex flex-wrap mb-4">
      <div class="w-full">
        <canvas id="lineChart"></canvas>
        <p class="form-field__hint">
          &#128712; Drag each point representing an item/value in relation to
          the one with the anchor icon. Is it better? Is it worse? how much
          better/worse?
        </p>

        <button
          class="mt-2 text-sm text-secondary"
          @click="showDetails = !showDetails"
        >
          <font-awesome-icon v-if="showDetails" :icon="['fas', 'angle-down']" />
          <font-awesome-icon v-else :icon="['fas', 'angle-right']" />
          Show details
        </button>
      </div>
      <div class="comparison-details" v-if="showDetails">
        <table>
          <tr v-for="(row, i) in comparison.dm.matrix" :key="i">
            <td
              v-for="(cell, j) in row"
              :key="j"
              class="comparison-details__dm-cell"
            >
              <input
                class="comparison-details__dm-input"
                v-model="comparison.dm.matrix[i][j]"
                @change="invert(i, j)"
              />
            </td>
          </tr>
        </table>
        <div>
          <p class="comparison-details__cr-title">
            CONSISTENCY RATIO
          </p>
          <p
            class="comparison-details__cr-value"
            :class="[
              !comparison.dm.isConsistent()
                ? 'comparison-details__cr-value--inconsistent'
                : '',
            ]"
          >
            {{ consistencyRatio }}
          </p>
        </div>
      </div>
    </div>
    <button class="btn btn--save" @click="save">
      Save
    </button>
    <button class="btn" @click="cancel">
      Cancel
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
      referenceRow: 0,
      showDetails: false,
    }
  },
  computed: {
    consistencyRatio() {
      return Math.abs(this.comparison.dm.consistencyRatio().toFixed(2))
    },
  },
  mounted() {
    comparisonChartConfig.options.onDragEnd = this.lineChartDragAction

    this.lineChart = new Chart(
      document.getElementById('lineChart'),
      comparisonChartConfig
    )

    this._setChartLabelsAndDataset()
  },
  methods: {
    invert(row, col) {
      this.comparison.dm.setReciprocalValue(col, row)

      this.$set(this.comparison.dm.matrix, col, this.comparison.dm.matrix[col])
    },

    lineChartDragAction(e, datasetIndex, point, value) {
      const column = point > this.referenceRow ? point : point - 1

      this.comparison.dm.setCell(
        this.referenceRow,
        column,
        convertChartToAHP(value)
      )
      this.comparison.dm.autocomplete3(this.referenceRow)

      this.$forceUpdate()
    },
    cancel() {
      this.$emit('cancel')
    },
    save() {
      this.$emit('comparison:rank', this.comparison)
    },
    _setChartLabelsAndDataset() {
      this.lineChart.data.labels = this._getChartLabels()
      this.lineChart.data.datasets[0].data = this._getChartDataset()

      this.lineChart.update()
    },
    _getChartLabels() {
      const alternatives = this.comparison.alternatives.slice()

      const ref = alternatives.splice(this.referenceRow, 1)

      return [ref.toString()].concat(alternatives.map((a) => a.toString()))
    },
    _getChartDataset() {
      const row = this.comparison.dm[this.referenceRow].slice()

      row.splice(this.referenceRow, 1)

      return [0].concat(row.map(convertAHPToChart))
    },
  },
}
</script>
<style>
.comparison-details {
  @apply w-full flex flex-wrap justify-evenly items-center;
}

.comparison-details__dm-cell {
  @apply border-2 border-gray-300;
}

.comparison-details__dm-input {
  @apply w-10 h-10 text-center bg-transparent;
}

.comparison-details__cr-title {
  @apply text-center tracking-wider text-secondary text-lg;
}

.comparison-details__cr-value {
  @apply text-center text-2xl text-green-400;
}

.comparison-details__cr-value--inconsistent {
  @apply text-red-400;
}
</style>
