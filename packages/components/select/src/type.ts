/*
 * @Date: 2023-12-15 20:18:59
 * @Description: Modify here please
 */
import type { Component } from "vue";
import type { IPopperProps } from "@fish-bubble-design/components/popper";
import type { ComponentSize } from "@fish-bubble-design/core";

export type IOption = {
  value: string | number;
  label: string | number;
  disabled?: boolean;
};

export interface ISelectProps {
  /** 选择项数据 */
  options?: IOption[];
  /** 选择器大小 */
  size?: ComponentSize;
  /** value值 */
  modelValue?: string | number | null | Array<string | number>;
  /** 占位符 */
  placeholder?: string;
  /** 是否可以清空选项 */
  clearable?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否多选  */
  multiple?: boolean;
  /** 下拉菜单的 style 属性 */
  dropdownStyle?: object;
  /** 下拉菜单的动画name 遵循https://cn.vuejs.org/guide/built-ins/transition.html#transition */
  transition?: string;
  /** 弹出位置? 你可以控制下拉菜单在触发对象节点上的某个位置弹出 */
  placement?: IPopperProps["placement"];
  /** 触发方式 */
  trigger?: IPopperProps["trigger"];
  /** 是否把菜单挂载到触发器节点下，默认时挂载在body节点下 */
  isTriggerPopup?: boolean;
  /** 自定义后缀图标组件 */
  suffixIcon?: string | Component;
  /** 自定义清除图标组件 */
  clearIcon?: string | Component;
  /** 是否需要波浪效果 */
  wave?: boolean;
  /** 当 multiple 和 filterable被设置为 true 时，是否在选中一个选项后保留当前的搜索关键词 */
  reserveKeyword?: boolean;
  /** 最大选择数量 0为不限制 */
  multipleLimit?: number;
  /** 组件是否可筛选 */
  filterable?: boolean;
  /** 多选时的呈现方法，默认为tag，如果是tag，选择多了会换行 */
  presentMode?: "tag" | "text";
  /** 自定义筛选方法 */
  filterMethod?: Function;
  /** 自定义远程搜索方法 */
  remoteMethod?: Function;
  /** 是否正在从远程获取数据 */
  loading?: boolean;
  /** 从服务器加载数据时显示的文本  */
  loadingText?: string;
  /** 其中的选项是否从服务器远程加载 */
  remote?: boolean;
  /** 搜索条件无匹配时显示的文字，也可以使用 empty 插槽设置 */
  noMatchText?: string;
  /** 无选项时显示的文字，也可以使用 empty 插槽设置自定义内容 */
  noDataText?: string;
}

export type ISelectEmits = {
  (e: "update:modelValue", value: any): void;
  (e: "change", value: any): void;
  (e: "focus", value: any): void;
  (e: "blur", event: any): void;
  (e: "visible-change", v: boolean): void;
  (e: "remove-tag", value: any): void;
};
