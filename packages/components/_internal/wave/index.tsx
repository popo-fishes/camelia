/*
 * @Date: 2024-07-28 15:19:45
 * @Description: 波浪效果组件
 */
import React, { useContext, useRef, useState, useImperativeHandle } from "react";
import { ConfigContext } from "../../config-provider";
import { useNamespace } from "@camellia/core/hooks";
import classNames from "classnames";

export interface WaveRef {
  play: () => void;
}

type WaveProps = {};

let animationTimerId: number | null = null;

/** 波浪效果组件 */
const Wave = React.forwardRef<WaveRef, WaveProps>((_, ref) => {
  const { getPrefixCls } = useContext(ConfigContext);

  const ns = useNamespace("base-wave", getPrefixCls());

  const selfRef = useRef<HTMLDivElement | null>(null);
  // 主动控制模式
  const [active, setActive] = useState(false);

  const play = () => {
    if (animationTimerId !== null) {
      window.clearTimeout(animationTimerId);
      setActive(false);
      animationTimerId = null;
    }
    requestAnimationFrame(() => {
      setActive(true);
      animationTimerId = window.setTimeout(() => {
        setActive(false);
        animationTimerId = null;
      }, 1000);
    });
  };

  useImperativeHandle(ref, () => ({
    play
  }));

  return <div ref={selfRef} aria-hidden className={classNames(ns.b(), active && `is-active`)} />;
});

export default Wave;
