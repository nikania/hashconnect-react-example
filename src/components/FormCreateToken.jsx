import React from "react";
import { Form, Input, Select, InputNumber, Switch } from "antd";
import {
  PublicKey,
  TransactionReceipt,
  TokenCreateTransaction,
  TokenSupplyType,
  TokenType,
} from "@hashgraph/sdk";

export default async function CreateTokenTransaction(values, signingAcct, sendTransaction) {
  if (import.meta.env.VITE_DEBUG) {
    console.log("===================network", import.meta.env.VITE_NETWORK);
    console.log("===================CreateTokenTransaction");
  }

  const URL =
    import.meta.env.VITE_NETWORK == "mainnet"
      ? "https://mainnet-public.mirrornode.hedera.com/api/v1/accounts/"
      : "https://testnet.mirrornode.hedera.com/api/v1/accounts/";
  let accountInfo = await window.fetch(URL + signingAcct, { method: "GET" });

  accountInfo = await accountInfo.json();
  let key = PublicKey.fromString(accountInfo.key.key);
  let transaction = new TokenCreateTransaction()
    .setTokenName(values.tokenName)
    .setTokenSymbol(values.tokenSymbol)
    .setInitialSupply(values.initialSupply)
    .setTreasuryAccountId(signingAcct)
    .setAdminKey(key)
    .setSupplyKey(key)
    .setAutoRenewAccountId(signingAcct);

  if (values.type === TokenType.FungibleCommon.toString()) {
    transaction.setDecimals(values.decimals);
  } else {
    transaction.setTokenType(TokenType.NonFungibleUnique);
  }

  if (values.supplyType === TokenSupplyType.Finite.toString()) {
    transaction.setSupplyType(TokenSupplyType.Finite);
    transaction.setMaxSupply(values.maxSupply);
  }

  if (values.kyc) {
    transaction.setKycKey(key);
  }

  if (values.wipe) {
    transaction.setWipeKey(key);
  }

  let result = await sendTransaction(transaction, signingAcct);

  //handle response
  let responseData = {
    response: result,
    receipt: null,
  };

  if (result.success) responseData.receipt = TransactionReceipt.fromBytes(result.receipt);
}

export const FormCreateToken = ({ form, onSubmit }) => {
  return (
    <Form
      form={form}
      onFinish={onSubmit}
      labelCol={{ span: 10 }}
      initialValues={{
        tokenName: "TokenTest-" + Math.random(),
        tokenSymbol: "TT",
        type: TokenType.FungibleCommon.toString(),
        decimals: 0,
        supplyType: TokenSupplyType.Infinite.toString(),
        initialSupply: 0,
        maxSupply: 0,
      }}
    >
      <Form.Item label="Token Name" name="tokenName" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Token Symbol" name="tokenSymbol" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Type" name="type">
        <Select>
          <Select.Option value={TokenType.FungibleCommon.toString()}>Fungible</Select.Option>
          <Select.Option value={TokenType.NonFungibleUnique.toString()}>NFT</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
      >
        {({ getFieldValue }) =>
          getFieldValue("type") === TokenType.FungibleCommon.toString() ? (
            <Form.Item label="Decimals" name="decimals">
              <InputNumber />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item label="Supply Type" name="supplyType">
        <Select>
          <Select.Option value={TokenSupplyType.Finite.toString()}>Finite</Select.Option>
          <Select.Option value={TokenSupplyType.Infinite.toString()}>Infinite</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.supplyType !== currentValues.supplyType
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("supplyType") === TokenSupplyType.Finite.toString() ? (
            <Form.Item label="Maximum Supply" name="maxSupply">
              <InputNumber />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item label="Initial Supply" name="initialSupply">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Enable KYC" name="kyc" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item label="Enable Wipe" name="wipe" valuePropName="checked">
        <Switch />
      </Form.Item>
    </Form>
  );
};
