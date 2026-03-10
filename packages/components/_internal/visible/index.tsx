/*
 * @Date: 2024-08-03 18:19:48
 * @Description: Modify here please
 */
import React from "react";
import type { PropsWithChildren } from "react";

interface Props {
  /** 是否渲染 */
  visible: boolean | any;
}

/**
 * @name 判断元素是否显示
 */
const Visible = ({ visible, children }: PropsWithChildren<Props>) => (visible ? <>{children}</> : <></>);
export default Visible;
