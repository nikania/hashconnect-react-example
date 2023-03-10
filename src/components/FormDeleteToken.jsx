import React from "react";
import { Form, Input } from "antd";
import { TokenDeleteTransaction } from "@hashgraph/sdk";
import Common from "./Common";

export default async function DeleteTokenTransaction(values, signingAcct, sendTransaction) {
  if (import.meta.env.VITE_DEBUG) console.log("===================DeleteTokenTransaction");

  let transaction = new TokenDeleteTransaction().setTokenId(values.tokenId);

  await sendTransaction(transaction, signingAcct);
}

export const FormTokenDelete = ({ form, onSubmit }) => {
  return (
    <Form
      form={form}
      onFinish={onSubmit}
      labelCol={{ span: 10 }}
      initialValues={{
        tokenId: "0.0.0",
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
    </Form>
  );
};
