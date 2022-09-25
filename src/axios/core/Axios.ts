import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  RejectedFn,
  ResolvedFn,
} from '../types';
import dispatchRequest from './dispatchRequest';
import InterceptorManager from './InterceptorManager';
import mergeConfig from './mergeConfig';

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>;
  response: InterceptorManager<AxiosResponse>;
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise);
  rejected?: RejectedFn;
}

export default class Axios {
  defaults: AxiosRequestConfig;
  interceptors: Interceptors;

  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig;
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>(),
    };
  }

  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {};
      }
      config.url = url;
    } else {
      config = url;
    }

    config = mergeConfig(this.defaults, config);

    // 拦截器 promise 调用链
    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined,
      },
    ];

    // 请求拦截器 先添加 后执行
    this.interceptors.request.forEach((interceptor) => {
      chain.unshift(interceptor);
    });

    // 响应拦截器 先添加先执行
    this.interceptors.response.forEach((interceptor) => {
      chain.push(interceptor);
    });

    let promise = Promise.resolve(config);

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!;
      promise = promise.then(resolved, rejected);
    }

    return promise;
  }

  private _requestMethodWithoutData(
    method: Method,
    url: string,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request({
      ...(config || {}),
      method,
      url,
    });
  }
  private _requestMethodWithData(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request({
      ...(config || {}),
      method,
      url,
      data,
    });
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config);
  }
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config);
  }
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config);
  }
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config);
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config);
  }
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config);
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config);
  }
}
