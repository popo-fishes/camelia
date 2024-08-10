/*
 * @Date: 2024-08-03 08:17:36
 * @Description: Modify here please
 */
import { Input } from "camellia";
import React, { useState } from "react";
// 这是因为dumi文档找不到module
import { Search } from "fish-icons/dist/index.mjs";
// 你应该这样写
// import { Search } from "fish-icons";

const App: React.FC = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <div className="mb-4">
        <div className="custom-input-wrap">
          <Input value={value} placeholder="基本的 input" />
          <div className="suffix-wrap">
            <Search />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

// .custom-input-wrap {
//   display: flex;
//   .fb-input {
//     border-top-right-radius: 0;
//     border-bottom-right-radius: 0;
//   }
//   .suffix-wrap {
//     height: auto;
//     width: 50px;
//     background-color: #f5f7fa;
//     cursor: pointer;
//     display: inline-flex;
//     align-items: center;
//     justify-content: center;
//     border-top-right-radius: 4px;
//     border-bottom-right-radius: 4px;
//     box-shadow: 0 1px 0 0 var(--fb-color-info-light-3) inset, 0 -1px 0 0 var(--fb-color-info-light-3) inset,
//       -1px 0 0 0 var(--fb-color-info-light-3) inset;
//   }
// }
