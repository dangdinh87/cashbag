import React from 'react';
import { Image, ImageProps } from 'react-bootstrap';

import { AssetConst } from '@/configs';

interface Props extends ImageProps {
  handleError?: boolean;
  placeholder?: any;
}
const AppImage: React.FC<Props> = (props) => {
  const { handleError = true, placeholder = AssetConst.bg.bgDefault } = props;
  return (
    <Image
      {...props}
      loading="lazy"
      onError={(e: any) => {
        if (!handleError) {
          return;
        }
        e.target.src = placeholder;
      }}
    />
  );
};
export default AppImage;
