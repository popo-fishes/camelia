/*
 * @Date: 2023-12-18 15:17:07
 * @Description: Modify here please
 */
import { withInstall, withNoopInstall } from "@fish-bubble-design/core";

import Select from "./src/select.vue";
import Option from "./src/option.vue";

export const FbSelect = withInstall(Select, {
  Option
});
export default FbSelect;

export const FbOption = withNoopInstall(Option);

export * from "./src/type";
