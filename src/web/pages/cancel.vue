<template>
  <div>cancel</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios, { Canceler } from '@/axios';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
let cancel: Canceler;

export default defineComponent({
  setup() {
    axios
      .get('/api/cancel', {
        cancelToken: source.token,
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          console.log('Request Canceled by source.cancel', e.message);
        }
      });

    setTimeout(() => {
      source.cancel('Operation canceled by the user.');

      axios
        .post(
          '/api/cancel',
          { a: 1 },
          {
            cancelToken: source.token,
          }
        )
        .catch((e) => {
          if (axios.isCancel(e)) {
            console.log('post e.message');

            console.log(e.message);
          }
        });
    }, 100);

    axios
      .get('/api/cancel', {
        cancelToken: new CancelToken((c) => {
          cancel = c;
        }),
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          console.log('Request Canceled by new CancelToken');
        }
      });

    setTimeout(() => {
      cancel();
    }, 1500);

    return {};
  },
});
</script>

<style scoped></style>
