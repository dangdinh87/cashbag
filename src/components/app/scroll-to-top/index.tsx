import { useEffect } from 'react';

import { helper } from '@/utils';

function scrollToTop() {
  helper.getWindow()?.scrollTo({ top: 0, behavior: 'auto' });
}
export interface Props {
  trigger?: any;
  isException?: boolean;
}
const ScrollToTopOnMount: React.FC<Props> = ({
  trigger,
  children,
  isException,
}) => {
  if (isException) return <>{children}</>;

  useEffect(() => {
    scrollToTop();
    return () => {
      scrollToTop();
    };
  }, [trigger]);

  return <>{children}</>;
};

export default ScrollToTopOnMount;
