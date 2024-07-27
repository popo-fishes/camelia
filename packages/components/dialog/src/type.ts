/*
 * @Date: 2023-11-27 14:54:33
 * @Description: 类型文件
 */

/** 蒙层相关 */
export type IOverlayProps = {
  /** 是否需要遮罩层 */
  modal?: boolean;
  /** 默认的zIndex */
  zIndex?: number;
  /** 遮罩的自定义类名 */
  overlayClass?: string | string[] | Record<string, boolean>;
  /** 点击蒙层是否可以关闭 */
  closeOnClickModal?: boolean;
};

/** 弹窗Dialog盒子相关 */
export interface IDialogProps extends IOverlayProps, IDialogContentProps {
  /** 默认给弹窗挂到哪个地方：了解teleport内置组件属性 */
  appendTo?: string;
  /** dialog CSS 中的 margin-top 值，默认为 15vh */
  top?: string;
  /** 对话框的宽度，默认值为 50% */
  width?: string | number;
  /** 是否水平垂直对齐对话框 */
  alignCenter?: boolean;
  /** 打开弹窗 */
  open?: boolean;
  /** 是否在 Dialog 出现时将 body 滚动锁定 */
  lockScroll?: boolean;
  /** 关闭前的回调，会暂停 Dialog 的关闭. 回调函数内执行 done 参数方法的时候才是真正关闭对话框的时候  */
  beforeClose?: (done: (cancel?: boolean) => void) => void;
  /** 弹窗关闭时事件 */
  onClose?: () => void;
}

/** 弹窗内容相关 */
export type IDialogContentProps = {
  /** 是否显示关闭按钮 */
  showClose?: boolean;
  /** 弹窗标题 */
  title?: string;
};
