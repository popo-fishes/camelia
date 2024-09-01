/*
 * @Date: 2024-08-31 23:14:18
 * @Description: Modify here please
 */
import React from 'react';
import { Tooltip, Button } from 'camelia';

const App: React.FC = () => (
  <div className='tooltip-page-combox'>
      <Tooltip title="Top center" placement="top">
        <Button plain>Dark</Button>
      </Tooltip>
      <Tooltip title="Bottom center" placement="bottom" effect="light">
        <Button plain>Light</Button>
      </Tooltip>
      <Tooltip title="Bottom center" placement="bottom" overlayClassName='custom-popper' effect="custom-87d068">
        <Button plain>自定义 #87d068</Button>
      </Tooltip>
      <Tooltip title="Bottom center" placement="bottom" overlayClassName='custom-popper' effect="custom-2db7f5">
        <Button plain>自定义 #2db7f5</Button>
      </Tooltip>
  </div>
);

/**
 * styles----
 *
 * .custom-popper.is-custom-87d068 {
  padding: 6px 12px;
  color: #fff;
  background: #87d068;
}

.custom-popper.is-custom-2db7f5 {
  padding: 6px 12px;
  color: #fff;
  background: #2db7f5;
}

.custom-popper.is-custom-87d068 .cami-popper__arrow::before {
  background: #87d068;
  right: 0;
}

.custom-popper.is-custom-2db7f5 .cami-popper__arrow::before {
  background: #2db7f5;
  right: 0;
}
 */

export default App
