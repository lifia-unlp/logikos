<template>
  <div>
    <div class="flex flex-wrap mb-2">
      <div class="w-1/12">
        <div class="mx-2 bg-primary text-white text-center">
          {{ criterion.absoluteWeight() * 100 }}%
        </div>
      </div>
      <div class="w-11/12 flex flex-wrap px-2 border border-whitesmoke">
        <div class="w-10/12">
          {{ criterion.name }}
        </div>
        <div class="w-2/12" v-if="showActions">
          <font-awesome-icon
            :icon="['fas', 'plus']"
            class="text-gray-400 hover:text-accent text-base cursor-pointer"
            @click="addSubcriteria()"
          />
          <font-awesome-icon
            :icon="['fas', 'sort-amount-down']"
            class="text-gray-400 hover:text-accent text-base cursor-pointer"
            v-if="criterion.subcriteria.length > 1"
            @click="compareSubcriteria()"
          />
          <font-awesome-icon
            :icon="['fas', 'pencil-alt']"
            class="text-gray-400 hover:text-accent text-base cursor-pointer"
          />
          <font-awesome-icon
            :icon="['far', 'trash-alt']"
            class="text-gray-400 hover:text-accent text-base cursor-pointer"
            @click="remove()"
          />
        </div>
      </div>
    </div>

    <div v-if="criterion.subcriteria.length > 0" class="ml-6">
      <AdminCriterion2
        v-for="(subcriterion, i) in criterion.subcriteria"
        :key="i"
        :criterion="subcriterion"
        :showActions="showActions"
        @criterion:remove="removeSubcriterion(subcriterion)"
        @criterion:new="propagateNewCriterion"
        @comparison:new="propagateCompare"
      >
      </AdminCriterion2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminCriterion2',
  props: {
    showActions: {
      type: Boolean,
      default() {
        return false
      },
    },
    criterion: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  methods: {
    remove() {
      this.$emit('criterion:remove', this.criterion)
    },
    removeSubcriterion(subcriterion) {
      this.criterion.removeSubcriterion(subcriterion.name)
    },
    compareSubcriteria() {
      this.$emit('comparison:new', this.criterion)
    },
    addSubcriteria() {
      this.$emit('criterion:new', this.criterion)
    },
    propagateNewCriterion(criterion) {
      this.$emit('criterion:new', criterion)
    },
    propagateCompare(criterion) {
      this.$emit('comparison:new', criterion)
    },
  },
}
</script>
