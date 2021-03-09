<template>
  <div>
    <h1 class="text-4xl font-thin text-logikos">Alternatives</h1>

    <input type="file" @change="loadAlternatives" accept="application/json" />

    <Alternative
      v-for="(alternative, key) in alternatives"
      :key="key"
      :alternative="alternative"
    >
    </Alternative>

    <div class="mt-4 flex justify-end">
      <button @click="nextPage" v-if="alternatives.length > 1" class="btn">
        Next
      </button>
      <a v-else class="btn btn--disabled">
        Next
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'frontend',
  data() {
    return {
      alternativeUrl: '',
    }
  },
  computed: {
    ...mapState('frontend', ['alternatives']),
  },
  methods: {
    loadAlternatives(event) {
      const reader = new FileReader()

      reader.onload = (event) => {
        this.$store.commit(
          'frontend/setAlternatives',
          JSON.parse(event.target.result)
        )
      }

      reader.readAsText(event.target.files[0])
    },
    nextPage() {
      this.$store.commit('frontend/startExperiment')

      this.$router.push('/selectProfile')
    },
  },
}
</script>

<style>
.btn {
  @apply py-1 px-2 bg-secondary text-white font-bold;
}

.btn--disabled {
  @apply bg-gray-200 text-gray-400;
}
</style>
