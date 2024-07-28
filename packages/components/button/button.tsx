/*
 * @Date: 2024-07-27 13:49:35
 * @Description: Modify here please
 */
import React, { useContext, createRef, useRef, useMemo } from "react";
import classNames from "classnames";
import { Loading } from "fish-icons";

import { ConfigContext } from "../config-provider";
import { composeRef } from "@fish-remix/core";
import { useNamespace } from "@fish-remix/hooks";

import BaseWave, { type WaveRef } from "../_internal/wave";

import type { IButtonProps } from "./type";

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, IButtonProps>((props, ref) => {
  const {
    type,
    loading,
    icon,
    children,
    htmlType = "button",
    disabled,
    size,
    plain,
    ghost,
    className,
    isWave = true,
    ...rest
  } = props;

  const { getPrefixCls } = useContext(ConfigContext);

  const ns = useNamespace("button", getPrefixCls());

  const internalRef = createRef<HTMLButtonElement | HTMLAnchorElement>();

  const buttonRef = composeRef(ref, internalRef);

  const waveElRef = useRef<WaveRef | null>(null);

  const classes = classNames(
    ns.b(),
    ns.m(type),
    ns.m(size),
    ns.is("disabled", disabled),
    ns.is("loading", loading),
    ns.is("plain", plain),
    ns.is("ghost", ghost),
    className
  );

  const buttonStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    if (props.width) {
      style[`width`] = typeof props.width == "string" ? props.width : `${props.width}px`;
    }
    return style;
  }, [props]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>): void => {
    const { onClick } = props;
    if (loading || disabled) {
      e.preventDefault();
      return;
    } else {
      waveElRef.current?.play();
    }
    (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e);
  };

  const iconNode = loading ? <Loading className="icon-loading" /> : <>{icon}</>;

  return (
    <button
      {...rest}
      type={htmlType}
      style={buttonStyle}
      className={classes}
      onClick={handleClick}
      disabled={disabled}
      ref={buttonRef as any}
    >
      {iconNode}
      <span className="text">{children}</span>
      {/* 波浪 */}
      {isWave && <BaseWave ref={waveElRef} />}
    </button>
  );
});

export default Button;
