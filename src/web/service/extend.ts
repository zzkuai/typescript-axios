import axios from '@/axios'

interface ResponseData<T = any> {
  code: number
  message: string
  data: T
}

export interface User {
  name: string
  age: number
}

export function getUser<T>() {
  return axios<ResponseData<T>>('/api/extend/user', {
    method: 'post',
    data: {
      msg: 'hello',
    },
  }).then((res) => res.data)
}
