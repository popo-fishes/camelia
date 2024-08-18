/*
 * @Date: 2024-08-03 08:17:36
 * @Description: Modify here please
 */
import { Button, Checkbox } from "camelia";
import React, { useState } from "react";

const App: React.FC = () => {
  const [checked, setchecked] = useState(false);
  const [checkList, setcheckList] = useState<string[]>(["2"]);

  const [checkedvalue, setcheckedvalue] = useState<string[]>([]);

  const plainOptions = ["Apple", "Pear", "Orange"];

  const isIndeterminate = checkedvalue.length > 0 && checkedvalue.length < plainOptions.length;

  const checkAll = plainOptions.length === checkedvalue.length;

  const handleCheckAllChange = (val: boolean) => {
    setcheckedvalue(val ? plainOptions : []);
  };

  const handleCheckedCitiesChange = (value: any[]) => {
    console.log(value);
    setcheckedvalue(value);
  };

  return (
    <>
      <Checkbox checked={checked} onChange={(v) => setchecked(v)}>
        Checkbox
      </Checkbox>

      {/* <Checkbox.Group
        options={[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" }
        ]}
        value={checkList}
      /> */}

      <div className="mb-4">
        <Button>default</Button>
        <Button type="primary">Primary</Button>
        <Button type="success">Success</Button>
        <Button type="warning">Warning</Button>
        <Button type="danger">Danger</Button>
      </div>

      <Checkbox checked={checkAll} indeterminate={isIndeterminate} onChange={handleCheckAllChange}>
        Check all
      </Checkbox>
      <Checkbox.Group options={plainOptions} onChange={handleCheckedCitiesChange} value={checkedvalue} />

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
