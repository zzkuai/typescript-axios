<template>
  <ul>
    <li v-for="page in pages" :key="page.id">
      <router-link :to="page.url">{{ page.name }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  setup() {
    const pages = [
      {
        id: 'simple',
        url: 'simple',
        name: 'simple',
      },
    ]

    return {
      pages,
    }
  },
})
</script>

<style scoped></style>
