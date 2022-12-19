import './style.scss';

import ReactDOM from 'react-dom';

import AppLoadingIndicator from './';

interface ILoadingManager {
  show(): void;
}
let shouldLoading = true;

export class LoadingManager implements ILoadingManager {
  private containerRef: any;
  private isLoading = false;
  private disabled = false;
  private body = document?.getElementsByTagName('body')[0] as HTMLBodyElement;

  constructor() {}

  public setDisabled(value) {
    this.disabled = value;
    this.render();
  }

  private setupContainer() {
    if (this.containerRef) {
      return;
    }
    const loadingContainer = document?.createElement('div') as HTMLDivElement;
    loadingContainer.className = 'loading-container-main';
    this.body.insertAdjacentElement('beforeend', loadingContainer);
    this.containerRef = loadingContainer;
  }

  show(): void {
    this.setupContainer();
    this.isLoading = true;
    this.render();
    this.body.classList.add('overflow-hidden');
  }

  public destroy(): void {
    this.isLoading = false;
    this.render();
    this.body.classList.remove('overflow-hidden');
  }

  private render(): void {
    ReactDOM.render(
      <AppLoadingIndicator show={!this.disabled && this.isLoading} />,
      this.containerRef,
    );
  }
}

export const loading = new LoadingManager();
