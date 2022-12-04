import React from "react";
import { Form, Input, Select, InputNumber, Switch } from "antd";
import { TokenRevokeKycTransaction, TokenGrantKycTransaction } from "@hashgraph/sdk";
import Common from "./Common";

export default async function GrantKycTokenTransaction(values, signingAcct, sendTransaction) {
  if (import.meta.env.VITE_DEBUG) console.log("===================GrantKycTokenTransaction");

  let transaction = new TokenGrantKycTransaction()
    .setTokenId(values.tokenId)
    .setAccountId(values.accountId);

  let result = await sendTransaction(transaction, signingAcct);
}

export async function RevokeKycTokenTransaction(values, signingAcct, sendTransaction) {
  if (import.meta.env.VITE_DEBUG) console.log("===================RevokeKycTokenTransaction");

  let transaction = new TokenRevokeKycTransaction()
    .setTokenId(values.tokenId)
    .setAccountId(values.accountId);

  let result = await sendTransaction(transaction, signingAcct);
}

export const FormTokenKyc = ({ form, onSubmit }) => {
  return (
    <Form
      form={form}
      onFinish={onSubmit}
      labelCol={{ span: 10 }}
      initialValues={{
        tokenId: "0.0.0",
        accountId: "0.0.0",
      }}
    >
      <Form.Item
        label="Token Id"
        name="tokenId"
        rules={[
          {
            required: true,
            pattern: new RegExp(Common.IdRegex),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Account Id"
        name="accountId"
        rules={[
          {
            required: true,
            pattern: new RegExp(Common.IdRegex),
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};
