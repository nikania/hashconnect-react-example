import { useEffect, useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Button, Popconfirm, Space, Modal, Form, Descriptions } from "antd";
import React from "react";
import { useHashConnect } from "./hooks/useHashconnect";
import { FormCreateToken } from "./components/FormCreateToken";
import CreateTokenTransaction from "./components/FormCreateToken";

function App() {
  const {
    connectToExtension,
    disconnect,
    pairingData,
    availableExtension,
    network,
    pairingString,
    sendTransaction,
  } = useHashConnect();
  console.log("🚀 ~ file: App.jsx ~ line 40 ~ App ~ pairingData", pairingData);
  const [modal, contextHolder] = Modal.useModal();
  const [formCreate] = Form.useForm();

  const createToken = async () => {
    modal.confirm({
      onOk: (close) => {
        formCreate.validateFields().then(() => {
          close();
          formCreate.submit();
        });
      },
      onCancel: () => formCreate.resetFields(),
      title: "Create Token",
      content: (
        <FormCreateToken
          form={formCreate}
          onSubmit={(values) =>
            CreateTokenTransaction(
              values,
              pairingData.accountIds[0],
              sendTransaction
            )
          }
        />
      ),
    });
  };

  const handleKyc = async () => {
    modal.confirm({
      onOk: (close) => {
        formCreate.validateFields().then(() => {
          close();
          formCreate.submit();
        });
      },
      onCancel: () => formCreate.resetFields(),
      title: "Grant KYC",
      content: (
        <Form form={formCreate} onSubmit={(values) => values}>
          {" "}
        </Form>
      ),
    });
  };
  const handleMint = () => {};
  const handleAssociate = () => {};

  useEffect(() => {}, []);

  // !!! USE TABS FOR DIFFERNT TYPES OF ACTIONS!!! like HTS HCS account etc

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      {pairingData != null && (
        <Descriptions title="HashPack Connection Info">
          <Descriptions.Item label="Network">{network}</Descriptions.Item>
          <Descriptions.Item label="Account Ids">
            {pairingData.accountIds}
          </Descriptions.Item>
          <Descriptions.Item label="Encryption Key">
            {pairingData.encryptionKey}
          </Descriptions.Item>
        </Descriptions>
      )}

      {contextHolder}
      <Button
        disabled={pairingData != null}
        type="primary"
        onClick={connectToExtension}
      >
        Connect HashPack
      </Button>
      <Button
        disabled={pairingData == null}
        type="primary"
        onClick={disconnect}
      >
        Disconnect HashPack
      </Button>
      <Button disabled={pairingData == null} onClick={createToken}>
        Create Token
      </Button>
      <Button disabled={pairingData == null} onClick={handleKyc}>
        Grant KYC
      </Button>
      <Button disabled={pairingData == null} onClick={handleMint}>
        Mint Token
      </Button>
      <Button disabled={pairingData == null} onClick={handleAssociate}>
        Associate Token
      </Button>
      <Popconfirm title="Are you sure?" okText="Yes" cancelText="No">
        <Button>Confirm</Button>
      </Popconfirm>
    </Space>
  );
}

export default App;
