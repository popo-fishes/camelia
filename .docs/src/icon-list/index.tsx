/*
 * @Date: 2024-07-29 15:36:55
 * @Description: Modify here please
 */

import React from "react";
import IconData from "./icons.json";
import * as Icons from "fish-icons";

const datas: any = [];
const iconMap = new Map(Object.entries(Icons));

IconData.data.forEach((com) => {
  const icon = iconMap.get(com);
  if (icon) {
    datas.push({
      name: com,
      Icon: icon as any
    });
  }
});

const App: React.FC = () => (
  <>
    <div className="demo-icon-item">
      <ul className="demo-icon-list">
        {datas?.map((Item, index) => {
          return (
            <li key={"icon" + index} className="icon-item">
              <span className="demo-svg-icon">
                <Item.Icon size={20} />
                <span className="icon-name">{Item.name}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  </>
);

export default App;
