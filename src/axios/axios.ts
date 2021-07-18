import Axios from './core/Axios'
import defaults from './defaults'
import { extend } from './helpers/util'
import { AxiosRequestConfig, AxiosStatic } from './types'
import mergeConfig from './core/mergeConfig'

function createAxiosInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createAxiosInstance(defaults)

axios.create = function create(config) {
  return createAxiosInstance(mergeConfig(defaults, config))
}

export default axios
