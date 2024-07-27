/*
 * @Date: 2023-12-18 20:10:26
 * @Description: Modify here please
 */
import type { InjectionKey } from "vue";
import type { ISelectProps } from "../type";

export interface SelectContext {
  props: ISelectProps;
  states: any;
  handleOptionSelect(vm: unknown): void;
  onOptionCreate(vm: any): void;
  onOptionDestroy(key: number | string | Record<string, string>, vm: any): void;
}

export const selectKey: InjectionKey<SelectContext> = Symbol("FbSelect");
