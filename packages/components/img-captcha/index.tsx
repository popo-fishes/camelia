/*
 * @Date: 2024-08-18 14:45:00
 * @Description:图片验证码
 */
import React, { useContext, useMemo, useImperativeHandle } from "react";
import classNames from "classnames";
import { ConfigContext } from "../config-provider";
import { useNamespace } from "@camelia/core/hooks";
import { useMount, isClient } from "@camelia/shared";

import { ImgCaptchaProps } from "./type";
import { useCaptcha, generateRandomId } from "./useCaptcha";

const ImgCaptcha = React.forwardRef<{ validate: (v: string) => boolean }, ImgCaptchaProps>((props, ref) => {
  const { width = 95, height = 38, size = 4, type = "number", className } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const ns = useNamespace("img-captcha", getPrefixCls());
  const nodeId = useMemo(() => "imgCaptcha" + generateRandomId(), []);

  const { imgCaptchaCode, refresh, init } = useCaptcha(
    {
      width: width,
      height: height,
      size: size,
      type: type
    },
    nodeId
  );

  const style = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    if (width) {
      style[`width`] = typeof width == "string" ? width : `${width}px`;
    }
    if (height) {
      style[`height`] = typeof height == "string" ? height : `${height}px`;
    }
    return style;
  }, [width, height]);

  useMount(() => {
    if (isClient) {
      init();
      refresh();
    }
  });

  const validate = (code: string) => {
    let codeState: boolean = false;

    const vcode = code?.toLowerCase();
    if (!imgCaptchaCode.current || !vcode) return false;

    const lcode = imgCaptchaCode.current.toLowerCase();

    if (vcode == lcode) {
      codeState = true;
    } else {
      codeState = false;
    }
    return codeState;
  };

  useImperativeHandle(ref, () => ({
    validate
  }));

  return (
    <>
      <div id={nodeId} className={classNames(ns.b(), className)} style={style} />
    </>
  );
});

export type { ImgCaptchaProps };

export default ImgCaptcha;
