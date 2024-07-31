/*
 * @Date: 2023-11-24 11:55:34
 * @Description: Modify here please
 */
import React, { createElement, useContext } from "react";
import { createRoot } from "react-dom/client";
import { ConfigContext } from "../config-provider";
import { useNamespace, useZIndex } from "@fish-remix/hooks";
import { isClient } from "@fish-remix/shared";
import MessageConstructor from "./message";
import type {
  MessageContext,
  MessageHandler,
  MessageOptions,
  Message,
  MessageTypedOptions,
  IMessageProps
} from "./type";
import { instances } from "./instance";

let seed = 1;
const messageMax = 10;

let wrapId = null;

const ContainerWrapper: React.FC = () => {
  const { getPrefixCls } = useContext(ConfigContext);
  const { currentZIndex } = useZIndex();

  const customStyle = { zIndex: currentZIndex };

  const ns = useNamespace("message", getPrefixCls());
  const id = `${getPrefixCls()}-message-wrap`;
  wrapId = id;
  return <div className={ns.b()} style={customStyle} id={id}></div>;
};

const createMessage = ({
  appendTo,
  ...options
}: MessageOptions & {
  // 设置 message 的根元素
  appendTo?: string;
}): MessageContext => {
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

      requestAnimationFrame(() => {
        root.unmount();
        container?.remove();
      });
    }
  };

  const root = createRoot(container);

  // 创建节点
  const msg = createElement(MessageConstructor, { ...props, ref } as any);
  // 渲染节点
  root.render(msg);

  // 挂在节点
  (appendTo as any).appendChild(container);

  const handler: MessageHandler = {
    // 把关闭方法暴露出去，让外面可以主动关闭msg
    close: () => {
      // 主动关闭msg组件, 通过vm实例得到组件里面暴露的方法
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

// 处理参数
const handleOptions = (params?: MessageTypedOptions) => {
  const _opt = { ...params } as MessageTypedOptions & {
    // 设置 message 的根元素
    appendTo?: string;
  };

  // 获取节点DOM
  let appendTo = document.querySelector<HTMLElement>(_opt.appendTo);

  _opt.appendTo = appendTo as any;
  return _opt;
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
        setTimeout(() => {
          document.body.appendChild(__container?.firstElementChild);
          // 获取参数配置
          const normalized = handleOptions({ ...params, appendTo: `#${wrapId}` });
          return message({ ...normalized, type });
        });
      } else {
        // 获取参数配置
        const normalized = handleOptions({ ...params, appendTo: `#${wrapId}` });
        return message({ ...normalized, type });
      }
    } else {
      return { close: () => undefined };
    }
  };
});

export default api as Message;
