<template>
  <div>
    <h2 class="text-primary text-2xl">"{{ profile.name }}"</h2>
    <p class="text-sm">{{ profile.description }}</p>

    <div class="w-full h-full">
      <canvas id="pieChart"></canvas>
    </div>
  </div>
</template>
<script>
import Chart from 'chart.js'

export default {
  name: 'ProfileSummary',
  props: {
    profile: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      pieChart: {},
    }
  },
  mounted() {
    this.pieChart = new Chart(document.getElementById('pieChart'), {
      type: 'pie',
      data: {
        datasets: [
          {
            backgroundColor: [
              '#E9604E',
              '#17273E',
              '#71BBE8',
              '#0F7173',
              '#533A7B',
              '#4B244A',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
      },
    })

    this._updatePieChart()
  },
  watch: {
    profile: {
      handler(val) {
        this._updatePieChart()
      },
      deep: true,
    },
  },
  methods: {
    _updatePieChart() {
      this.pieChart.data.labels = this.profile
        .getComparableCriteria()
        .map((c) => c.name)

      this.pieChart.data.datasets[0].data = this.profile
        .getComparableCriteria()
        .map((c) => c.absoluteWeight())

      this.pieChart.update()
    },
  },
}
</script>
