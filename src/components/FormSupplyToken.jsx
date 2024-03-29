import React from "react";
import { Form, Input, InputNumber } from "antd";
import { TokenMintTransaction, TokenBurnTransaction } from "@hashgraph/sdk";
import Common from "./Common";

export default async function MintTokenTransaction(values, signingAcct, sendTransaction) {
  if (import.meta.env.VITE_DEBUG) console.log("===================MintTokenTransaction");

  let transaction = new TokenMintTransaction().setTokenId(values.tokenId).setAmount(values.amount);

  await sendTransaction(transaction, signingAcct);
}

export async function BurnTokenTransaction(values, signingAcct, sendTransaction) {
  if (import.meta.env.VITE_DEBUG) console.log("===================BurnTokenTransaction");

  let transaction = new TokenBurnTransaction().setTokenId(values.tokenId).setAmount(values.amount);

  await sendTransaction(transaction, signingAcct);
}

export const FormTokenSupply = ({ form, onSubmit }) => {
  return (
    <Form
      form={form}
      onFinish={onSubmit}
      labelCol={{ span: 10 }}
      initialValues={{
        tokenId: "0.0.0",
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
