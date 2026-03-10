/*
 * @Date: 2024-08-18 10:40:16
 * @Description: Modify here please
 */
import React, { useContext } from "react";
import { ConfigContext } from "../config-provider";
import { useNamespace } from "@camelia/core/hooks";

import Checkbox from "./Checkbox";
import { ICheckboxGroupProps, CheckboxOptionType, IcheckboxValueType } from "./type";

const Group: React.FC<ICheckboxGroupProps<IcheckboxValueType>> = (props) => {
  const { children, onChange, value, options = [], disabled } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const ns = useNamespace("checkbox-group", getPrefixCls());

  const memoOptions = React.useMemo<(CheckboxOptionType<IcheckboxValueType> & { checked: boolean })[]>(
    () =>
      options.map((option: any) => {
        if (typeof option === "string" || typeof option === "number") {
          return { label: option, value: option, checked: value.includes(option) };
        }
        return {
          ...option,
          checked: value.includes(option.value)
        };
      }),
    [options, value]
  );

  const toggleOption = (index: number) => {
    const newValue = [...value];
    const option = memoOptions[index];
    if (option.checked) {
      const _index = newValue.indexOf(option.value);
      if (_index !== -1) {
        newValue.splice(_index, 1);
      }
    } else {
      newValue.push(option.value);
    }
    onChange?.(newValue);
  };

  const childrenNode = options.length
    ? memoOptions.map<React.ReactNode>((option, index) => (
        <Checkbox
          key={option.value.toString()}
          disabled={"disabled" in option ? option.disabled : disabled}
          checked={option.checked}
          onChange={() => toggleOption(index)}
        >
          {option.label}
        </Checkbox>
      ))
    : children;

  return (
    <div className={ns.b()} role="group">
      {childrenNode}
    </div>
  );
};

export default Group;
