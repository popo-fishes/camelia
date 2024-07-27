/*
 * @Date: 2023-11-29 16:17:22
 * @Description: 样式命名空间， 这个在封装组件，遇到样式多时候，是非常好管理的
 */
import { computed, getCurrentInstance, inject, ref, unref } from "vue";
import type { InjectionKey, Ref } from "vue";

export const defaultNamespace = "fb";

const statePrefix = "is-";

const _bem = (namespace: string, block: string, blockSuffix: string, element: string, modifier: string) => {
  // 块名
  let cls = `${namespace}-${block}`;
  // 块后缀
  if (blockSuffix) {
    cls += `-${blockSuffix}`;
  }
  // 节点
  if (element) {
    cls += `__${element}`;
  }
  // 修饰
  if (modifier) {
    cls += `--${modifier}`;
  }
  return cls;
};

export const namespaceContextKey: InjectionKey<Ref<string | undefined>> = Symbol("namespaceContextKey");

export const useGetDerivedNamespace = () => {
  const derivedNamespace = getCurrentInstance() ? inject(namespaceContextKey, ref(defaultNamespace)) : ref(defaultNamespace);
  const namespace = computed(() => {
    return unref(derivedNamespace) || defaultNamespace;
  });
  return namespace;
};

/**
 *
 * @param block 组件块名
 * @param namespaceOverrides 默认前缀
 * @returns
 */
// !!! 封装组件样式 非常重要的方法！
export const useNamespace = (block: string, namespaceOverrides?: string) => {
  const namespace = namespaceOverrides ? ref(namespaceOverrides) : useGetDerivedNamespace();
  // 默认样式拼接
  const b = (blockSuffix = "") => _bem(namespace.value, block, blockSuffix, "", "");
  // 属性
  const m = (modifier?: string) => (modifier ? _bem(namespace.value, block, "", "", modifier) : "");
  // 节点
  const e = (element?: string) => (element ? _bem(namespace.value, block, "", element, "") : "");
  // 是否存在某个样式
  const is = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args.length >= 1 ? args[0]! : true;
    return name && state ? `${statePrefix}${name}` : "";
  };

  return {
    namespace,
    b,
    m,
    e,
    is
  };
};
