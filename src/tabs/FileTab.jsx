import React from "react";
import "antd/dist/antd.css";
import { Button, Modal, Form, Space } from "antd";
import { useHashConnect } from "../hooks/useHashconnect";

const FileTab = () => {
  const { pairingData, sendTransaction } = useHashConnect();

  const [modal, contextHolder] = Modal.useModal();
  const [form] = Form.useForm();

  const handle = () => modal.confirm({ title: "TODO" });

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      {contextHolder}
      <Button disabled={pairingData == null} onClick={handle}>
        File Creat
      </Button>
      <Button disabled={pairingData == null} onClick={handle}>
        File Append
      </Button>
    </Space>
  );
};

export default FileTab;
