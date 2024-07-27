/*
 * @Date: 2023-11-30 15:40:41
 * @Description: prompt 全局提示弹窗
 */
import { createVNode, render } from "vue";
import { isClient } from "@fish-bubble-design/shared/utils";
import type { IPromptProps } from "./type";
import promptConstructor from "./prompt.vue";

type IOptions = {
  /**
   * 点击遮罩层或右上角叉或取消按钮的回调-- type的值描述
   * 1. notBtn非按钮关闭，如点击了右上角图标，点击了蒙层
   * 2. cancel: 点击了取消按钮
   */
  onCancel?: (e: { type: "notBtn" | "cancel" }) => void;
  /** 确认按钮事件 */
  onOk?: () => void;
} & IPromptProps;

const prompt = (options?: IOptions) => {
  // 不是客户端
  if (!isClient) return { close: () => undefined };
  // 创建包裹容器
  const container = document.createElement("div");
  // 给组件的参数
  const props = {
    ...options,
    // 关闭时执行
    onCancel: (e) => {
      // 暴露关闭事件给外面。
      options?.onCancel?.(e);
      // 销毁弹窗
      render(null, container);
    },
    open: true
  };
  // 创建虚拟dom
  const vnode = createVNode(promptConstructor, props);
  // 渲染节点
  render(vnode, container);

  const vm = vnode.component!;

  const handler: { close: () => void } = {
    // 把关闭方法暴露出去，让外面可以主动关闭
    close: () => {
      // 主动关闭, 通过vm实例得到组件里面暴露的方法
      vm.exposed!.close();
    }
  };
  // 暴露一个主动关闭弹窗的方法（基本不会用到，但是还是给出去）
  return handler;
};

export default prompt;
