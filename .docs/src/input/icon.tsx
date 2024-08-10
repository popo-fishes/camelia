/*
 * @Date: 2024-08-03 08:17:36
 * @Description: Modify here please
 */
import { Input } from "camllia";
import React, { useState } from "react";
// 这是因为dumi文档找不到module
import { DialOut, Invisible } from "fish-icons/dist/index.mjs";
// 你应该这样写
// import { PaperAirplane } from "fish-icons";

const App: React.FC = () => {
  const [value, setValue] = useState("");

  const onChange = (v: string) => {
    setValue(v);
  };

  const onlyAllowNumber = (value: string) => {
    return !value || /^\d+$/.test(value);
  };

  return (
    <>
      <div className="mb-4">
        <Input
          value={value}
          type="number"
          onChange={onChange}
          allowInput={onlyAllowNumber}
          placeholder="只能输入数字"
          prefix={<span style={{ marginRight: "5px" }}>￥</span>}
          suffix={<span style={{ marginRight: "5px" }}>RMB</span>}
        />
      </div>
      <div className="mb-4">
        <Input
          value={value}
          type="number"
          onChange={onChange}
          allowInput={onlyAllowNumber}
          placeholder="只能输入数字"
          prefix={<DialOut style={{ marginRight: "5px" }} />}
          suffix={<Invisible style={{ color: "rgba(0, 0, 0, 0.45)" }} />}
        />
      </div>
    </>
  );
};

export default App;
