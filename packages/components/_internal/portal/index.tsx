/*
 * @Date: 2024-08-04 10:45:27
 * @Description: Modify here please
 */
import React, { useState, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import { ConfigContext } from "../../config-provider";
import { canUseDom } from "@camelia/core";
import { useLockscreen } from "@camelia/shared";
import { isClient } from "@camelia/shared";

export type ContainerType = Element | DocumentFragment;

export type GetContainer = string | ContainerType | (() => ContainerType) | false;

export interface PortalProps {
  /** 自定义容器元素。默认情况下，`open时将在document.body插入 */
  getContainer?: GetContainer;
  /** 显示子节点 */
  open?: boolean;
  /** 当“open”为“false”时，删除“children”。设置“false”将不会处理删除过程 */
  autoDestroy?: boolean;
  /** 打开时锁屏滚动 */
  autoLock?: boolean;
  children?: React.ReactNode;
}

const getPortalContainer = (getContainer: GetContainer) => {
  if (getContainer === false) {
    return false;
  }

  if (!canUseDom() || !getContainer) {
    return null;
  }

  if (typeof getContainer === "string") {
    return document.querySelector(getContainer);
  }
  if (typeof getContainer === "function") {
    return getContainer();
  }
  return getContainer;
};

const getdefaultContainer = () => {
  if (!canUseDom() || !isClient) {
    return null;
  }
  return document.body;
};

const Portal: React.FC<PortalProps> = (props) => {
  const { open, autoLock, getContainer, autoDestroy = true, children } = props;

  const { getPrefixCls } = useContext(ConfigContext);

  const [shouldRender, setShouldRender] = useState<boolean>(open);

  const mergedRender = shouldRender || open;

  const hiddenClass = `${getPrefixCls()}-body-hidden`;

  useEffect(() => {
    if (autoDestroy || open) {
      setShouldRender(open);
    }
  }, [open, autoDestroy]);

  const [innerContainer, setInnerContainer] = useState<ContainerType | false>(() => getPortalContainer(getContainer));

  useEffect(() => {
    const customizeContainer = getPortalContainer(getContainer);

    setInnerContainer(customizeContainer ?? null);
  });

  const mergedContainer = innerContainer ?? getdefaultContainer();

  /** 锁屏 */
  useLockscreen(autoLock && open && canUseDom() && mergedContainer === document.body, hiddenClass);

  /**
   * 无需渲染时不渲染
   * 当innerContainer为“undefined”时，由于用户在同一渲染中使用了ref，它可能尚未就绪
   */
  if (!mergedRender || !canUseDom() || innerContainer === undefined) {
    return null;
  }

  return <>{mergedContainer && createPortal(children, mergedContainer)}</>;
};

export default Portal;
