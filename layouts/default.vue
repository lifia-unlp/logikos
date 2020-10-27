<template>
  <div>
    <div class="flex border-b-2 border-primary items-center h-12">
      <nav class="w-full max-w-screen-xl relative mx-auto px-6">
        <p class="text-lg text-primary inline">Neo Logikos</p>
        <nuxt-link
          class="px-3 text-secondary text-xs font-normal tracking-wider"
          to="/"
        >
          FRONTEND
        </nuxt-link>
        <nuxt-link
          class="px-3 text-secondary text-xs font-normal tracking-wider"
          to="/admin/profiles"
        >
          ADMIN
        </nuxt-link>
      </nav>
    </div>

    <div class="lg:container lg:mx-auto px-4">
      <Nuxt />
    </div>
  </div>
</template>

<style>
/*
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*/
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
/*
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
*/
</style>
