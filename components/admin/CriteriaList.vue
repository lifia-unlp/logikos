<template>
  <div>
    <div class="flex flex-wrap justify-between">
      <div>
        <h2 class="text-secondary text-xl mb-4">Criteria</h2>
      </div>
      <div>
        <HelpPopover title="Profile criteria">
          Specify the comparison criteria for this profile that will be used on
          a set of alternatives. You can create, edit and delete criterions.
          Each criterion can be broke down in subcriteria. You can compare
          criteria of the same level to determine how much important is one
          criterion to another.
        </HelpPopover>
      </div>
    </div>

    <button
      class="criteria__btn"
      v-if="criteria.length > 1 && show"
      @click="compareCriteria"
    >
      <font-awesome-icon :icon="['fas', 'sort-amount-down']" />
      Compare
    </button>

    <AdminCriterion
      v-for="(criterion, i) in criteria"
      :key="i"
      :criterion="criterion"
      :showActions="show"
      @criterion:remove="$emit('criterion:remove', criterion)"
      @criterion:edit="$emit('criterion:edit', $event)"
      @criterion:new="$emit('criterion:new', $event)"
      @comparison:new="$emit('comparison:new', $event)"
    >
    </AdminCriterion>

    <button class="criteria__btn" v-if="show" @click="newCriterion">
      <font-awesome-icon :icon="['fas', 'plus']" />
      Add Criterion
    </button>
  </div>
</template>

<script>
export default {
  name: 'CriteriaList',
  props: {
    criteria: Array,
    show: Boolean,
  },
  methods: {
    newCriterion() {
      this.$emit('criterion:new')
    },
    compareCriteria() {
      this.$emit('comparison:new', this.criteria)
    },
  },
}
</script>

<style scoped>
.criteria__btn {
  @apply text-accent text-sm cursor-pointer;
}
</style>
