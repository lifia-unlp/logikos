<template>
  <div
    class="border-l-2 border-logikos-orange pl-2 mx-2 my-4 flex items-center grid grid-cols-12"
  >
    <div class="col-span-1">
      <img class="w-12" :src="phone.image" />
    </div>

    <div class="col-span-8">
      <p class="text-lg text-logikos">
        <a :href="phone.url" target="_blank">
          {{ phone.model }}
        </a>
      </p>
    </div>

    <div class="col-span-3">
      <p>$ {{ phone.price }}</p>
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
