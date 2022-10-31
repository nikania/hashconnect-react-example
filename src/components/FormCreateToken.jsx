import React from "react";
import { Form, Input } from "antd";
import {
  PublicKey,
  TransactionReceipt,
  TokenCreateTransaction,
} from "@hashgraph/sdk";

export default async function CreateTokenTransaction(
  values,
  signingAcct,
  sendTransaction
) {
  if (import.meta.env.VITE_DEBUG)
    console.log("===================network", import.meta.env.VITE_NETWORK);

  const URL =
    import.meta.env.VITE_NETWORK == "mainnet"
      ? "https://mainnet-public.mirrornode.hedera.com/api/v1/accounts/"
      : "https://testnet.mirrornode.hedera.com/api/v1/accounts/";
  let accountInfo = await window.fetch(URL + signingAcct, { method: "GET" });

  accountInfo = await accountInfo.json();
  let key = await PublicKey.fromString(accountInfo.key.key);
  let trans = await new TokenCreateTransaction()
    .setTokenName(values.projectName)
    .setTokenSymbol(values.projectName)
    .setDecimals(0)
    .setInitialSupply(0)
    .setTreasuryAccountId(signingAcct)
    .setAdminKey(key)
    .setSupplyKey(key)
    .setWipeKey(key)
    .setAutoRenewAccountId(signingAcct);

  let res = await sendTransaction(trans, signingAcct);

  //handle response
  let responseData = {
    response: res,
    receipt: null,
  };

  if (res.success)
    responseData.receipt = TransactionReceipt.fromBytes(res.receipt);
}

export const FormCreateToken = ({ form, onSubmit }) => {
  return (
    <Form form={form} onFinish={onSubmit} labelCol={{ span: 10 }}>
      <Form.Item required label="ProjectName" name="projectName">
        <Input />
      </Form.Item>
      <Form.Item required label="Project Type" name="projectType">
        <Input />
      </Form.Item>
      <Form.Item required label="Vintage" name="vintage">
        <Input />
      </Form.Item>
      <Form.Item required label="Vallidation date" name="date">
        <Input />
      </Form.Item>
    </Form>
  );
};