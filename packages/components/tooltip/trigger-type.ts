/*
 * @Date: 2023-12-19 20:08:34
 * @Description: Modify here please
 */
export interface ITooltipTriggerProps {
  children: React.ReactNode;
  /** 触发方式 */
  trigger?: "hover" | "click";
  onMouseEnter?: (e: any) => void;
  onMouseLeave?: (e: any) => void;
  onClick?: (e: any) => void;
}