/*
 * @Date: 2024-08-05 22:16:34
 * @Description: Modify here please
 */
import React, { useContext, useRef, useMemo, useState, useEffect, useImperativeHandle } from "react";
import classNames from "classnames";
import { CircleCloseFilled } from "fish-icons";

import { useNamespace, useFocusController } from "@camellia/hooks";
import { isNil } from "@camellia/shared/utils";
import { nextTick } from "@camellia/core";

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
    onPressEnter,
    onClear
  } = props;

  const { getPrefixCls } = useContext(ConfigContext);

  const nsInput = useNamespace("input", getPrefixCls());

  const inputRef = useRef<HTMLInputElement>();

  const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(inputRef);

  const [hovering, setGovering] = useState<boolean>(false);
  const isComposing = useRef<boolean>(false);
  const keyLockRef = useRef(false);

  // 初始值
  const nativeInputValue = useMemo(() => (isNil(value) ? "" : String(value)), [value]);

  // 外层class
  const wrapperKls = useMemo(() => {
    return [nsInput.b(), nsInput.m(size), nsInput.is("focus", isFocused), nsInput.is("disabled", disabled), className];
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
      onChange?.(value || "");
    } else {
      await nextTick();
      setNativeInputValue();
    }
  };

  // 设置值
  const setNativeInputValue = () => {
    // 输入口的节点
    const input = inputRef.current;
    const formatterValue = nativeInputValue;
    if (!input || input.value === formatterValue) return;
    // 给节点赋值
    input.value = formatterValue;
  };

  // 当文本段落的组成完成或取消时，compositionend 事件将被触发
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
    inputRef.current.value = "";
    onChange?.("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onPressEnter && e.key === "Enter" && !keyLockRef.current) {
      keyLockRef.current = true;
      onPressEnter(e);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      keyLockRef.current = false;
    }
  };

  useEffect(() => {
    setNativeInputValue();
  }, [nativeInputValue]);

  // 主动获取焦点方法
  const focus = async () => {
    await nextTick();
    inputRef.current?.focus();
  };

  const blur = () => inputRef.current?.blur();

  useImperativeHandle(ref, () => ({
    focus,
    blur
  }));

  return (
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
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
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
  );
});

export default Input;
