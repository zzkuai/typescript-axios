import { falttenHeaders } from '../helpers/header';
import { buildURL } from '../helpers/url';
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types';
import transform from './transform';
import xhr from './xhr';

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config);
  config.data = transform(config.data, config.headers, config.transformRequest);
  config.headers = falttenHeaders(config.headers, config.method!);
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config;

  return buildURL(url!, params);
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse);
  return res;
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

export default function dispatchRequest(
  config: AxiosRequestConfig
): AxiosPromise {
  throwIfCancellationRequested(config);
  processConfig(config);

  return xhr(config).then((res) => {
    return transformResponseData(res);
  });
}
