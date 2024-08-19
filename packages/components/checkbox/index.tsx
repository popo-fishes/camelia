/*
 * @Date: 2024-08-18 10:30:50
 * @Description: Modify here please
 */
import InternalCheckbox from "./checkbox";
import Group from "./group";

export type { ICheckboxProps, ICheckboxGroupProps, CheckboxOptionType } from "./type";

type CommixComponent = typeof InternalCheckbox & {
  Group: typeof Group;
};

const Checkbox = InternalCheckbox as CommixComponent;

Checkbox.Group = Group;

export default Checkbox;
