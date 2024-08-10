/*
 * @Date: 2023-11-24 11:55:34
 * @Description: Modify here please
 */
import React, { createElement, useContext } from "react";
import { createRoot } from "react-dom/client";
import { ConfigContext } from "../config-provider";
import { useNamespace, useZIndex } from "@camellia/hooks";
import { isClient } from "@camellia/shared";
import MessageConstructor from "./message";
import type { MessageContext, MessageHandler, MessageOptions, Message } from "./type";
import { instances } from "./instance";

let seed = 1;
const messageMax = 10;

let wrapId = null;

let timer = null;

const ContainerWrapper: React.FC = () => {
  const { getPrefixCls } = useContext(ConfigContext);
  const { currentZIndex } = useZIndex();

  const customStyle = { zIndex: currentZIndex };

  const ns = useNamespace("message", getPrefixCls());
  const id = `${getPrefixCls()}-message-wrap`;
  wrapId = id;
  return <div className={ns.b()} style={customStyle} id={id}></div>;
};

const createMessage = (options: MessageOptions): MessageContext => {
  const id = `message_id_${seed++}`;
  // 消息关闭时执行
  const userOnClose = options.onClose;
  // 创建包裹容器
  const container = document.createElement("div");
  // 绑定ref
  const ref: MessageContext["ref"] = React.createRef();

  // 给msg组件的参数
  const props = {
    ...options,
    id,
    // msg关闭时执行
    onClose: () => {
      // 暴露关闭事件给外面。
      userOnClose?.();
      // 清除收集器
      const idx = instances.indexOf(instance);
      if (idx === -1) return;
      instances.splice(idx, 1);
      // 卸载操作
      root.unmount();
      container?.remove();
      cancelAnimationFrame(timer);
    }
  };

  const root = createRoot(container);
  // 创建节点
  const msg = createElement(MessageConstructor, { ...props, ref } as any);

  // 获取节点DOM
  let __appendTo = document.querySelector<HTMLElement>(`#${wrapId}`);
  if (__appendTo) {
    // 挂在节点
    (__appendTo as any)?.appendChild(container);
    // 渲染节点
    root.render(msg);
  } else {
    timer = requestAnimationFrame(() => {
      __appendTo = document.querySelector<HTMLElement>(`#${wrapId}`);
      // 挂在节点
      (__appendTo as any)?.appendChild(container);
      // 渲染节点
      root.render(msg);
    });
  }

  const handler: MessageHandler = {
    close: () => {
      ref.current?.close();
    }
  };

  const instance = {
    id,
    ref,
    handler
  };

  // 返回当前消息实例
  return instance;
};

const message = (options: MessageOptions) => {
  // 不是客户端
  if (!isClient) return { close: () => undefined };
  // 大于最大数量
  if (typeof messageMax === "number" && instances.length >= messageMax) {
    return { close: () => undefined };
  }
  const instance = createMessage(options);

  instances.push(instance);

  return instance.handler;
};

/** 暴露方法 */
const api = {
  // 关闭所有消息
  closeAll: () => {
    for (const instance of instances) {
      instance.handler.close();
    }
  }
};

/** 添加消息类型 */
const msgtypes = ["success", "info", "warning", "error"] as const;
msgtypes.forEach((type: (typeof msgtypes)[number]) => {
  api[type] = (options) => {
    // 如果传递的时一个字符串，代表是message字段
    const params = !options || typeof options === "string" ? { message: options || "" } : options;

    if (isClient) {
      const dom = document.getElementById(wrapId);
      if (!dom) {
        // 创建dom, msg的包裹器
        // 创建包裹容器
        const __container = document.createElement("div");
        const root = createRoot(__container);
        // 创建节点
        const wrapper = createElement(ContainerWrapper);
        // 渲染节点
        root.render(wrapper);
        document.body.appendChild(__container);
        // 获取参数配置
        return message({ ...params, type });
      } else {
        // 获取参数配置
        return message({ ...params, type });
      }
    } else {
      return { close: () => undefined };
    }
  };
});

export default api as Message;
