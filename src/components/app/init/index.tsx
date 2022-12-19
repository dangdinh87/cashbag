import React, { useEffect } from 'react';
import { connect, Dispatch, Loading } from 'umi';

interface Props {
  dispatch: Dispatch;
  loading: Loading;
}
const AppInitializer: React.FC<Props> = ({ dispatch, loading, children }) => {
  // useEffect(() => {
  //   dispatch({
  //     type: 'mainState/initApp',
  //   });
  // }, []);

  // if (loading.effects['mainState/initApp']) {
  //   return <></>;
  // }

  return <>{children}</>;
};
export default connect(({ mainState, loading }: any) => ({
  loading,
  mainState,
}))(AppInitializer);
