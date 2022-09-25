<template>
  <div></div>
</template>

<script lang="ts">
import axios, { AxiosTransformer } from '@/axios';
import qs from 'qs';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    axios.defaults.headers.common['test2'] = 123;
    axios({
      url: '/api/config',
      method: 'post',
      data: qs.stringify({
        a: 1,
      }),
      headers: {
        test: 321,
      },
    });

    axios({
      transformRequest: [
        function (data) {
          // return qs.stringify(data)
          return data;
        },
        ...(axios.defaults.transformRequest as AxiosTransformer[]),
      ],
      transformResponse: [
        ...(axios.defaults.transformResponse as AxiosTransformer[]),
        function (data, headers) {
          console.log('headers', headers);

          if (typeof data === 'object') {
            data.b = 2;
          }
          return data;
        },
      ],

      url: '/api/config/transform',
      method: 'post',
      data: {
        a: 1,
      },
    }).then((res) => {
      console.log(res.data);
    });

    const instance = axios.create({
      timeout: 1000,
    });
    instance.defaults.headers.common['instance'] = '123';
    instance({
      url: '/api/config',
      method: 'post',
    });

    return {};
  },
});
</script>

<style scoped></style>
