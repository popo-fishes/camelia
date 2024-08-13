/*
 * @Date: 2024-08-03 14:39:49
 * @Description: Modify here please
 */
import React, { useContext, useMemo, useState, useRef } from "react";
import classNames from "classnames";
import { ConfigContext } from "../config-provider";
import { useNamespace } from "@camelia/core/hooks";
import { useMount, useUnmount } from "@camelia/shared";
import Visible from "../_internal/visible";
import { SelectProps } from "./type";

let listObserver: IntersectionObserver;

const Image: React.FC<SelectProps> = (props) => {
  const { onChange, value, options, className } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const ns = useNamespace("select", getPrefixCls());
  const imgDom = useRef<HTMLDivElement>();
  const [load, setLoad] = useState<boolean>(false);
  const [hasLoadError, setHasLoadError] = useState<boolean>(false);

  const ObserverView = (fn: Function) => {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver
    const observer = new IntersectionObserver((entrys) => entrys.forEach((entry) => fn(entry)), {
      rootMargin: "0px",
      threshold: 0
    });
    return observer;
  };

  useMount(() => {
    listObserver = ObserverView((entry: any) => {
      if (entry.isIntersecting) {
        // 当内容可见

        listObserver?.unobserve?.(imgDom.current);
        listObserver = null;
      }
    });
    listObserver.observe(imgDom.current); // 观察
  });

  useUnmount(() => {
    if (listObserver && imgDom.current) {
      listObserver.unobserve?.(imgDom.current);
    }
  });

  const ListItem = (props: SelectProps["options"][0]) => {
    const { label, name } = props;
    return <div className={ns.e("inner")}>{label}</div>;
  };

  return <div ref={imgDom} className={classNames(ns.b(), className)}></div>;
};

export default Image;
