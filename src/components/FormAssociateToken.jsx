import React from "react";
import { Form, Input } from "antd";
import { TokenAssociateTransaction, TokenDissociateTransaction } from "@hashgraph/sdk";
import Common from "./Common";

export default async function AssociateTokenTransaction(values, signingAcct, sendTransaction) {
  if (import.meta.env.VITE_DEBUG) console.log("===================AssociateTokenTransaction");

  // TODO multiple tokens!
  let transaction = new TokenAssociateTransaction();

  transaction.setAccountId(signingAcct);
  transaction.setTokenIds([values.tokenId]);

  await sendTransaction(transaction, signingAcct);
}

export async function DissociateTokenTransaction(values, signingAcct, sendTransaction) {
  if (import.meta.env.VITE_DEBUG) console.log("===================DissociateTokenTransaction");

  let transaction = new TokenDissociateTransaction();

  transaction.setAccountId(signingAcct);
  transaction.setTokenIds([values.tokenId]);

  await sendTransaction(transaction, signingAcct);
}

export const FormTokenAssociate = ({ form, onSubmit }) => {
  return (
    <Form
      form={form}
      onFinish={onSubmit}
      labelCol={{ span: 10 }}
      initialValues={[{ tokenId: "0.0.0" }]}
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
