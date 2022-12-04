import React from "react";
import "antd/dist/antd.css";
import { Button, Modal, Form, Space } from "antd";
import { useHashConnect } from "../hooks/useHashconnect";

const ConsensusTab = () => {
  const { pairingData, sendTransaction } = useHashConnect();

  const [modal, contextHolder] = Modal.useModal();
  const [formCreate] = Form.useForm();

  const handle = () => {};
  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      {contextHolder}
      <Button disabled={pairingData == null} onClick={handle}>
        Create Topic
      </Button>
      <Button disabled={pairingData == null} onClick={handle}>
        Delete Topic
      </Button>
      <Button disabled={pairingData == null} onClick={handle}>
        Update Topic
      </Button>
      <Button disabled={pairingData == null} onClick={handle}>
        Submit Message
      </Button>
    </Space>
  );
};

export default ConsensusTab;
