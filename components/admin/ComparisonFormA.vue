<template>
  <div>
    <div class="flex flex-wrap justify-between">
      <div>
        <h2 class="text-secondary text-xl mb-4">Compare</h2>
      </div>
      <div>
        <HelpPopover title="Comparison">
          Compare a set of criteria or preset values. Move the checkmark in each
          row to the element that's more important. Leave the checkmark in the
          middle if the elements are equal. If you want to, you can check more
          details of the comparison: the resulting decision matrix and
          consistency of it.
        </HelpPopover>
      </div>
    </div>

    <div class="flex flex-wrap mb-4">
      <div class="w-full">
        <div>
          <table>
            <template v-for="(comparisons, i) in pairwiseComparisons">
              <tr v-for="j in comparisons" :key="j">
                <td class="w-3/12 text-left">
                  {{ comparison.alternatives[i].name }}
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
                  {{ comparison.alternatives[j].name }}
                </td>
              </tr>
            </template>
          </table>
        </div>
        <p class="form-field__hint">
          &#128712; Move the checkmark closer to what you think is more
          important or better
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
import { VALID_VALUES } from '@/models/DecisionMatrix.js'

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
      showDetails: false,
      interactionsCount: 0,
    }
  },
  computed: {
    consistencyRatio() {
      return Math.abs(this.comparison.dm.consistencyRatio().toFixed(2))
    },
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

      this.interactionsCount++

      console.log('Total interactions: ', this.interactionsCount)
    },
    invert(row, col) {
      this.comparison.dm.setReciprocalValue(col, row)

      this.$set(this.comparison.dm.matrix, col, this.comparison.dm.matrix[col])
    },
    cancel() {
      this.$emit('cancel')
    },
    save() {
      this.$emit('comparison:rank', this.comparison)
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
