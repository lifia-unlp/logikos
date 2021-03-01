<template>
  <div class="w-full">
    <div>
      <table>
        <template v-for="(comparisons, i) in pairwiseComparisons">
          <tr v-for="j in comparisons" :key="j">
            <td class="w-3/12 text-left">
              {{ comparison.alternatives[i].label }}
            </td>
            <td class="w-6/12">
              <template v-for="(value, k) in ahpValues">
                <font-awesome-icon
                  v-if="value == comparison.dm.matrix[i][j]"
                  :key="k"
                  :icon="['far', 'check-square']"
                  class="mx-1"
                />

                <font-awesome-icon
                  v-else-if="value == 1"
                  :key="k"
                  :icon="['fas', 'minus']"
                  class="mx-1 cursor-pointer text-accent"
                  @click="setCell(i, j, value)"
                />

                <font-awesome-icon
                  v-else-if="value > 1"
                  :key="k"
                  :icon="['fas', 'angle-left']"
                  class="mx-1 cursor-pointer text-accent"
                  @click="setCell(i, j, value)"
                />

                <font-awesome-icon
                  v-else
                  :key="k"
                  :icon="['fas', 'angle-right']"
                  class="mx-1 cursor-pointer text-accent"
                  @click="setCell(i, j, value)"
                />
              </template>
            </td>
            <td class="w-3/12 text-right">
              {{ comparison.alternatives[j].label }}
            </td>
          </tr>
        </template>
      </table>
    </div>
    <p class="form-field__hint">
      &#128712; Move the checkmark closer to what you think is more important or
      better
    </p>
  </div>
</template>

<script>
import { VALID_VALUES } from '@/models/DecisionMatrix.js'

export default {
  props: {
    comparison: Object,
  },
  computed: {
    ahpValues() {
      return [...VALID_VALUES].reverse()
    },
    pairwiseComparisons() {
      const pc = []

      for (let i = 0; i < this.comparison.alternatives.length - 1; i++) {
        pc.push([])
        for (let j = i + 1; j < this.comparison.alternatives.length; j++) {
          pc[i].push(j)
        }
      }

      return pc
    },
  },
  methods: {
    setCell(row, col, value) {
      this.comparison.dm.setCell(row, col, value)

      this.$set(this.comparison.dm.matrix, col, this.comparison.dm.matrix[col])

      this.comparison.isCompared = true
    },
  },
}
</script>

<style></style>
