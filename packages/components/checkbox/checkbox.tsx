import React, { useContext, useMemo, useRef } from "react";
import classNames from "classnames";
import { ConfigContext } from "../config-provider";
import { useNamespace } from "@camelia/core/hooks";
import { ICheckboxProps } from "./type";
import BaseWave, { type WaveRef } from "../_internal/wave";

const Checkbox: React.FC<ICheckboxProps> = (props) => {
  const { children, name, indeterminate, wave = true, checked, disabled, onChange } = props;

  const { getPrefixCls } = useContext(ConfigContext);
  const ns = useNamespace("checkbox", getPrefixCls());

  const waveElRef = useRef<WaveRef>(null);

  const hasOwnLabel = useMemo<boolean>(() => {
    return !!children;
  }, [children]);

  const compKls = useMemo(() => {
    return [ns.b(), ns.is("disabled", disabled), ns.is("checked", checked)];
  }, [disabled, checked]);

  const spanKls = useMemo(() => {
    return [
      ns.e("input"),
      ns.is("disabled", disabled),
      ns.is("checked", checked),
      ns.is("indeterminate", indeterminate)
    ];
  }, [disabled, checked, indeterminate]);

  const handleChange = (e) => {
    const target = e.target as HTMLInputElement;
    onChange?.(target.checked);
  };

  const handleClick = (): void => {
    if (!disabled) {
      waveElRef.current?.play();
    }
  };

  return (
    <label className={classNames(...compKls)}>
      <span className={classNames(...spanKls)} onClick={handleClick}>
        <span className={ns.e("inner")} />
        <input
          type="checkbox"
          onChange={handleChange}
          disabled={disabled}
          className={ns.e("original")}
          name={name}
          checked={checked}
        />
        {/* 波浪 */}
        {wave && <BaseWave ref={waveElRef} />}
      </span>
      {hasOwnLabel && <span className={ns.e("label")}>{children}</span>}
    </label>
  );
};

export default Checkbox;
