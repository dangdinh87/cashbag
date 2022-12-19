import { useEffect } from 'react';

import { helper } from '@/utils';

function scrollToTop() {
  helper.getWindow()?.scrollTo({ top: 0, behavior: 'auto' });
}
export interface Props {
  trigger?: any;
}
const ScrollToTopOnMount: React.FC<Props> = ({ trigger, children }) => {
  useEffect(() => {
    scrollToTop();
    return () => {
      scrollToTop();
    };
  }, [trigger]);

  return <>{children}</>;
};

export default ScrollToTopOnMount;
