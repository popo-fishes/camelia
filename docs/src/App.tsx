/*
 * @Date: 2024-05-14 11:15:12
 * @Description: Modify here please
 */
import { version, Button } from "../../packages/fish-remix";
import "./App.css";

function App() {
  console.log("fish version---------", version);
  return (
    <>
      <div>
        <Button>default</Button>
        <Button type="primary">Primary</Button>
        <Button type="success">Success</Button>
        <Button type="warning">Warning</Button>
        <Button type="danger">Danger</Button>
      </div>
      <div>
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
}

export default App;
