import './style.scss';

import { ToastProps } from 'react-bootstrap';
import ReactDOM from 'react-dom';

import AppToast, { ToastOptions, ToastTypes } from './';

interface IToastManager {
  show(message: string): void;
  show(options: ToastOptions): void;
  error(message: string): void;
  error(options: ToastOptions): void;
}

export class ToastManager implements IToastManager {
  private containerRef!: HTMLDivElement;
  private toasts: ToastProps[] = [];

  constructor() {}

  private setupContainer() {
    if (this.containerRef) {
      return;
    }
    const body = document?.getElementsByTagName('body')[0] as HTMLBodyElement;
    const toastContainer = document?.createElement('div') as HTMLDivElement;

    toastContainer.className = 'toast-container-mobile';
    body.insertAdjacentElement('beforeend', toastContainer);
    this.containerRef = toastContainer;
  }

  show(args: string | ToastOptions): void {
    this.setupContainer();
    let newOptions: any = args;
    if (typeof args === 'string') {
      newOptions = { content: args };
    }
    this.toasts = [newOptions, ...this.toasts];
    this.render();
  }

  error(args?: string | ToastOptions): void {
    this.setupContainer();
    let newOptions: any;
    if (typeof args === 'string') {
      newOptions = { content: args, type: ToastTypes.error };
    } else {
      newOptions = { ...newOptions, type: ToastTypes.error };
    }
    this.toasts = [newOptions, ...this.toasts];
    this.render();
  }

  warning(args: string | ToastOptions): void {
    let newOptions: any;
    if (typeof args === 'string') {
      newOptions = { content: args, type: ToastTypes.warning };
    } else {
      newOptions = { ...newOptions, type: ToastTypes.warning };
    }
    this.toasts = [newOptions, ...this.toasts];
    this.render();
  }

  public destroy(id: string): void {
    this.toasts = this.toasts.filter((toast: ToastProps) => toast.id !== id);
    this.render();
  }

  private render(): void {
    const toastsList = this.toasts.map((toastProps: ToastProps, index) => (
      <AppToast
        key={index}
        {...toastProps}
        onClose={() => this.destroy(toastProps?.id)}
      />
    ));
    ReactDOM.render(toastsList, this.containerRef);
  }
}

export const toast = new ToastManager();
