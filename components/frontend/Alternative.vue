<template>
  <div class="alternative">
    <div class="w-2/12">
      <img class="w-10/12" :src="alternative.thumb" />
    </div>

    <div class="w-8/12">
      <p class="alternative__label">
        {{ alternative.label }}
      </p>
    </div>

    <div class="w-2/12">
      <p class="alternative__price">$ {{ alternative.price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alternative',
  props: {
    alternative: {
      type: Object,
    },
  },
}
</script>

<style>
.alternative {
  @apply border-l-2 border-primary pl-2 my-3 flex items-center;
}

.alternative__label {
  @apply text-sm;
}

.alternative__price {
  @apply text-sm text-green-500;
}
</style>
