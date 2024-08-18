/*
 * @Date: 2023-12-26 20:14:47
 * @Description: Modify here please
 */
export interface ImgCaptchaProps {
  /** 验证码长度 */
  size?: number;
  /** 默认canvas宽度 */
  width?: number;
  /** 默认canvas高度 */
  height?: number;
  /** 图形验证码默认类型 blend: 数字字母混合类型 number:纯数字 letter:纯字母 */
  type?: "blend" | "number" | "letter";
  /** 自定义类名 */
  className?: string;
}
