/* eslint-disable @typescript-eslint/no-this-alias */
/*
 * @Date: 2024-03-14 15:46:52
 * @Description: 发布/订阅
 */
interface SubscribeEvent {
  fn: Function;
  once: boolean;
}

export class eventEmmiter {
  subscribes: Map<string, Array<SubscribeEvent>>;

  constructor() {
    this.subscribes = new Map();
  }

  addEvent(type: string, callback: Function, once = false) {
    const sub = this.subscribes.get(type) || [];
    sub.push({ fn: callback, once });
    this.subscribes.set(type, sub);
  }

  /**
   * 事件订阅
   * @param type 订阅的事件名称
   * @param callback 触发的回调函数
   */
  on(type: string, callback: Function) {
    this.addEvent(type, callback);
  }

  /**
   * 发布事件
   * @param type 发布的事件名称
   * @param args 发布事件的额外参数
   */
  emit(type: string, ...args: Array<any>) {
    const sub = this.subscribes.get(type) || [];
    const context = this;

    sub.forEach(({ fn }) => {
      fn.call(context, ...args);
    });

    const newSub = sub.filter((item) => !item.once);
    this.subscribes.set(type, newSub);
  }

  /**
   * 取消订阅
   * @param type 取消订阅的事件名称
   * @param callback 取消订阅的具体事件
   */
  off(type: string, callback: Function) {
    const sub = this.subscribes.get(type);

    if (sub) {
      const newSub = sub.filter(({ fn }) => fn !== callback);
      this.subscribes.set(type, newSub);
    }
  }

  // 只订阅一次
  once(type: string, callback: Function) {
    this.addEvent(type, callback, true);
  }
}
