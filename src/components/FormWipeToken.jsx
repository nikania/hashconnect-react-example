import React from "react";
import { Form, Input, InputNumber } from "antd";
import { TokenWipeTransaction } from "@hashgraph/sdk";
import Common from "./Common";

export default async function WipeTokenTransaction(values, signingAcct, sendTransaction) {
  if (import.meta.env.VITE_DEBUG) console.log("===================MintTokenTransaction");

  let transaction = new TokenWipeTransaction()
    .setTokenId(values.tokenId)
    .setAccountId(values.accountId)
    .setAmount(values.amount);

  let result = await sendTransaction(transaction, signingAcct);
}

export const FormTokenWipe = ({ form, onSubmit }) => {
  return (
    <Form
      form={form}
      onFinish={onSubmit}
      labelCol={{ span: 10 }}
      initialValues={{
        tokenId: "0.0.0",
        accountId: "0.0.0",
        amount: 1,
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
      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
    </Form>
  );
};
