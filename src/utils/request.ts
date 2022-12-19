import { ApiConst } from '@/configs';
import { request } from 'umi';

import storage from './storage';

export interface RequestOptions {
  method?: string;
  query?: string;
  body?: any;
  file?: any;
  headers?: any;
}

interface Response {
  data?: any;
  err?: any;
}

const timeout = 30000; // 30s

const isTimeoutErr = (err: Error): boolean => {
  return err.toString() === `RequestError: timeout of ${timeout}ms exceeded`;
};

async function getDefaultOption(options: any) {
  const headers = ApiConst.getDefaultHeader();

  let result: any = {
    // ['os-name']: headers.osName,
    // ['os-version']: headers.osVersion,
    // PLATFORM: headers.platform,
    // ['DEVICE-TYPE']: headers.deviceType,
    // ['BROWSER-NAME']: headers.browserName,
    // ['BROWSER-VERSION']: headers.browserVersion,
    // ['App-Version']: headers.appVersion,
    // ['App-Version-Code']: headers.appVersionCode,
    // ...headers,
    ...options.headers,
  };
  const { authToken } = await storage.getUserToken();
  console.log(authToken)
  if (authToken) {
    result = { ...result, Authorization: `Bearer ${authToken}` };
  }
  if (options.version) {
    result = { ...result, Version: options.version };
  }
  return result;
}

/**
 * Request to server
 *
 * @param url request url
 * @param options contain method or query
 * @param type request type
 */
async function call(url: any, options: any, type?: any) {
  const requestEndpoint = type || process.env.API_ENDPOINT;
  const endpointUrl = requestEndpoint + url;
  const headers = await getDefaultOption(options);
  options = { ...options, headers };
  const requestRes = await request(endpointUrl, options);
  return requestRes;
}

export default {
  call,
  isTimeoutErr,
};
