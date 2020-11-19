<template>
  <div class="phone">
    <div class="w-2/12">
      <img class="w-10/12" :src="phone.image" />
    </div>

    <div class="w-8/12">
      <p class="phone__model">
        <a :href="phone.url" target="_blank">
          {{ phone.model }}
        </a>
      </p>
    </div>

    <div class="w-2/12">
      <p class="phone__price">$ {{ phone.price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Phone',
  props: {
    phone: {
      type: Object,
    },
  },
}
</script>

<style>
.phone {
  @apply border-l-2 border-primary pl-2 my-3 flex items-center;
}

.phone__model {
  @apply text-sm;
}

.phone__price {
  @apply text-sm text-green-500;
}
</style>
