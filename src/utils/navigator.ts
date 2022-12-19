import { LocationDescriptorObject } from 'history-with-query';
import { history, isBrowser } from 'umi';

const defaultState = { prev: location.pathname };

function pushPath(path: string, state?: any): void {
  if (!isBrowser()) {
    return;
  }
  history.push(path, { ...defaultState, ...state });
}

function pushLocation(location: LocationDescriptorObject): void {
  if (!isBrowser()) {
    return;
  }
  const statedLocation = {
    ...location,
    state: { ...defaultState, ...location.state },
  };
  history.push(statedLocation);
}

function replacePath(path: string, state?: any): void {
  if (!isBrowser()) {
    return;
  }
  history.replace(path, { ...defaultState, ...state });
}

function replaceLocation(location: LocationDescriptorObject): void {
  if (!isBrowser()) {
    return;
  }
  const statedLocation = {
    ...location,
    state: { ...defaultState, ...location.state },
  };
  history.replace(statedLocation);
}

const goBack = () => {
  if (!isBrowser()) {
    return;
  }
  const prev = history.location.state?.['prev'];
  if (prev) {
    history.goBack();
    return;
  }
  pushPath('/home');
};

function redirectLogin() {
  if (!isBrowser()) {
    return;
  }
  pushLocation({
    pathname: '/login-social',
    // query: { redirect: window.location.href },
  });
}

export default {
  pushPath,
  pushLocation,
  goBack,
  redirectLogin,
  replacePath,
  replaceLocation,
  defaultState,
};
