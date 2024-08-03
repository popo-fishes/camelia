/*
 * @Date: 2024-08-03 08:17:36
 * @Description: Modify here please
 */
import { Button } from "fish-remix";
import { getTreePaths } from "fish-remix/shared";
import React from "react";

const App: React.FC = () => {
  return (
    <>
      <div className="mb-4">
        <Button>default</Button>
        <Button type="primary">Primary</Button>
        <Button type="success">Success</Button>
        <Button type="warning">Warning</Button>
        <Button type="danger">Danger</Button>
      </div>
      <div className="mb-4">
        <Button plain>default</Button>
        <Button type="primary" plain>
          Primary
        </Button>
        <Button type="success" plain>
          Success
        </Button>
        <Button type="warning" plain>
          Warning
        </Button>
        <Button type="danger" plain>
          Danger
        </Button>
      </div>
      <div>
        <Button ghost>default</Button>
        <Button type="primary" ghost>
          Primary
        </Button>
        <Button type="success" ghost>
          Success
        </Button>
        <Button type="warning" ghost>
          Warning
        </Button>
        <Button type="danger" ghost>
          Danger
        </Button>
      </div>
    </>
  );
};

export default App;
