import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/header'
import { buildURL } from './helpers/url'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'
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

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config

  return processHeaders(headers, data)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)

  return xhr(config).then((res) => {
    return transformResponseData(res)
  })
}

export default axios
