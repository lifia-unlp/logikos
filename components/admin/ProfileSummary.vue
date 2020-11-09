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
      piechart: {},
    }
  },
  mounted() {
    const labels = this.profile.criteria.map((c) => c.name)

    const values = this.profile.criteria.map((c) => c.absoluteWeight())

    this.lineChart = new Chart(document.getElementById('pieChart'), {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            backgroundColor: ['#E9604E', '#17273E', '#71BBE8'],
            data: values,
          },
        ],
      },
    })
  },
}
</script>
