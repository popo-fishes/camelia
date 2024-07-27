/*
 * @Date: 2023-12-20 12:24:41
 * @Description: Modify here please
 */
import type { ComponentPublicInstance } from "vue";
import type { MaybeRef, MaybeRefOrGetter } from "../utils";
import { toValue } from "../toValue";

export type MaybeElementRef<T extends MaybeElement = MaybeElement> = MaybeRef<T>;
export type MaybeComputedElementRef<T extends MaybeElement = MaybeElement> = MaybeRefOrGetter<T>;
export type MaybeElement = HTMLElement | SVGElement | ComponentPublicInstance | undefined | null;

export type UnRefElementReturn<T extends MaybeElement = MaybeElement> = T extends ComponentPublicInstance
  ? Exclude<MaybeElement, ComponentPublicInstance>
  : T | undefined;

/**
 * 获取元素或Vue组件实例的ref的dom元素
 *
 * @param elRef
 */
export function unrefElement<T extends MaybeElement>(elRef: MaybeComputedElementRef<T>): UnRefElementReturn<T> {
  const plain = toValue(elRef);
  return (plain as ComponentPublicInstance)?.$el ?? plain;
}
