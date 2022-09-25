<template>
  <ul>
    <li v-for="page in pages" :key="page.id">
      <router-link :to="page.url">{{ page.name }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  setup() {
    const pages = [
      {
        id: 'simple',
        url: 'simple',
        name: 'simple',
      },
      {
        id: 'base',
        url: 'base',
        name: 'base',
      },
      {
        id: 'error',
        url: 'error',
        name: 'error',
      },
      {
        id: 'extend',
        url: 'extend',
        name: 'extend',
      },
      {
        id: 'interceptor',
        url: 'interceptor',
        name: 'interceptor',
      },
      {
        id: 'config',
        url: 'config',
        name: 'config',
      },
      {
        id: 'cancel',
        url: 'cancel',
        name: 'cancel',
      },
      {
        id: 'withCredentials',
        url: 'withCredentials',
        name: 'withCredentials',
      },
    ];

    return {
      pages,
    };
  },
});
</script>
