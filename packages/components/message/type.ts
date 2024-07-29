import type { MutableRefObject } from "react";

export type MessageRef = {
  bottom: number;
  close: () => void;
};

export interface MessageHandler {
  close: () => void;
}

export type MessageContext = {
  id: string;
  handler: MessageHandler;
};

export interface IMessageProps {
  /** 消息类型 */
  type: "info" | "success" | "warning" | "error";
  /** 信息文本 */
  message: string | null;
  /** 自动关闭的延时，单位秒。设为 0 时不自动关闭 */
  duration?: number;
  /** 是否将 message 属性作为 HTML 片段处理 */
  isHtml?: boolean;
  /** 节点ID */
  id?: string;
  /** 是否显示关闭按钮 */
  showClose?: boolean;
  /** 自定义图标组件，覆盖`type` */
  icon?: React.ReactNode;
  /** 层级 */
  zIndex?: number;
  /** 距离窗口顶部的偏移量 */
  offset?: number;
  /** 关闭时将触发onClose事件 */
  onClose?: () => void;
  /** 退出之后触发 */
  /** */
}
