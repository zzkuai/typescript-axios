<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from '@/axios'

export default defineComponent({
  setup() {
    axios.interceptors.request.use((config) => {
      config.headers['number'] += '1'
      return config
    })

    axios.interceptors.request.use(
      (config) => {
        config.headers['number'] += '2'
        return config
      },
      (error) => {
        console.log('error', error)
      }
    )

    axios.interceptors.request.use((config) => {
      config.headers['number'] += '3'
      return config
    })

    axios.interceptors.response.use((res) => {
      res.data.number += '1'
      return res
    })

    const id = axios.interceptors.response.use((res) => {
      res.data.number += '2'
      return res
    })

    axios.interceptors.response.use((res) => {
      res.data.number += '3'
      return res
    })

    axios.interceptors.response.eject(id)

    axios
      .get('/api/interceptor', {
        headers: {
          number: '',
        },
      })
      .then((res) => {
        console.log('res', res.data)
      })

    return {}
  },
})
</script>

<style scoped></style>
