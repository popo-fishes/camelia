import { CSSProperties, ReactNode } from "react";

/*
 * @Date: 2023-12-25 17:48:08
 * @Description: Modify here please
 */
export type SelectValue = string | number | number[] | string[];
export type SelectOption = { label?: ReactNode; value?: ReactNode } & Record<string, ReactNode>;
export type SelectProps = {
  /** 是否允许清空 */
  allowClear: boolean;
  /** 下拉菜单的 className 属性 */
  className?: string;
  /** 自定义下拉框内容 */
  dropdownRender?: (originNode: ReactNode) => ReactNode;
  /** 下拉菜单的 style 属性  */
  dropdownStyle?: CSSProperties;
  /** 是否根据输入项进行筛选。当其为一个函数时，会接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false  */
  filterOption?: (inputValue: string, option: { label: string; value: string }) => boolean;
  /** 自定义节点 label、value、options、groupLabel 的字段*/
  fieldNames?: boolean;
  /** 自定义渲染下拉选项 */
  optionRender: (option: SelectOption, info: { index: number }) => React.ReactNode;
  /** 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 string 变为 { value: string, label: ReactNode } 的格式*/
  labelInValue?: string;
  /** 是否多选 */
  isMultiple?: boolean;
  /** 占位符 */
  placeholder?: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 数据化配置选项内容，相比 jsx 定义会获得更好的渲染性能 */
  options: SelectOption[];
  /** 是否展示搜索项*/
  showSearch?: boolean;
  onChange?: (inputValue: SelectValue, option: SelectOption) => void;
  value?: SelectValue;
  /** 指定可选中的最多 items 数量，仅在 isMultiple为true 时生效 */
  maxCount?: number;
};
