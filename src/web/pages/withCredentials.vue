<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from '@/axios';

export default defineComponent({
  setup() {
    // document.cookie = 'a=b'

    axios.get('http://localhost:3000/test', {}).then((res) => {
      console.log(res);
    });

    axios
      .post(
        'http://localhost:3000/demo',
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

    return {};
  },
});
</script>
