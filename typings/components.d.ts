/*
 * @Date: 2023-12-31 13:28:27
 * @Description: Modify here please
 */
// For this project development
import "@vue/runtime-core";

declare module "@vue/runtime-core" {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    FbButton: (typeof import("../packages/fish-bubble-design"))["FbButton"];
    FbCheckbox: (typeof import("../packages/fish-bubble-design"))["FbCheckbox"];
    FbCheckboxGroup: (typeof import("../packages/fish-bubble-design"))["FbCheckboxGroup"];
    FbDialog: (typeof import("../packages/fish-bubble-design"))["FbDialog"];
    FbImage: (typeof import("../packages/fish-bubble-design"))["FbImage"];
    FbImgCaptcha: (typeof import("../packages/fish-bubble-design"))["FbImgCaptcha"];
    FbInput: (typeof import("../packages/fish-bubble-design"))["FbInput"];
    FbSelect: (typeof import("../packages/fish-bubble-design"))["FbSelect"];
    FbOption: (typeof import("../packages/fish-bubble-design"))["FbOption"];
    FbPopper: (typeof import("../packages/fish-bubble-design"))["FbPopper"];
    FbCollapseTransition: (typeof import("../packages/fish-bubble-design"))["FbCollapseTransition"];
    FbTag: (typeof import("../packages/fish-bubble-design"))["FbTag"];
  }

  interface ComponentCustomProperties {
    $message: (typeof import("../packages/fish-bubble-design"))["message"];
    $prompt: (typeof import("../packages/fish-bubble-design"))["prompt"];
  }
}

export {};
