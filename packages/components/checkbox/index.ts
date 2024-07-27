/*
 * @Date: 2023-12-29 16:36:00
 * @Description: Modify here please
 */
import { withInstall, withNoopInstall } from "@fish-bubble-design/core";
import Checkbox from "./src/checkbox.vue";
import CheckboxGroup from "./src/checkbox-group.vue";

export const FbCheckbox = withInstall(Checkbox, {
  CheckboxGroup
});

export default FbCheckbox;

export const FbCheckboxGroup = withNoopInstall(CheckboxGroup);

export * from "./src/type";
