import React from "react";
import "antd/dist/antd.css";
import { Button, Modal, Form, Space } from "antd";
import { useHashConnect } from "../hooks/useHashconnect";
import { FormCreateToken } from "../components/FormCreateToken";
import CreateTokenTransaction from "../components/FormCreateToken";

const AccountTab = () => {
  const { pairingData, sendTransaction } = useHashConnect();

  const [modal, contextHolder] = Modal.useModal();
  const [formCreate] = Form.useForm();

  const handle = () => {};
  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      {contextHolder}
      <Button disabled={pairingData == null} onClick={handle}>
        Update Account
      </Button>
      <Button disabled={pairingData == null} onClick={handle}>
        Associate Token
      </Button>
      <Button disabled={pairingData == null} onClick={handle}>
        Disassociate Token
      </Button>
      <Button disabled={pairingData == null} onClick={handle}>
        Allowance Approve
      </Button>
      <Button disabled={pairingData == null} onClick={handle}>
        Allowance Delete
      </Button>
    </Space>
  );
};

export default AccountTab;
