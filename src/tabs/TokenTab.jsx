import "antd/dist/antd.css";
import { Button, Modal, Form, Space } from "antd";
import React from "react";
import { useHashConnect } from "../hooks/useHashconnect";
import { FormCreateToken } from "../components/FormCreateToken";
import CreateTokenTransaction from "../components/FormCreateToken";
import GrantKycTokenTransaction, {
  RevokeKycTokenTransaction,
  FormTokenKyc,
} from "../components/FormTokenKyc";

const TokenTab = () => {
  const { pairingData, sendTransaction } = useHashConnect();

  const [modal, contextHolder] = Modal.useModal();
  const [form] = Form.useForm();

  const createToken = async () => {
    modal.confirm({
      onOk: (close) => {
        form.validateFields().then(() => {
          close();
          form.submit();
        });
      },
      onCancel: () => form.resetFields(),
      title: "Create Token",
      content: (
        <FormCreateToken
          form={form}
          onSubmit={(values) =>
            CreateTokenTransaction(values, pairingData.accountIds[0], sendTransaction)
          }
        />
      ),
    });
  };

  const handleGrantKyc = async () => {
    modal.confirm({
      onOk: (close) => {
        form.validateFields().then(() => {
          close();
          form.submit();
        });
      },
      onCancel: () => form.resetFields(),
      title: "Grant KYC",
      content: (
        <FormTokenKyc
          form={form}
          onSubmit={(values) =>
            GrantKycTokenTransaction(values, pairingData.accountIds[0], sendTransaction)
          }
        />
      ),
    });
  };

  const handleRevokeKyc = async () => {
    modal.confirm({
      onOk: (close) => {
        form.validateFields().then(() => {
          close();
          form.submit();
        });
      },
      onCancel: () => form.resetFields(),
      title: "Revoke KYC",
      content: (
        <FormTokenKyc
          form={form}
          onSubmit={(values) =>
            RevokeKycTokenTransaction(values, pairingData.accountIds[0], sendTransaction)
          }
        />
      ),
    });
  };
  const handleMint = () => {};
  const handle = () => {};

  return (
    <Space direction="vertical" size="middle" /*style={{ display: "flex" }}*/>
      {contextHolder}
      <Button disabled={pairingData == null} onClick={createToken}>
        Create Token
      </Button>
      <Button disabled={pairingData == null} onClick={handle}>
        Delete Token
      </Button>
      <Button disabled={pairingData == null} onClick={handleMint}>
        Mint Token
      </Button>
      <Button disabled={pairingData == null} onClick={handle}>
        Burn Token
      </Button>
      <Button disabled={pairingData == null} onClick={handleGrantKyc}>
        Grant KYC
      </Button>
      <Button disabled={pairingData == null} onClick={handleRevokeKyc}>
        Revoke KYC
      </Button>
      <Button disabled={pairingData == null} onClick={handle}>
        Wipe Token
      </Button>
    </Space>
  );
};

export default TokenTab;