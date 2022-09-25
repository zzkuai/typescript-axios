<template>
  <div>xsrf</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from '@/axios';

const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D',
});

export default defineComponent({
  setup() {
    instance
      .post(
        'http://localhost:3000/xsrf',
        {
          a: 1,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });

    instance
      .get('http://localhost:3000/xsrf', {
        a: 1,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });

    return {};
  },
});
</script>
