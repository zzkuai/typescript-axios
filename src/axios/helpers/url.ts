import { isDate, isPlainObject } from './util';

interface URLOrigin {
  protocol: string;
  host: string;
}

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}

export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url;
  }

  const parts: string[] = [];

  Object.keys(params).forEach((key) => {
    const val = params[key];

    if (val === null || typeof val === 'undefined') {
      return;
    }

    let values: any[] = [];
    if (Array.isArray(val)) {
      values = val;
      key += '[]';
    } else {
      values = [val];
    }

    values.forEach((v) => {
      if (isDate(v)) {
        v = v.toISOString();
      } else if (isPlainObject(v)) {
        v = JSON.stringify(v);
      }

      parts.push(`${encode(key)}=${encode(v)}`);
    });
  });

  let serializedParams = parts.join('&');

  if (serializedParams) {
    const markIndex = url.indexOf('#');
    if (markIndex !== -1) {
      url = url.slice(0, markIndex);
    }
    url += (url.includes('?') ? '&' : '?') + serializedParams;
  }

  return url;
}

// 同源判断
export function isURLSameOrigin(requestURL: string): boolean {
  const parsedOrigin = resolveURL(requestURL);
  return (
    parsedOrigin.protocol === currentOrigin.protocol &&
    parsedOrigin.host === currentOrigin.host
  );
}

const urlParsingNode = document.createElement('a');
const currentOrigin = resolveURL(window.location.href);

// 通过 a 标签获取链接的 协议和主机名
function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url);
  const { protocol, host } = urlParsingNode;
  return { protocol, host };
}
