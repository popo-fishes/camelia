/*
 * @Date: 2024-05-14 11:15:12
 * @Description: Modify here please
 */
import { createFromIconfont } from "fish-icons";
import { version, Button } from "../../packages/fish-remix";
import "./App.css";

const IconFont = createFromIconfont({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
});

function App() {
  console.log("fish version---------", version);
  return (
    <>
      <Button type="primary" size="large" icon={<IconFont type="icon-tuichu" />}>
        Primary
      </Button>
      <Button type="warning" loading>
        Warning
      </Button>
      <Button type="success" size="small">
        Success
      </Button>
    </>
  );
}

export default App;
