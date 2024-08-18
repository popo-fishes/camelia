/*
 * @Date: 2024-08-18 10:30:50
 * @Description: Modify here please
 */
import InternalCheckbox from "./checkbox";
import Group from "./group";

export type { ICheckboxProps, ICheckboxGroupProps, CheckboxOptionType } from "./type";

type CompoundedComponent = typeof InternalCheckbox & {
  Group: typeof Group;
};

const Checkbox = InternalCheckbox as CompoundedComponent;

Checkbox.Group = Group;

export default Checkbox;
