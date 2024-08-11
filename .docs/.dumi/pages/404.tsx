import React, { useEffect } from "react";

import { Button } from "camelia";
import { history, useLocation } from "umi";

const oldRoutes = {
  assembling: ["fluidd", "hardware", "software", "video"],
  calibration: ["base", "advanced"],
  klipper: ["gcode", "mainsail"],
  models: ["babylon", "interesting"],
  purchase: ["plan", "purchase"],
  slicer: ["prusa", "profiles", "ss"],
  upgrade: ["recommend", "optional", "", ""]
};

function getRenderUrl(oldPathname: string): string | undefined {
  const oldPathArray = oldPathname.split("/");
  if (oldPathArray.length < 4) {
    return undefined;
  }

  //进行匹配
  for (let key in oldRoutes) {
    if (key === oldPathArray[1]) {
      let ren: string = "";
      for (let i = 1; i < oldPathArray.length; i++) {
        if (i != 2 && oldPathArray[i].length > 0) {
          ren = ren + "/" + oldPathArray[i];
        }
      }
      return ren;
    }
  }
  return undefined;
}

const Desc: React.FC = () => {
  let location = useLocation();

  let gotoUrl = getRenderUrl(location.pathname);

  useEffect(() => {
    if (!gotoUrl && document?.body) {
      document.body.classList.add("no-page-404");
    }
  }, [gotoUrl]);

  if (gotoUrl) {
    history.replace({
      pathname: gotoUrl,
      hash: location.hash
    });
  } else {
    return (
      <div className="page404Wrap">
        <h2>404</h2>
        <p>抱歉, 没有找到您需要的页面。</p>
        <a href="/">
          <Button type="primary">返回首页</Button>
        </a>
      </div>
    );
  }
};

export default Desc;
