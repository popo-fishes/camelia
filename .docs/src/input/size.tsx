/*
 * @Date: 2024-08-03 08:17:36
 * @Description: Modify here please
 */
import { Input } from "fish-remix";
import React, { useState } from "react";

const App: React.FC = () => {
  const [value, setValue] = useState("");
  return (
    <div style={{ display: "flex" }}>
      <div className="mb-4 mr-4">
        <Input style={{ width: "200px" }} value={value} size="large" />
      </div>
      <div className="mb-4 mr-4">
        <Input style={{ width: "200px" }} value={value} />
      </div>
      <div className="mb-4 mr-4">
        <Input style={{ width: "200px" }} value={value} size="small" />
      </div>
    </div>
  );
};

export default App;
