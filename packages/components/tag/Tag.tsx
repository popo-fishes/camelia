/*
 * @Date: 2024-08-03 20:51:37
 * @Description: Modify here please
 */
import React, { useContext, useMemo } from "react";
import classNames from "classnames";
import { ConfigContext } from "../config-provider";
import { useNamespace } from "@camelia/core/hooks";
import { Close } from "fish-icons";
import Visible from "../_internal/visible";

import type { ComponentSize } from "@camelia/core";

export interface ITagProps {
  /** 按钮类型 */
  type?: "" | "success" | "warning" | "danger" | "info";
  /** 幽灵属性，使按钮背景透明 */
  effect?: "dark" | "light" | "plain";
  /** 大小 */
  size?: ComponentSize;
  /** Tag 是否为圆形 */
  round?: boolean;
  /** 是否可关闭 */
  closable?: boolean;
  /** 语义化结构className */
  className?: string;
  /** 自定义背景色 */
  color?: string;
  icon?: React.ReactNode;
  /** 内容 */
  children?: React.ReactNode;
  /** 关闭时的回调 */
  onClose?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const Tag: React.FC<ITagProps> = (props) => {
  const { icon, children, closable, type = "", effect = "light", round, size, color, className } = props;
  const { getPrefixCls } = useContext(ConfigContext);

  const ns = useNamespace("tag", getPrefixCls());

  const containerKls = useMemo(() => {
    return [
      ns.b(),
      ns.is("closable", closable),
      ns.m(type),
      ns.m(size),
      ns.m(effect),
      ns.is("round", round),
      ns.is("color", !!color)
    ];
  }, [type, effect, closable, round, size, color]);

  const containerStyle = useMemo(() => {
    return color ? { backgroundColor: color } : {};
  }, [color]);

  // methods
  const handleClose = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    props.onClose?.(event);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    props.onClick?.(event);
  };

  return (
    <span className={classNames(...containerKls, className)} style={containerStyle} onClick={handleClick}>
      {icon}
      <span className={ns.e("content")}>{children}</span>
      <Visible visible={closable}>
        <Close className={ns.e("close")} onClick={handleClose as any} />
      </Visible>
    </span>
  );
};

export default Tag;
