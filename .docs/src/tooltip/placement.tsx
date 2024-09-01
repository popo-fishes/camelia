/*
 * @Date: 2024-08-31 23:14:18
 * @Description: Modify here please
 */
import React from 'react';
import { Tooltip, Button } from 'camelia';

const text = <span>prompt text</span>;

const App: React.FC = () => (
  <div className="wrap-base-box">
    <div className="row center">
      <Tooltip placement="top-start" title={text} overlayStyle={{pointerEvents: "none"}}>
        <Button plain className="box-item">top-start</Button>
      </Tooltip>
      <Tooltip placement="top" title={text}>
        <Button plain className="box-item">top</Button>
      </Tooltip>
      <Tooltip placement="top-end" title={text}>
        <Button plain className="box-item">top-end</Button>
      </Tooltip>
    </div>
    <div className="row">
     <Tooltip placement="left-start" title={text}>
        <Button plain className="box-item">left-start</Button>
      </Tooltip>
      <Tooltip placement="right-start" title={text}>
        <Button plain className="box-item">right-start</Button>
      </Tooltip>
    </div>
    <div className="row">
      <Tooltip placement="left" title={text}>
        <Button plain className="box-item">left</Button>
      </Tooltip>
      <Tooltip placement="right" title={text}>
        <Button plain className="box-item">right</Button>
      </Tooltip>
    </div>
    <div className="row">
      <Tooltip placement="left-end" title={text}>
        <Button plain className="box-item">left-end</Button>
      </Tooltip>
      <Tooltip placement="right-end" title={text}>
        <Button  plain className="box-item">right-end</Button>
      </Tooltip>
    </div>
    <div className="row center">
       <Tooltip placement="bottom-start" title={text}>
          <Button  plain className="box-item">bottom-start</Button>
        </Tooltip>
        <Tooltip placement="bottom" title={text}>
          <Button  plain className="box-item">bottom</Button>
        </Tooltip>
        <Tooltip placement="bottom-end" title={text}>
          <Button plain className="box-item">bottom-end</Button>
        </Tooltip>
    </div>
  </div>
);

export default App
