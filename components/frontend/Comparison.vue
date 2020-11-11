<template>
  <div class="comparison-pill">
    <nuxt-link
      v-if="canCompare"
      :to="{
        name: 'compare',
        params: { id: id },
      }"
    >
      {{ comparison.criterion.name }} -
      {{ comparison.isCompared ? 'SI' : 'NO' }}
    </nuxt-link>

    <template v-else>
      {{ comparison.criterion.name }}
    </template>
  </div>
</template>

<script>
export default {
  props: ['comparison', 'id', 'canCompare'],
}
</script>

<style>
.comparison-pill {
  @apply inline p-1 m-1 bg-blue-400 rounded text-white font-bold;
}
</style>
