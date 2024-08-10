/*
 * @Date: 2024-08-03 08:17:36
 * @Description: Modify here please
 */
import { Input } from "camllia";
import React, { useState } from "react";

const App: React.FC = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <div className="mb-4">
        <Input
          value={value}
          placeholder="基本的 input"
          onPressEnter={(e) => console.log(e)}
          clearable
          onChange={(v) => setValue(v)}
        />
      </div>
    </>
  );
};

export default App;
