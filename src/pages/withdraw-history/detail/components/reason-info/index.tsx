import React from 'react';
import { useIntl } from 'umi';

interface Props {
  withdrawDetail: IWithdraw;
}
const ReasonInfo: React.FC<Props> = ({ withdrawDetail }) => {
  const { formatMessage } = useIntl();
  return (
    <p className="fs-7">
      <b>{'Lý do'}</b>: <span>{withdrawDetail.rejectedReason}</span>
    </p>
  );
};
export default ReasonInfo;
