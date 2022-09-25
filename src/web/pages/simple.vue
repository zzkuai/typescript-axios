<template>
  <div>simple</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import axios from '@/axios';

export default defineComponent({
  name: 'Simple',
  setup() {
    onMounted(() => {
      axios({
        url: '/api/simple',
        params: {
          name: 'zzkuai',
        },
      });
    });

    return {};
  },
});
</script>
