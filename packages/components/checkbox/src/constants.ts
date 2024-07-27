import type { InjectionKey, WritableComputedRef } from "vue";

type CheckboxGroupContext = {
  modelValue?: WritableComputedRef<any>;
  changeEvent?: (...args: any) => any;
};

export const checkboxGroupContextKey: InjectionKey<CheckboxGroupContext> = Symbol("checkboxGroupContextKey");
