import { useEffect } from "react";
import { useDebounce } from "./useDebounce";

export type OptBtnType = {
  btnValue: boolean;
  setBtnValue: React.Dispatch<React.SetStateAction<boolean>>;
  useToggleBtnMutation: any;
  btnDependencies: any;
  useLazyIsBtnActiveQuery: any;
  debounceTime?: number;
};

// make button optimistic
export function useOptimisticButton({
  btnValue,
  setBtnValue,
  useToggleBtnMutation,
  btnDependencies,
  useLazyIsBtnActiveQuery,
  debounceTime = 300,
}: OptBtnType) {
  const [toggleBtn, { isError: toggleBtnError }] = useToggleBtnMutation();
  const [getIsActive, { data: isActiveData, isError: isActiveError, status: isActiveStatus }] =
    useLazyIsBtnActiveQuery();
  const triggerBtn = useDebounce({
    debounce: () => {
      if (!btnDependencies) return;
      toggleBtn(btnDependencies);
    },
    instantCallback: () => setBtnValue(!btnValue),
    delay: debounceTime,
  });
  useEffect(() => {
    if (isActiveStatus !== "fulfilled") return;
    if (isActiveData?.active) {
      setBtnValue(true);
    } else {
      setBtnValue(false);
    }
  }, [isActiveStatus]);

  useEffect(() => {
    setBtnValue(false);
  }, [isActiveError]);

  useEffect(() => {
   setBtnValue(false);
  }, [toggleBtnError]);

  useEffect(() => {
    if (!btnDependencies) return;
    getIsActive(btnDependencies);
  }, [btnDependencies]);

  return triggerBtn;
}
