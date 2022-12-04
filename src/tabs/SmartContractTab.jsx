import React from "react";
import "antd/dist/antd.css";
import { Button, Modal, Form, Space } from "antd";
import { useHashConnect } from "../hooks/useHashconnect";

const SmartContractTab = () => {
  const { pairingData, sendTransaction } = useHashConnect();

  const [modal, contextHolder] = Modal.useModal();
  const [formCreate] = Form.useForm();

  const handle = () => {};
  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      {contextHolder}
      <Button disabled={pairingData == null} onClick={handle}>
        Create Smart Contract
      </Button>
      <Button disabled={pairingData == null} onClick={handle}>
        Delete Smart Contract
      </Button>
      <Button disabled={pairingData == null} onClick={handle}>
        Call Smart Contract
      </Button>
      <Button disabled={pairingData == null} onClick={handle}>
        Execute Create Smart Contract
      </Button>
    </Space>
  );
};

export default SmartContractTab;
