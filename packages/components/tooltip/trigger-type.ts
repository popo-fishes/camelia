/*
 * @Date: 2023-12-19 20:08:34
 * @Description: Modify here please
 */
export interface ITooltipTriggerProps {
  /** !!! This is a trigger node, which does not need to be passed because it can be passed after the virtual node */
  children?: React.ReactNode;
  /** trigger */
  trigger?: "hover" | "click";
  /** Used to identify whether virtual triggering is enabled */
  virtualTriggering?: boolean;
  /** Identify the triggering elements during virtual triggering */
  virtualRef?: React.MutableRefObject<HTMLElement | null | undefined>;
  onMouseEnter?: (e: any) => void;
  onMouseLeave?: (e: any) => void;
  onClick?: (e: any) => void;
}
