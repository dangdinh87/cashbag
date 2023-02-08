import AppBottomSheet from '@/components/app/app-bottom-sheet';
import { createContext, useContext, useEffect, useState } from 'react';

const BottomSheetContext = createContext({});

export function useBottomSheet() {
  return useContext(BottomSheetContext);
}

export function BottomSheetWrap({ children }) {
  const [data, setData] = useState<any>();
  const [visible, setVisible] = useState<any>(false);

  useEffect(() => {
    setVisible(data?.visible);
  }, [data?.visible]);

  const handleBottomSheet = (data: any) => {
    setData(data);
  };

  return (
    <BottomSheetContext.Provider value={{ handleBottomSheet }}>
      {children}
      <AppBottomSheet
        visible={visible}
        onClose={() => {
          setVisible(false);
          data?.onCLose?.();
        }}
        title={data?.title}
        closeBtn={data?.closeBtn}
        bodyClass={data?.bodyClass}
        {...data}
      >
        {data?.content}
      </AppBottomSheet>
    </BottomSheetContext.Provider>
  );
}
