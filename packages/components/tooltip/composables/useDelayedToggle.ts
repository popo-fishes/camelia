/*
 * @Date: 2024-08-25 12:37:53
 * @Description: Modify here please
 */
import { useUnmount } from "@camelia/shared";

type UseDelayedToggleProps = {
  open: (event?: Event) => void;
  close: (event?: Event) => void;
  hideAfterTime?: number;
  showAfterTime?: number;
};

const usePopupTimeout = () => {
  let timeoutHandle: number;

  const registerTimeout = (fn: (...args: any[]) => any, delay: number) => {
    // Clear the timer first
    cancelTimeout();
    timeoutHandle = window.setTimeout(fn, delay);
  };
  const cancelTimeout = () => window.clearTimeout(timeoutHandle);

  // This callback function is called when the relevant effect scope stops.
  useUnmount(() => cancelTimeout());

  return {
    registerTimeout,
    cancelTimeout
  };
};

export const useDelayedToggle = ({ open, close, hideAfterTime, showAfterTime }: UseDelayedToggleProps) => {
  const { registerTimeout } = usePopupTimeout();

  const options = { showAfterTime: showAfterTime ?? 100, hideAfterTime: hideAfterTime ?? 100 };
  // 主动打开
  const onOpen = (time?: number) => {
    if (time == 0) {
      open();
    } else {
      registerTimeout(() => {
        open();
      }, time || options.showAfterTime);
    }
  };
  // 主动关闭，你可以传递一个time来覆盖hideAfterTime，因为有时候你想立马结束关闭弹窗
  const onClose = (time?: number) => {
    if (time == 0) {
      close();
    } else {
      registerTimeout(() => {
        close();
      }, time || options.hideAfterTime);
    }
  };

  return {
    onOpen,
    onClose
  };
};
