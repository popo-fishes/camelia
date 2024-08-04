/*
 * @Date: 2023-11-27 14:54:33
 * @Description: 类型文件
 */

/** 蒙层相关 */
export type IOverlayProps = {
  /** 是否需要遮罩层 */
  mask?: boolean;
  /** 默认的zIndex */
  zIndex?: number;
  /** 遮罩的语义化结构className */
  overlayClass?: string;
  style?: React.CSSProperties;
  /** 点击蒙层是否可以关闭 */
  closeOnClickMask?: boolean;
  /** 内容 */
  children?: React.ReactNode;
  /** 蒙层点击 */
  onClick?: (e: React.SyntheticEvent) => void;
};

/** 弹窗Dialog盒子相关 */
export interface IDialogProps extends IOverlayProps, IDialogContentProps {
  /** 是否开启弹窗 */
  open?: boolean;
  /** dialog CSS 中的 margin-top 值，默认为 15vh */
  top?: string;
  /** 对话框的宽度，默认值为 50% */
  width?: string | number;
  /** 是否水平垂直对齐对话框 */
  alignCenter?: boolean;
  /** 是否在 Dialog 出现时将 body 滚动锁定 */
  lockScroll?: boolean;
  /** 弹窗内容部分，语义化结构className */
  className?: string;
  /** 内容 */
  children?: React.ReactNode;
  /** 关闭时卸载节点 */
  destroyOnClose?: boolean;
  /** 默认给弹窗挂到哪个地方 */
  getContainer?: () => HTMLElement;
  /** 关闭前的回调，会暂停 Dialog 的关闭. 回调函数内执行 done 参数方法的时候才是真正关闭对话框的时候  */
  beforeClose?: (done: (cancel?: boolean) => void) => void;
  /** 点击遮罩层或右上角叉或取消按钮的回调 */
  onClose?: (e: React.SyntheticEvent) => void;
  /** 完全关闭后的回调 */
  afterClose?: () => any;
}

/** 弹窗内容相关 */
export type IDialogContentProps = {
  /** 是否显示关闭按钮 */
  showClose?: boolean;
  /** 弹窗标题 */
  title?: string;
};
