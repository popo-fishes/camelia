/*
 * @Date: 2024-08-05 22:16:34
 * @Description: Modify here please
 */
import React, { useContext, useRef, useMemo, useEffect, useImperativeHandle } from "react";
import classNames from "classnames";

import { useNamespace, useFocusController } from "@camelia/core/hooks";
import { isNil } from "@camelia/shared/utils";
import { nextTick } from "@camelia/core";

import { ConfigContext } from "../config-provider";
import BaseWave from "../_internal/wave";
import type { ITextAreaProps, ITextAreaRef } from "./type";

const TextArea = React.forwardRef<ITextAreaRef, ITextAreaProps>((props, ref) => {
  const {
    placeholder = "请输入",
    wave = true,
    value,
    disabled,
    className,
    autoFocus,
    style,
    readOnly,
    inputStyle,
    maxLength,
    onChange,
    onPressEnter
  } = props;

  const { getPrefixCls } = useContext(ConfigContext);

  const nsTextarea = useNamespace("textarea", getPrefixCls());

  const textareaRef = useRef<HTMLTextAreaElement>();

  const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(textareaRef);

  const isComposing = useRef<boolean>(false);
  const keyLockRef = useRef(false);

  // 初始值
  const nativeInputValue = useMemo(() => (isNil(value) ? "" : String(value)), [value]);

  // 外层class
  const wrapperKls = useMemo(() => {
    return [nsTextarea.b(), nsTextarea.is("focus", isFocused), className];
  }, [isFocused, className]);

  // 校验当前的输入是否合法
  const allowInput = (value: string): boolean => {
    const { allowInput } = props;
    if (typeof allowInput === "function") {
      return allowInput(value);
    }
    return true;
  };

  // 输入框值变化
  const handleInput = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    const input = textareaRef.current;
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (onPressEnter && e.key === "Enter" && !keyLockRef.current) {
      keyLockRef.current = true;
      onPressEnter(e);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
    textareaRef.current?.focus();
  };

  const blur = () => textareaRef.current?.blur();

  useImperativeHandle(ref, () => ({
    focus,
    blur
  }));

  return (
    <div className={classNames(...wrapperKls)} style={style} ref={wrapperRef}>
      <textarea
        ref={textareaRef}
        className={nsTextarea.e("inner")}
        style={inputStyle}
        disabled={disabled}
        maxLength={maxLength}
        readOnly={readOnly}
        autoFocus={autoFocus}
        placeholder={placeholder}
        onCompositionStart={() => (isComposing.current = true)}
        onCompositionEnd={handleCompositionEnd}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {/* 波浪 */}
      {wave && <BaseWave />}
    </div>
  );
});

export default TextArea;
