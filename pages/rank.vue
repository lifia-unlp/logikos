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
  computed: {
    rank() {
      const r = Ranking.combine(
        this.$store.state.frontend.comparisons.map((c) => c.rank())
      )

      r.sort()

      return r
    },
  },
}
</script>

<style></style>
