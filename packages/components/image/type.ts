/*
 * @Date: 2023-12-25 17:48:08
 * @Description: Modify here please
 */
export type ImageProps = {
  /** 图片地址 */
  src: string;
  /** 图片备用文本描述 */
  alt?: string;
  /** 是否是a链接图片 */
  linkUrl?: string;
  /** 图片宽度 */
  width?: string | number;
  /** 图片高度  */
  height?: string | number;
  /** 是否需要懒加载功能， 如果开启了这个，我们建议传递一个宽度，高度进来。因为占位节点需要 */
  lazy?: boolean;
  /** preview是否可以预览 */
  preview?: boolean;
  /** 语义化结构className */
  className?: string;
  /** 语义化结构styles */
  styles?: React.CSSProperties;
  /** 同原生 object-fit */
  fit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  /** 加载失败时的自定义节点 */
  errorNode?: React.ReactNode;
  /** 当图像尚未加载时，自定义的占位符内容 */
  placeholderNode?: React.ReactNode;
  /** 图标加载失败的回调 */
  onError?: (e: Event) => void;
};
