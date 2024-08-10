/*
 * @Date: 2023-11-30 15:40:41
 * @Description: prompt 全局提示弹窗
 */
import React, { createElement } from "react";
import { createRoot } from "react-dom/client";
import type { MutableRefObject } from "react";
import { isClient } from "@camllia/shared/utils";
import type { IPromptProps, PromptRef } from "./type";
import promptConstructor from "./prompt";

export type PromptContext = {
  handler: {
    close: () => void;
  };
  ref: MutableRefObject<PromptRef>;
};

const prompt = (options?: IPromptProps) => {
  // 不是客户端
  if (!isClient) return { close: () => undefined };
  const onCancel = options.onCancel;
  // 创建包裹容器
  const container = document.createElement("div");
  // 绑定ref
  const ref: PromptContext["ref"] = React.createRef();
  // 给组件的参数
  const props: Partial<IPromptProps> = {
    ...options,
    // 关闭时执行
    onCancel: (e) => {
      // 暴露关闭事件给外面。
      onCancel?.(e);
    },
    afterClose: () => {
      root.unmount();
    },
    open: true
  };

  const root = createRoot(container);

  const msg = createElement(promptConstructor, { ...props, ref } as any);

  root.render(msg);

  const handler: { close: () => void } = {
    close: () => {
      ref.current?.close();
    }
  };
  return handler;
};

export default prompt;
