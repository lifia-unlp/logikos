<template>
  <div class="alternative">
    <p class="alternative__label">
      {{ alternative.label }}
    </p>
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
  @apply border-l-2 border-primary pl-8 my-3 flex items-center;
}

.alternative__label {
  @apply text-2xl;
}

.alternative__price {
  @apply text-sm text-green-500;
}
</style>
