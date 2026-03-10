/*
 * @Date: 2024-07-27 13:49:35
 * @Description: Modify here please
 */
import React, { useContext, createRef, useRef, useMemo } from "react";
import classNames from "classnames";
import { Loading } from "fish-icons";

import { composeRef } from "@camelia/core";
import { useNamespace } from "@camelia/core/hooks";

import BaseWave, { type WaveRef } from "../_internal/wave";

import type { IButtonProps } from "./type";

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, IButtonProps>((props, ref) => {
  return <button>21122</button>;
});

export default Button;
