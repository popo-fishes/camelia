/*
 * @Date: 2023-12-19 12:25:31
 * @Description: Modify here please
 */
import type { IPopperWrapProps } from "./wrap-type";
import type { IPopperTriggerProps } from "./trigger-type";
import type { IPopperContentProps } from "./content-type";

export interface IPopperProps extends IPopperWrapProps, IPopperTriggerProps, IPopperContentProps {
  /** 主动控制，不在受trigger的值影响 */
  visible?: boolean | null;
  /** 消失的延迟，以毫秒为单位 */
  hideAfterTime?: number;
  /** 出现延迟，以毫秒为单位 */
  showAfterTime?: number;
}
