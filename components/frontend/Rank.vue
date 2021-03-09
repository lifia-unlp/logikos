<template>
  <div class="mx-2 my-4 flex items-center grid grid-cols-12">
    <div class="col-span-2">
      <p class="text-2xl">{{ position }}º</p>
    </div>

    <div class="col-span-7">
      <p class="text-lg text-logikos">
        {{ rank.alternative.label }}
      </p>
    </div>

    <div class="col-span-3">
      <p>{{ weight }}%</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rank: {
      type: Object,
    },
    position: {
      type: Number,
    },
  },
  computed: {
    weight() {
      const weight = this.rank.weight * 100

      return weight > 1 ? Math.round(weight) : weight.toFixed(2)
    },
  },
}
</script>
