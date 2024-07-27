/*
 * @Date: 2024-01-05 21:44:16
 * @Description: Modify here please
 */
import { withInstall } from "@fish-bubble-design/core";

import prompt from "./src/method";

import Prompt from "./src/prompt.vue";

export const FbPrompt = withInstall(Prompt);

export default FbPrompt;

export { prompt };

export * from "./src/type";
