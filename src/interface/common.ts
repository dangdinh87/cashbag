import { CSSProperties } from 'react';
import { Loading, getDvaApp } from 'umi';

export interface CommonProps {
  ref?: any;
  style?: CSSProperties;
  className?: string;
  loading?: boolean | Loading;
}

export type Response<V, K extends string = 'data'> = {
  data?: {
    [Key in K]: V;
  };
  status?: string;
  message?: string;
  code?: number;
};

export type RootState = ReturnType<typeof getDvaApp>;

export interface Photo {
  _id: string;
  name: string;
  sizes: Sizes;
}

interface Sizes {
  sm: Sm;
  md: Sm;
}

interface Sm {
  width: number;
  height: number;
  url: string;
}
