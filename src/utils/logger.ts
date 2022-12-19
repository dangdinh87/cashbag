import { isBrowser } from 'umi';

function log(message?: any, ...optionalParams: any[]) {
  if (isBrowser()) {
    return;
  }
  console.log(message, ...optionalParams);
}

function error(message?: any, ...optionalParams: any[]) {
  if (isBrowser()) {
    return;
  }
  console.error(message, ...optionalParams);
}

export default {
  log,
  error,
};
