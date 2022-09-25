import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types';
import { parseHeaders } from '../helpers/header';
import { createAxiosError } from '../helpers/error';

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      url,
      method = 'get',
      timeout,
      data = null,
      headers,
      responseType,
      cancelToken,
      withCredentials,
    } = config;

    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }

    if (timeout) {
      request.timeout = timeout;
    }

    if (withCredentials) {
      request.withCredentials = withCredentials;
    }

    request.open(method.toUpperCase(), url!, true);

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 0) {
        // 网络错误 / 超时错误
        return;
      }

      const responseHeaders = request.getAllResponseHeaders();
      const responseData =
        responseType !== 'text' ? request.response : request.responseText;
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        headers: parseHeaders(responseHeaders),
        statusText: request.statusText,
        config,
        request,
      };

      handleResponse(response);
    };

    request.onerror = function handleError() {
      reject(createAxiosError('Network Error', config, null, request));
    };

    request.ontimeout = function handleTimeout() {
      reject(
        createAxiosError(
          `Timeout of ${timeout} ms exceeded`,
          config,
          'ECONNABORTED',
          request
        )
      );
    };

    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name];
      } else {
        request.setRequestHeader(name, headers[name]);
      }
    });

    if (cancelToken) {
      cancelToken.promise.then((reason) => {
        request.abort();
        reject(reason);
      });
    }

    request.send(data);

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        reject(
          createAxiosError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        );
      }
    }
  });
}
