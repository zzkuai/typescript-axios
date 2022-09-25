<template>
  <div>error</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import axios, { AxiosError } from '@/axios';

export default defineComponent({
  name: 'Error',
  setup() {
    onMounted(() => {
      axios({
        url: '/api/error1',
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      axios({
        url: '/api/error',
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      // offline
      setTimeout(() => {
        axios({
          url: '/api/error',
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }, 5000);

      axios({
        method: 'get',
        url: '/api/error/timeout',
        timeout: 2000,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((e: AxiosError) => {
          console.log(e.message);
          console.log(e.config);
          console.log(e.code);
          console.log(e.request);
          console.log(e.isAxiosError);
        });
    });

    return {};
  },
});
</script>
