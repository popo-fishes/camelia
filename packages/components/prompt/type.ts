/*
 * @Date: 2023-11-29 10:23:51
 * @Description: Modify here please
 */

export type PromptRef = {
  close: () => void;
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
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  /** body内容 */
  children?: React.ReactNode;
  /** 点击了取消按钮 */
  onCancel?: (e: { type: "notBtn" | "cancel" }) => void;
  /** 点击了确定按钮 */
  onOk?: () => void;
}
