import { LocationDescriptorObject } from 'history-with-query';
import { history, isBrowser } from 'umi';

const defaultState = { prev: location.pathname };

function pushPath(path: string, state?): void {
  if (!isBrowser()) {
    return;
  }
  history.push(path, { prev: location.pathname, ...state });
}

function pushLocation(location: LocationDescriptorObject): void {
  if (!isBrowser()) {
    return;
  }
  const statedLocation = {
    ...location,
    state: { prev: location.pathname, ...location.state },
  };
  history.push(statedLocation);
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

export default {
  pushPath,
  pushLocation,
  goBack,
  replacePath,
  replaceLocation,
  defaultState,
};
