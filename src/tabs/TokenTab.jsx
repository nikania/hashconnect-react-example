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
import MintTokenTransaction, {
  FormTokenSupply,
  BurnTokenTransaction,
} from "../components/FormSupplyToken";
import DeleteTokenTransaction, { FormTokenDelete } from "../components/FormDeleteToken";
import WipeTokenTransaction, { FormTokenWipe } from "../components/FormWipeToken";

const TokenTab = () => {
  const { pairingData, sendTransaction } = useHashConnect();

  const [modal, contextHolder] = Modal.useModal();
  const [form] = Form.useForm();

  const formModal = async (title, formJsx) => {
    modal.confirm({
      onOk: (close) => {
        form.validateFields().then(() => {
          close();
          form.submit();
        });
      },
      onCancel: () => form.resetFields(),
      title: title,
      content: formJsx,
    });
  };

  const createToken = () =>
    formModal(
      "Create Token",
      <FormCreateToken
        form={form}
        onSubmit={(values) =>
          CreateTokenTransaction(values, pairingData.accountIds[0], sendTransaction)
        }
      />,
    );

  const handleDelete = () =>
    formModal(
      "Delete Token",
      <FormTokenDelete
        form={form}
        onSubmit={(values) =>
          DeleteTokenTransaction(values, pairingData.accountIds[0], sendTransaction)
        }
      />,
    );

  const handleGrantKyc = () =>
    formModal(
      "Grant KYC",
      <FormTokenKyc
        form={form}
        onSubmit={(values) =>
          GrantKycTokenTransaction(values, pairingData.accountIds[0], sendTransaction)
        }
      />,
    );

  const handleRevokeKyc = () =>
    formModal(
      "Grant KYC",
      <FormTokenKyc
        form={form}
        onSubmit={(values) =>
          RevokeKycTokenTransaction(values, pairingData.accountIds[0], sendTransaction)
        }
      />,
    );

  const handleMint = () =>
    formModal(
      "Mint Token",
      <FormTokenSupply
        form={form}
        onSubmit={(values) =>
          MintTokenTransaction(values, pairingData.accountIds[0], sendTransaction)
        }
      />,
    );

  const handleBurn = () =>
    formModal(
      "Burn Token",
      <FormTokenSupply
        form={form}
        onSubmit={(values) =>
          BurnTokenTransaction(values, pairingData.accountIds[0], sendTransaction)
        }
      />,
    );

  const handleWipe = () =>
    formModal(
      "Wipe Token",
      <FormTokenWipe
        form={form}
        onSubmit={(values) =>
          WipeTokenTransaction(values, pairingData.accountIds[0], sendTransaction)
        }
      />,
    );

  return (
    <Space direction="vertical" size="middle" /*style={{ display: "flex" }}*/>
      {contextHolder}
      <Button disabled={pairingData == null} onClick={createToken}>
        Create Token
      </Button>
      <Button disabled={pairingData == null} onClick={handleDelete}>
        Delete Token
      </Button>
      <Button disabled={pairingData == null} onClick={handleMint}>
        Mint Token
      </Button>
      <Button disabled={pairingData == null} onClick={handleBurn}>
        Burn Token
      </Button>
      <Button disabled={pairingData == null} onClick={handleGrantKyc}>
        Grant KYC
      </Button>
      <Button disabled={pairingData == null} onClick={handleRevokeKyc}>
        Revoke KYC
      </Button>
      <Button disabled={pairingData == null} onClick={handleWipe}>
        Wipe Token
      </Button>
    </Space>
  );
};

export default TokenTab;
