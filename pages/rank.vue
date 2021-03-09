<template>
  <div>
    <div class="container mx-auto mt-2 px-4 py-2 w-4/12 bg-white shadow">
      <h1 class="text-4xl font-thin text-logikos">Ranking</h1>

      <Rank
        v-for="(rankItem, i) in rank.ranking"
        :key="i"
        :rank="rankItem"
        :position="i + 1"
      >
      </Rank>

      <nuxt-link to="/" class="default-button">
        Back
      </nuxt-link>
    </div>

    <div class="mt-40 border-gray-400 rounded bg-white">
      <p>Experiment Results. Don't forget to save the text below to a file.</p>
      <code class="block whitespace-pre-wrap">
        {{ statisticsJSON }}
        {{ comparisonsJSON }}
      </code>
    </div>
  </div>
</template>

<script>
import Ranking from '@/models/Ranking'

export default {
  computed: {
    rank() {
      const ranks = []

      for (const criterion in this.$store.state.frontend.comparisons) {
        ranks.push(this.$store.state.frontend.comparisons[criterion].rank())
      }

      const r = Ranking.combine(ranks)

      r.sort()

      return r
    },
    statisticsJSON() {
      return JSON.stringify(this.$store.state.frontend.statistics, null, 2)
    },
    comparisonsJSON() {
      const comparisons = this.$store.state.frontend.comparisons

      for (const c in comparisons) {
        comparisons[c].consistency = comparisons[c].dm.consistencyRatio()
      }

      return JSON.stringify(comparisons, null, 2)
    },
  },
}
</script>

<style></style>
