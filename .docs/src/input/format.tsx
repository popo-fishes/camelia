/*
 * @Date: 2024-08-03 08:17:36
 * @Description: Modify here please
 */
import { Input } from "camellia";
import React, { useState } from "react";

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
        />
      </div>
    </>
  );
};

export default App;
