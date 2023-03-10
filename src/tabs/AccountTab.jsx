import React from "react";
import "antd/dist/antd.css";
import { Button, Modal, Form, Space } from "antd";
import { useHashConnect } from "../hooks/useHashconnect";
import AssociateTokenTransaction, {
  DissociateTokenTransaction,
  FormTokenAssociate,
} from "../components/FormAssociateToken";
import UpdateAccountTransaction, { FormAccountUpdate } from "../components/FormAccountUpdate";
import AllowanceApproveTransaction, {
  FormAllowance,
  FormAllowanceDelete,
} from "../components/FormAccountAllowance";

const AccountTab = () => {
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

  const handleAssociate = () =>
    formModal(
      "Associate Token",
      <FormTokenAssociate
        form={form}
        onSubmit={(values) =>
          AssociateTokenTransaction(values, pairingData.accountIds[0], sendTransaction)
        }
      />,
    );

  const handleDissociate = () =>
    formModal(
      "Associate Token",
      <FormTokenAssociate
        form={form}
        onSubmit={(values) =>
          DissociateTokenTransaction(values, pairingData.accountIds[0], sendTransaction)
        }
      />,
    );

  const handleUpdate = () =>
    formModal(
      "Update Account",
      <FormAccountUpdate
        form={form}
        onSubmit={(values) =>
          UpdateAccountTransaction(values, pairingData.accountIds[0], sendTransaction)
        }
      />,
    );

  const handleAllowanceApprove = () =>
    formModal(
      "Approve Allowance",
      <FormAllowance
        form={form}
        onSubmit={(values) =>
          AllowanceApproveTransaction(values, pairingData.accountIds[0], sendTransaction)
        }
      />,
    );
  const handleAllowanceDelete = () =>
    formModal(
      "Delete Allowance",
      <FormAllowanceDelete
        form={form}
        onSubmit={(values) =>
          AllowanceApproveTransaction(values, pairingData.accountIds[0], sendTransaction)
        }
      />,
    );

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      {contextHolder}
      <Button disabled={pairingData == null} onClick={handleAssociate}>
        Associate Token
      </Button>
      <Button disabled={pairingData == null} onClick={handleDissociate}>
        Disassociate Token
      </Button>
      <Button disabled={pairingData == null} onClick={handleAllowanceApprove}>
        Allowance Approve
      </Button>
      <Button disabled={pairingData == null} onClick={handleAllowanceDelete}>
        Allowance Delete
      </Button>
      <Button disabled={pairingData == null} onClick={handleUpdate}>
        Update Account
      </Button>
    </Space>
  );
};

export default AccountTab;
