<template>
  <div>base</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import axios from '@/axios'

export default defineComponent({
  name: 'Base',
  setup() {
    onMounted(() => {
      axios({
        method: 'get',
        url: '/api/base',
        params: {
          foo: ['bar', 'baz'],
        },
      })

      axios({
        method: 'get',
        url: '/api/base',
        params: {
          foo: {
            bar: 'baz',
          },
        },
      })

      const date = new Date()

      axios({
        method: 'get',
        url: '/api/base',
        params: {
          date,
        },
      })

      axios({
        method: 'get',
        url: '/api/base',
        params: {
          foo: '@:$, ',
        },
      })

      axios({
        method: 'get',
        url: '/api/base',
        params: {
          foo: 'baz',
          baz: null,
          bar: undefined,
        },
      })

      axios({
        method: 'get',
        url: '/api/base#hash',
        params: {
          foo: 'bar',
        },
      })

      axios({
        method: 'get',
        url: '/api/base?foo=bar',
        params: {
          bar: 'baz',
        },
      })

      axios({
        method: 'post',
        url: '/api/base',
        data: {
          a: 1,
          b: 2,
        },
      })

      axios({
        method: 'post',
        url: '/api/base',
        headers: {
          'content-type': 'application/json',
          // accept: 'application/json,text/plain',
        },
        data: {
          a: 1,
          b: 2,
          c: 3,
        },
      })

      const paramsString = 'q=URLUtils.searchParams&topic=api'
      const searchParams = new URLSearchParams(paramsString)
      axios({
        method: 'post',
        url: '/api/base',
        data: searchParams,
      })

      axios({
        method: 'post',
        url: '/api/base/buffer',
        data: new Int32Array([21, 32]),
      })
    })

    return {}
  },
})
</script>
