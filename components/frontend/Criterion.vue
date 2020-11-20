<template>
  <div>
    <div class="criterion">
      <div class="w-2/12">
        <div class="criterion__weight">{{ weight }}%</div>
      </div>
      <div class="w-10/12 criterion__name">
        <div class="w-10/12">
          {{ criterion.name }}
        </div>
        <div class="w-2/12">
          <font-awesome-icon
            v-if="criterion.shouldBeCompared() && criterion.hasPreset()"
            :icon="['fas', 'bolt']"
            class="criterion__action-btn"
          />
          <font-awesome-icon
            v-if="
              criterion.shouldBeCompared() &&
              comparison &&
              comparison.isCompared
            "
            :icon="['fas', 'check']"
            class="criterion__action-btn"
          />
        </div>
      </div>
    </div>

    <div v-if="criterion.subcriteria.length > 0" class="criterion__subcriteria">
      <Criterion
        v-for="(subcriterion, i) in criterion.subcriteria"
        :key="i"
        :criterion="subcriterion"
      >
      </Criterion>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'Criterion',
  props: {
    criterion: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    weight() {
      const weight = this.criterion.absoluteWeight() * 100

      return weight > 1 ? Math.round(weight) : weight.toFixed(2)
    },
    comparison() {
      return this.$store.state.frontend.comparisons[this.criterion.name]
    },
  },
}
</script>

<style scoped>
.criterion {
  @apply flex flex-wrap mb-2;
}

.criterion__name {
  @apply flex flex-wrap px-2 border border-whitesmoke;
}

.criterion__weight {
  @apply mx-2 bg-primary text-white text-center;
}

.criterion__action-btn {
  @apply text-gray-400 text-base cursor-pointer;
}

.criterion__action-btn:hover {
  @apply text-accent;
}

.criterion__subcriteria {
  @apply ml-6;
}
</style>
