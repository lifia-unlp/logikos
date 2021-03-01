<template>
  <div>
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
</template>

<script>
import Ranking from '@/models/Ranking'

export default {
  layout: 'frontend',
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
  },
}
</script>

<style></style>
