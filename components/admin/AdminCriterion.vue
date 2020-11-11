<template>
  <div>
    <div class="criterion">
      <div class="w-1/12">
        <div class="criterion__weight">{{ weight }}%</div>
      </div>
      <div class="w-11/12 criterion__name">
        <div class="w-10/12">
          {{ criterion.name }}
        </div>
        <div class="w-2/12" v-if="showActions">
          <font-awesome-icon
            :icon="['fas', 'plus']"
            class="criterion__action-btn"
            @click="addSubcriteria()"
          />
          <font-awesome-icon
            :icon="['fas', 'sort-amount-down']"
            class="criterion__action-btn"
            v-if="criterion.subcriteria.length > 1"
            @click="compareSubcriteria()"
          />
          <font-awesome-icon
            :icon="['fas', 'pencil-alt']"
            class="criterion__action-btn"
            @click="edit()"
          />
          <font-awesome-icon
            :icon="['far', 'trash-alt']"
            class="criterion__action-btn"
            @click="remove()"
          />
        </div>
      </div>
    </div>

    <div v-if="criterion.subcriteria.length > 0" class="criterion__subcriteria">
      <AdminCriterion2
        v-for="(subcriterion, i) in criterion.subcriteria"
        :key="i"
        :criterion="subcriterion"
        :showActions="showActions"
        @criterion:remove="removeSubcriterion(subcriterion)"
        @criterion:new="$emit('criterion:new', $event)"
        @criterion:edit="$emit('criterion:edit', $event)"
        @comparison:new="$emit('comparison:new', $event)"
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
  computed: {
    weight() {
      const weight = this.criterion.absoluteWeight() * 100

      return weight > 1 ? Math.round(weight) : weight.toFixed(2)
    },
  },
  methods: {
    remove() {
      this.$emit('criterion:remove', this.criterion)
    },
    edit() {
      this.$emit('criterion:edit', this.criterion)
    },
    addSubcriteria() {
      this.$emit('criterion:new', this.criterion)
    },
    removeSubcriterion(subcriterion) {
      this.criterion.removeSubcriterion(subcriterion.name)
    },
    compareSubcriteria() {
      this.$emit('comparison:new', this.criterion.subcriteria)
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
