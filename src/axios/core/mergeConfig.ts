import { isPlainObject, deepMerge } from '../helpers/util';
import { AxiosRequestConfig } from '../types';

// 合并策略
const strats = Object.create(null);

function defaultStrat(val1: any, val2: any): any {
  return typeof val2 === 'undefined' ? val1 : val2;
}
function formVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2;
  }
}
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2);
  } else if (typeof val2 !== 'undefined') {
    return val2;
  } else if (isPlainObject(val1)) {
    return deepMerge(val1);
  } else if (typeof val1 !== 'undefined') {
    return val1;
  }
}

const stratKeysFromVal2 = ['url', 'params', 'data'];
stratKeysFromVal2.forEach((key) => {
  strats[key] = formVal2Strat;
});

const stratKeysDeepMerge = ['headers'];
stratKeysDeepMerge.forEach((key) => {
  strats[key] = deepMergeStrat;
});

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
) {
  if (!config2) {
    config2 = {};
  }

  const config = Object.create(null);

  for (let key in config2) {
    mergeField(key);
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key);
    }
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat;
    config[key] = strat(config1[key], config2![key]);
  }

  return config;
}
