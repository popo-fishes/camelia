/*
 * @Date: 2023-11-24 11:55:34
 * @Description: Modify here please
 */
import { createVNode, render } from "vue";
import { isClient } from "@fish-bubble-design/shared";
import MessageConstructor from "./message.vue";
import type { MessageContext, MessageHandler, MessageOptions, Message, MessageTypedOptions } from "./type";
import { instances } from "./instance";

let seed = 1;
const messageMax = 10;

const createMessage = ({ appendTo, ...options }: MessageOptions): MessageContext => {
  const id = `message_${seed++}`;
  // 消息关闭时执行
  const userOnClose = options.onClose;
  // 创建包裹容器
  const container = document.createElement("div");

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
    },
    // 销毁时
    onDestroy: () => {
      render(null, container);
    }
  };
  // 创建虚拟dom
  const vnode = createVNode(MessageConstructor, props);
  // 渲染节点
  render(vnode, container);

  // 挂在节点 -》 获取HTML中元素的第一个子元素
  (appendTo as HTMLElement).appendChild(container.firstElementChild!);

  // vm是MessageConstructor的实例
  const vm = vnode.component!;

  const handler: MessageHandler = {
    // 把关闭方法暴露出去，让外面可以主动关闭msg
    close: () => {
      // 主动关闭msg组件, 通过vm实例得到组件里面暴露的方法
      vm.exposed!.close();
    }
  };

  const instance = {
    id,
    vm,
    handler,
    props: (vnode.component as any).props
  };

  // 返回当前消息实例
  return instance;
};

// 处理参数
const handleOptions = (params?: MessageTypedOptions | MessageOptions["message"]) => {
  // 如果传递的时一个字符串，代表是message字段
  const options = !params || typeof params === "string" ? { message: params } : params;

  const _opt = { ...options } as MessageTypedOptions;

  if (!_opt.appendTo) {
    _opt.appendTo = document.body;
  } else if (typeof _opt.appendTo === "string") {
    // 获取节点DOM
    let appendTo = document.querySelector<HTMLElement>(_opt.appendTo);
    // 如果传递的不是一个节点，默认加入到body
    if (appendTo) {
      appendTo = document.body;
    }
    _opt.appendTo = appendTo;
  }

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
    // 获取参数配置
    const normalized = handleOptions(options);
    return message({ ...normalized, type });
  };
});

export default api as Message;
