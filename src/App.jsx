import { useEffect, useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Button, Popconfirm, Space, Modal, Form, Input } from "antd";
import React from "react";
import { useHashConnect } from "./useHashconnect";
import FormCreateToken from "./FormCreateToken";
import CreateTokenTransaction from "./createTokenTransaction";

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
  const [account, setAccount] = useState();
  const [tokenId, setTokenId] = useState("0.0.1");
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

  const handleKyc = () => {
    console.log(
      "🚀 ~ file: App.jsx ~ line 199 ~ handleKyc ~ handleKyc",
      pairingData
    );
  };
  const handleMint = () => {};
  const handleAssociate = () => {};

  useEffect(() => {
    // connect();
  }, []);

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      {network != null && <div>Network: {network}</div>}
      {pairingData != null && (
        <div>
          <p>Connected Account Id: {pairingData.accountIds}</p>
        </div>
      )}
      <Form
        layout="inline"
        onFinish={({ id }) => {
          setTokenId(id);
          console.log("🚀 ~ file: App.jsx ~ line 56 ~ App ~ id", id);
        }}
      >
        <Form.Item label="Token Id" name="id">
          <Input default={tokenId} placeholder={tokenId} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
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
