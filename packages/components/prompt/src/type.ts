/* eslint-disable no-unused-vars */
/*
 * @Date: 2023-11-29 10:23:51
 * @Description: Modify here please
 */

export type IPrompEmits = {
  /**
   * 点击遮罩层或右上角叉或取消按钮的回调-- type的值描述
   * 1. notBtn非按钮关闭，如点击了右上角图标，点击了蒙层
   * 2. cancel: 点击了取消按钮
   */
  (e: "cancel", { type }: { type: "notBtn" | "cancel" }): void;
  (e: "ok"): void;
  (e: "update:open", value: boolean): void;
};

export interface IPromptProps {
  /** 内容 */
  content?: string;
  /** 标题 */
  title?: string;
  /** 确认按钮的文字 */
  okText?: string;
  /** 取消按钮的文字 */
  cancelText?: string;
  /** 是否显示 标题的 icon图标 */
  showIcon?: boolean;
  /** 是否显示关闭按钮 */
  showClose?: boolean;
  /** 是否显示关闭按钮 */
  width?: string | number;
  /** 打开弹窗 */
  open?: boolean;
}
