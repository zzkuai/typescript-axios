<template>
  <div>extend</div>
</template>

<script lang="ts">
import axios from '@/axios'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    axios({
      url: '/api/extend',
      method: 'post',
      data: {
        msg: 'hi',
      },
    })

    axios.request({
      url: '/api/extend',
      method: 'post',
      data: {
        msg: 'hello',
      },
    })

    axios.get('/api/extend')

    axios.options('/api/extend')

    axios.delete('/api/extend')

    axios.head('/api/extend')

    axios.post('/api/extend', { msg: 'post' })

    axios.put('/api/extend', { msg: 'put' })

    axios.patch('/api/extend', { msg: 'patch' })

    axios({
      url: '/api/extend',
      method: 'post',
      data: {
        msg: 'hi',
      },
    })

    axios('/api/extend', {
      method: 'post',
      data: {
        msg: 'hello',
      },
    })

    return {}
  },
})
</script>
