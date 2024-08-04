/*
 * @Date: 2024-08-03 14:39:49
 * @Description: Modify here please
 */
import React, { useContext, useMemo, useState, useRef } from "react";
import classNames from "classnames";
import { ConfigContext } from "../config-provider";
import { useNamespace } from "@fish-remix/hooks";
import { useMount, useUnmount } from "@fish-remix/shared";
import { Picture, CanSee } from "fish-icons";

import Visible from "../_internal/visible";
import { ImageProps } from "./type";

let imgObserver: any;
let imgLzytimer: any;

const Image: React.FC<ImageProps> = (props) => {
  const { preview = false, className, errorNode, placeholderNode, alt, fit, linkUrl, styles } = props;

  const { getPrefixCls } = useContext(ConfigContext);

  const ns = useNamespace("image", getPrefixCls());

  const imgDom = useRef<HTMLDivElement>();
  const [load, setLoad] = useState<boolean>(false);
  const [hasLoadError, setHasLoadError] = useState<boolean>(false);

  // 图片外层样式
  const imgWrapStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    if (props.height) {
      style[`height`] = typeof props.height == "string" ? props.height : `${props.height}px`;
    }
    if (props.width) {
      style[`width`] = typeof props.width == "string" ? props.width : `${props.width}px`;
    }
    return style;
  }, [props.height, props.width]);

  // 图片地址
  const imgSrc = useMemo(() => {
    // load加载成功 或者 没开启懒加载也直接返回
    if (load || !props.lazy) return props.src;
    return "";
  }, [load, props?.lazy, props.src]);

  // 是否显示img
  const hasImg = useMemo(() => {
    // load加载成功 或者 没开启懒加载也直接返回
    if (load || !props.lazy) return true;
    return false;
  }, [load, props.lazy]);

  const ObserverView = (fn: Function) => {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver
    const observer = new IntersectionObserver((entrys) => entrys.forEach((entry) => fn(entry)), {
      rootMargin: "0px",
      threshold: 0
    });
    return observer;
  };

  useMount(() => {
    if (!props?.src) {
      setHasLoadError(true);
    }

    // 需要懒加载
    if (props?.lazy) {
      imgObserver = ObserverView((entry: any) => {
        if (entry.isIntersecting) {
          const img = document.createElement("img");
          img.src = props.src;
          img.onload = () => {
            imgLzytimer = setTimeout(() => {
              setLoad(true);
            }, 200);
          };
          img.onerror = () => {
            setHasLoadError(true);
            setLoad(false);
          };
          // 当内容可见
          imgObserver?.unobserve?.(imgDom.current);
          imgObserver = null;
        }
      });
      imgObserver.observe(imgDom.current); // 观察
    }
  });

  useUnmount(() => {
    if (imgObserver && imgDom.current) {
      imgObserver.unobserve?.(imgDom.current);
    }
    imgLzytimer && clearTimeout(imgLzytimer);
  });

  // 点击预览
  const clickHandler = () => {
    console.log(111);
  };

  const handleError = (event) => {
    setHasLoadError(true);
    props.onError?.(event);
  };

  const handleLoad = () => {
    setHasLoadError(false);
  };

  const ImgNode = (
    <img
      src={imgSrc}
      className={ns.e("inner")}
      alt={alt}
      style={fit ? { objectFit: fit } : null}
      onLoad={handleLoad}
      onError={handleError}
    />
  );

  return (
    <div ref={imgDom} className={classNames(ns.b(), className)} style={{ ...imgWrapStyle, ...styles }}>
      <Visible visible={hasLoadError}>
        {errorNode || (
          <div className={ns.e("error")}>
            <Picture size="30px" />
          </div>
        )}
      </Visible>
      <Visible visible={!hasLoadError}>
        <Visible visible={hasImg}>
          <Visible visible={!!linkUrl}>
            <a href={linkUrl} target="_blank">
              {ImgNode}
            </a>
          </Visible>
          <Visible visible={!linkUrl}>{ImgNode}</Visible>
        </Visible>
        {/* placeholder占位 */}
        <Visible visible={!hasImg}>
          <div className={ns.e("placeholder")}>{placeholderNode}</div>
        </Visible>
      </Visible>
      {/* 预览按钮蒙层 */}
      <Visible visible={preview}>
        <div className={ns.e("preview")}>
          <div className="inner-wrap">
            <CanSee className="icon-cansee" />
            预览
          </div>
        </div>
      </Visible>
    </div>
  );
};

export default Image;
