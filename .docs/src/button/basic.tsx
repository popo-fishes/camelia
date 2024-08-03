/*
 * @Date: 2024-08-03 08:17:36
 * @Description: Modify here please
 */
import { Button, Dialog } from "fish-remix";
import React, { useState } from "react";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Dialog open={isModalOpen} onClose={handleCancel}></Dialog>
      <div className="mb-4">
        <Button onClick={showModal}>default</Button>
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
