import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/header'
import { buildURL } from './helpers/url'
import { AxiosRequestConfig } from './types'
import xhr from './xhr'

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config

  return buildURL(url, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config

  return processHeaders(headers, data)
}

function axios(config: AxiosRequestConfig): void {
  processConfig(config)

  xhr(config)
}

export default axios
