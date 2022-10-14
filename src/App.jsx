import { useEffect, useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import {
  Client,
  AccountId,
  PrivateKey,
  PublicKey,
  AccountCreateTransaction,
  AccountBalanceQuery,
  Hbar,
  TransactionId,
  TransactionReceipt,
  TransferTransaction,
  TokenCreateTransaction,
  AccountInfoQuery,
  TokenInfoQuery,
  Mnemonic,
  TokenAssociateTransaction,
  TokenMintTransaction,
  TokenBurnTransaction,
  TokenWipeTransaction,
  TokenUpdateTransaction,
  TokenNftInfoQuery,
  TokenType,
  TokenSupplyType,
  TokenPauseTransaction,
  NftId,
  TokenId,
} from "@hashgraph/sdk";
import { Button, Popconfirm, Space, Modal, Form, Input } from "antd";
import React from "react";
import { HashConnect } from "hashconnect";
import { HashConnectConnectionState } from "hashconnect/dist/types";
import { useHashConnect } from "./useHashconnect";
import FormCreateToken from "./FormCreateToken";

function App() {
  const {
    connectToExtension,
    disconnect,
    pairingData,
    availableExtension,
    network,
    pairingString,
    sendTransaction,
  } = useHashConnect();
  console.log("🚀 ~ file: App.jsx ~ line 40 ~ App ~ pairingData", pairingData);
  const [account, setAccount] = useState();
  const [tokenId, setTokenId] = useState("0.0.1");
  const [modal, contextHolder] = Modal.useModal();
  const [formCreate] = Form.useForm();

  // const createToken = async () => {
  //   modal.confirm({
  //     onOk: (close) => {
  //       formCreate.validateFields().then(() => {
  //         close();
  //         formCreate.submit();
  //       });
  //     },
  //     onCancel: () => formCreate.resetFields(),
  //     title: "Create Token",
  //     content: (
  //       <FormCreateToken
  //         form={formCreate}
  //         onSubmit={async (values) => {
  //           console.log(
  //             "🚀 ~ file: App.jsx ~ line 129 ~ onSubmit={ ~ values",
  //             values
  //           );
  //           let accountInfo = await window.fetch(
  //             "https://testnet.mirrornode.hedera.com/api/v1/accounts/" +
  //               this.signingAcct,
  //             { method: "GET" }
  //           );
  //           // let accountInfo:any = await window.fetch("https://mainnet-public.mirrornode.hedera.com/api/v1/accounts/" + this.signingAcct, { method: "GET" });
  //           accountInfo = await accountInfo.json();

  //           let key = await PublicKey.fromString(accountInfo.key.key);

  //           let trans = await new TokenCreateTransaction()
  //             .setTokenName("name")
  //             .setTokenSymbol("n")
  //             .setDecimals(0)
  //             .setInitialSupply(0)
  //             .setTreasuryAccountId(this.signingAcct)
  //             .setAdminKey(key)
  //             .setSupplyKey(key)
  //             .setWipeKey(key)
  //             .setAutoRenewAccountId(this.signingAcct);

  //           let transId = TransactionId.generate(this.signingAcct);
  //           trans.setTransactionId(transId);
  //           trans.setNodeAccountIds([new AccountId(3)]);

  //           await trans.freeze();

  //           let transBytes = trans.toBytes();

  //           const transaction = {
  //             topic: hashcon.topic,
  //             byteArray: transBytes,

  //             metadata: {
  //               accountToSign: this.signingAcct,
  //               returnTransaction: false,
  //               hideNft: false,
  //             },
  //           };

  //           let res = await hashcon.hashconnect.sendTransaction(
  //             hashcon.topic,
  //             transaction
  //           );

  //           //handle response
  //           let responseData = {
  //             response: res,
  //             receipt: null,
  //           };

  //           if (res.success)
  //             responseData.receipt = TransactionReceipt.fromBytes(res.receipt);

  //           console.log(
  //             "🚀 ~ file: App.jsx ~ line 157 ~ onSubmit={ ~ responseData",
  //             responseData
  //           );
  //         }}
  //       />
  //     ),
  //   });
  // };

  const createToken = () => {
    console.log(
      "🚀 ~ file: App.jsx ~ line 139 ~ createToken ~ createToken",
      pairingData
    );
  };
  const handleKyc = () => {
    console.log(
      "🚀 ~ file: App.jsx ~ line 199 ~ handleKyc ~ handleKyc",
      pairingData
    );
  };
  const handleMint = () => {};
  const handleAssociate = () => {};

  useEffect(() => {
    // connect();
  }, []);

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      {network != null && <div>Network: {network}</div>}
      {pairingData != null && (
        <div>
          <p>Connected Account Id: {pairingData.accountIds}</p>
        </div>
      )}
      <Form
        layout="inline"
        onFinish={({ id }) => {
          setTokenId(id);
          console.log("🚀 ~ file: App.jsx ~ line 56 ~ App ~ id", id);
        }}
      >
        <Form.Item label="Token Id" name="id">
          <Input default={tokenId} placeholder={tokenId} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
      <Button
        disabled={pairingData != null}
        type="primary"
        onClick={connectToExtension}
      >
        Connect HashPack
      </Button>
      <Button
        disabled={pairingData == null}
        type="primary"
        onClick={disconnect}
      >
        Disconnect HashPack
      </Button>
      <Button disabled={pairingData == null} onClick={createToken}>
        Create Token
      </Button>
      <Button disabled={pairingData == null} onClick={handleKyc}>
        Grant KYC
      </Button>
      <Button disabled={pairingData == null} onClick={handleMint}>
        Mint Token
      </Button>
      <Button disabled={pairingData == null} onClick={handleAssociate}>
        Associate Token
      </Button>
      <Popconfirm title="Are you sure?" okText="Yes" cancelText="No">
        <Button>Confirm</Button>
      </Popconfirm>
    </Space>
  );
}

export default App;
