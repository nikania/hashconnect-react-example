import React from "react";
import { Form, Input, InputNumber } from "antd";
import { AccountUpdateTransaction } from "@hashgraph/sdk";
import Common from "./Common";

export default async function UpdateAccountTransaction(values, signingAcct, sendTransaction) {
  if (import.meta.env.VITE_DEBUG) console.log("===================UpdateAccountTransaction");
  if (values.maxToken == null && values.memo == null) return;

  let transaction = new AccountUpdateTransaction();

  transaction.setAccountId(signingAcct);
  if (values.maxToken) transaction.setMaxAutomaticTokenAssociations(values.maxToken);
  if (values.memo) transaction.setAccountMemo(values.memo);

  await sendTransaction(transaction, signingAcct);
}

export const FormAccountUpdate = ({ form, onSubmit }) => {
  return (
    <Form
      form={form}
      onFinish={onSubmit}
      labelCol={{ span: 10 }}
      initialValues={[{ tokenId: "0.0.0" }]}
    >
      <Form.Item label="Max Automatic Token Associations" name="maxToken">
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Account Memo"
        name="memo"
        rules={[
          {
            pattern: new RegExp(Common.StringLen),
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};
