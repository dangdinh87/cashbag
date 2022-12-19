import React, { useRef } from 'react';
import { Spinner } from 'react-bootstrap';

interface Props {
  loading?: boolean;
  onLoadMore: () => void;
  shouldLoadMore: boolean;
}
const Component: React.FC<Props> = ({
  loading,
  shouldLoadMore,
  onLoadMore,
  children,
}) => {
  const observer = useRef<any>();
  const lastItemRef = (node: any) => {
    if (loading || !shouldLoadMore) return;
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        onLoadMore?.();
      }
    });
    if (node) observer.current.observe(node);
  };

  return (
    <>
      {children}
      <div ref={lastItemRef} />
      {shouldLoadMore && (
        <div className="w-100 mt-2 text-center">
          {(shouldLoadMore || loading) && <Spinner animation="border" />}
        </div>
      )}
    </>
  );
};
export default Component;
