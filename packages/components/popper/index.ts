/*
 * @Date: 2023-12-19 20:11:41
 * @Description: Modify here please
 */
import { withInstall } from "@fish-bubble-design/core";

import popper from "./src/popper.vue";

export const FbPopper = withInstall(popper);

export default FbPopper;

export type * from "./src/content-type";
export type * from "./src/popper-type";
