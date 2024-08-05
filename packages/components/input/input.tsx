/*
 * @Date: 2024-08-05 22:16:34
 * @Description: Modify here please
 */
import React, { useContext, useRef, useMemo, useState, useEffect, useImperativeHandle } from "react";
import classNames from "classnames";
import { CircleCloseFilled } from "fish-icons";

import { useNamespace, useFocusController } from "@fish-remix/hooks";
import { isNil } from "@fish-remix/shared/utils";
import { nextTick } from "@fish-remix/core";

import { ConfigContext } from "../config-provider";
import Visible from "../_internal/visible";
import BaseWave from "../_internal/wave";
import type { InputProps, InputRef } from "./type";

const Input = React.forwardRef<InputRef, InputProps>((props, ref) => {
  const {
    placeholder = "请输入",
    type = "text",
    wave = true,
    value,
    disabled,
    size,
    className,
    autoFocus,
    style,
    clearable,
    readOnly,
    prefix,
    suffix,
    inputStyle,
    maxLength,
    onChange,
    onClear
  } = props;

  const { getPrefixCls } = useContext(ConfigContext);

  const nsInput = useNamespace("input", getPrefixCls());
  const nsTextarea = useNamespace("textarea", getPrefixCls());

  const inputRef = useRef<HTMLInputElement>();
  const textareaRef = useRef<HTMLInputElement>();

  const _ref = type !== "textarea" ? inputRef : textareaRef;

  const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(_ref);

  const [hovering, setGovering] = useState<boolean>(false);
  const isComposing = useRef<boolean>(false);

  // 初始值
  const nativeInputValue = useMemo(() => (isNil(value) ? "" : String(value)), [value]);

  // 外层class
  const wrapperKls = useMemo(() => {
    if (props.type !== "textarea") {
      return [
        nsInput.b(),
        nsInput.m(props.size),
        nsInput.is("focus", isFocused),
        nsInput.is("disabled", disabled),
        className
      ];
    }
    return [nsTextarea.b(), nsInput.is("focus", isFocused), className];
  }, [type, size, isFocused, className, disabled]);

  // 何时显示清除图标
  const showClear = clearable && !disabled && !readOnly && !!nativeInputValue && (isFocused || hovering);

  // 校验当前的输入是否合法
  const allowInput = (value: string): boolean => {
    const { allowInput } = props;
    if (typeof allowInput === "function") {
      return allowInput(value);
    }
    return true;
  };

  // 输入框值变化
  const handleInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as any;

    const isIncomingValueValid = allowInput(value);

    // 在合成过程中不应发出输入
    if (isComposing.current) return;

    if (value === nativeInputValue) {
      setNativeInputValue();
      return;
    }

    if (isIncomingValueValid) {
      onChange?.(value);
    }

    // 确保本地输入值得到控制
    await nextTick();

    setNativeInputValue();
  };

  // 设置值
  const setNativeInputValue = () => {
    // 输入口的节点
    const input = _ref.current;
    const formatterValue = nativeInputValue;
    if (!input || input.value === formatterValue) return;
    // 给节点赋值
    input.value = formatterValue;
  };

  const handleCompositionEnd = (event: any) => {
    if (isComposing) {
      isComposing.current = false;
      handleInput(event);
    }
  };

  const handleMouseLeave = (_) => {
    setGovering(false);
  };

  const handleMouseEnter = (_) => {
    setGovering(true);
  };

  // 点击清除按钮
  const handleReset = () => {
    _ref.current.value = "";
    onChange?.("");
  };

  useEffect(() => {
    setNativeInputValue();
  }, [nativeInputValue]);

  // 主动获取焦点方法
  const focus = async () => {
    await nextTick();
    _ref.current?.focus();
  };

  const blur = () => _ref.current?.blur();

  useImperativeHandle(ref, () => ({
    focus,
    blur
  }));

  return (
    <>
      <Visible visible={type !== "textarea"}>
        <div
          className={classNames(...wrapperKls)}
          style={style}
          ref={wrapperRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* 前缀 */}
          {prefix && <span className={nsInput.e("prefix")}>{prefix}</span>}
          <input
            ref={inputRef}
            className={nsInput.e("inner")}
            style={inputStyle}
            disabled={disabled}
            maxLength={maxLength}
            readOnly={readOnly}
            autoFocus={autoFocus}
            placeholder={placeholder}
            type={type}
            onCompositionStart={() => (isComposing.current = true)}
            onCompositionEnd={handleCompositionEnd}
            onInput={handleInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <Visible visible={suffix || showClear}>
            <span className={nsInput.e("suffix")}>
              <Visible visible={!showClear}>{suffix}</Visible>
              {/* 关闭按钮 */}
              <Visible visible={showClear}>
                {
                  <CircleCloseFilled
                    className="closeIcon"
                    onClick={() => {
                      handleReset();
                      onClear?.();
                    }}
                  />
                }
              </Visible>
            </span>
          </Visible>
          {/* 波浪 */}
          {wave && <BaseWave />}
        </div>
      </Visible>
    </>
  );
});

export default Input;
