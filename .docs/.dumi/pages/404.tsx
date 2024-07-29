import React from 'react';

import { Button, Result } from 'antd';
import { history, useLocation } from 'umi';

const oldRoutes = {
  assembling: ['fluidd', 'hardware', 'software', 'video'],
  calibration: ['base', 'advanced'],
  klipper: ['gcode', 'mainsail'],
  models: ['babylon', 'interesting'],
  purchase: ['plan', 'purchase'],
  slicer: ['prusa', 'profiles', 'ss'],
  upgrade: ['recommend', 'optional', '', ''],
};

function getRenderUrl(oldPathname: string): string | undefined {
  const oldPathArray = oldPathname.split('/');
  if (oldPathArray.length < 4) {
    return undefined;
  }

  console.log(oldPathArray);
  //进行匹配
  for (let key in oldRoutes) {
    if (key === oldPathArray[1]) {
      let ren: string = '';
      for (let i = 1; i < oldPathArray.length; i++) {
        if (i != 2 && oldPathArray[i].length > 0) {
          ren = ren + '/' + oldPathArray[i];
        }
      }
      return ren;
    }
  }
  return undefined;
}

const Desc: React.FC = () => {
  let location = useLocation();
  console.log(location);
  console.log(history);

  let gotoUrl = getRenderUrl(location.pathname);
  if (gotoUrl) {
    console.log(gotoUrl);
    history.replace({
      pathname: gotoUrl,
      hash: location.hash,
    });
  } else {
    return (
      <Result
        status="404"
        title="404"
        subTitle="抱歉, 没有找到您需要的页面。"
        extra={
          <Button type="primary" href="/">
            返回首页
          </Button>
        }
      />
    );
  }
};

export default Desc;
