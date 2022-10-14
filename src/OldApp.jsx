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
  } = useHashConnect();
  console.log("🚀 ~ file: App.jsx ~ line 40 ~ App ~ pairingData", pairingData);

  const [connected, setConnected] = useState(false);
  const [hashcon, setHashcon] = useState({
    hashconnect: null,
    appMetadata: {
      name: "dApp Example",
      description: "An example hedera dApp",
      icon: "https://www.hashpack.app/img/logo.svg",
    },
    availableExtension: null,

    state: HashConnectConnectionState.Disconnected,
    topic: "",
    pairingString: "",
    pairingData: null,
  });
  const [account, setAccount] = useState();
  const [tokenId, setTokenId] = useState("0.0.1");
  const [modal, contextHolder] = Modal.useModal();
  const [formCreate] = Form.useForm();

  const accountInfo = async () => {};
  const connect = async () => {
    //create the hashconnect instance
    const hashconnect = new HashConnect(true);

    //initialize and use returned data
    let initData = await hashconnect.init(hashcon.appMetadata, "testnet", true);

    const topic = initData.topic;
    const pairingString = initData.pairingString;

    //Saved pairings will return here, generally you will only have one unless you are doing something advanced
    let pairingData = initData.savedPairings[0];

    //register events

    let availableExtension;
    //This is fired when a extension is found
    hashconnect.foundExtensionEvent.on((data) => {
      console.log("Found extension", data);
      availableExtension = data;
    });

    //This is fired when a wallet approves a pairing
    hashconnect.pairingEvent.on((data) => {
      console.log("Paired with wallet", data);

      pairingData = data.pairingData == null ? pairingData : data.pairingData;
    });

    let state;
    //This is fired when HashConnect loses connection, pairs successfully, or is starting connection
    hashconnect.connectionStatusChangeEvent.on((currentState) => {
      console.log("hashconnect state change event", currentState);
      state = currentState;
    });

    hashconnect.connectToLocalWallet();
    hashconnect.pairingEvent.once((currPairingData) => {
      //do something
      pairingData = currPairingData;
      setConnected(true);
    });
    setHashcon({
      hashconnect,
      availableExtension,
      state,
      topic,
      pairingString,
      pairingData,
    });
  };

  const createToken = async () => {
    modal.confirm({
      onOk: (close) => {
        formCreate.validateFields().then(() => {
          close();
          formCreate.submit();
        });
      },
      onCancel: () => formCreate.resetFields(),
      title: "Create Token",
      content: (
        <FormCreateToken
          form={formCreate}
          onSubmit={async (values) => {
            console.log(
              "🚀 ~ file: App.jsx ~ line 129 ~ onSubmit={ ~ values",
              values
            );
            let accountInfo = await window.fetch(
              "https://testnet.mirrornode.hedera.com/api/v1/accounts/" +
                this.signingAcct,
              { method: "GET" }
            );
            // let accountInfo:any = await window.fetch("https://mainnet-public.mirrornode.hedera.com/api/v1/accounts/" + this.signingAcct, { method: "GET" });
            accountInfo = await accountInfo.json();

            let key = await PublicKey.fromString(accountInfo.key.key);

            let trans = await new TokenCreateTransaction()
              .setTokenName("name")
              .setTokenSymbol("n")
              .setDecimals(0)
              .setInitialSupply(0)
              .setTreasuryAccountId(this.signingAcct)
              .setAdminKey(key)
              .setSupplyKey(key)
              .setWipeKey(key)
              .setAutoRenewAccountId(this.signingAcct);

            let transId = TransactionId.generate(this.signingAcct);
            trans.setTransactionId(transId);
            trans.setNodeAccountIds([new AccountId(3)]);

            await trans.freeze();

            let transBytes = trans.toBytes();

            const transaction = {
              topic: hashcon.topic,
              byteArray: transBytes,

              metadata: {
                accountToSign: this.signingAcct,
                returnTransaction: false,
                hideNft: false,
              },
            };

            let res = await hashcon.hashconnect.sendTransaction(
              hashcon.topic,
              transaction
            );

            //handle response
            let responseData = {
              response: res,
              receipt: null,
            };

            if (res.success)
              responseData.receipt = TransactionReceipt.fromBytes(res.receipt);

            console.log(
              "🚀 ~ file: App.jsx ~ line 157 ~ onSubmit={ ~ responseData",
              responseData
            );
          }}
        />
      ),
    });
  };
  const handleKyc = () => {
    console.log(
      "🚀 ~ file: App.jsx ~ line 199 ~ handleKyc ~ handleKyc",
      hashcon
    );
  };
  const handleMint = () => {};
  const handleAssociate = () => {};

  useEffect(() => {
    // connect();
  }, []);

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      {hashcon.pairingData != null && (
        <div>
          <p>Connected Account Id: {hashcon.pairingData.accountIds}</p>
        </div>
      )}
      {hashcon.hashconnect != null && (
        <div>
          <p>
            Connected Account Id:{" "}
            {JSON.stringify(
              hashcon.hashconnect.hcData.pairingData.map((x) => x.accountIds)
            )}
          </p>
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
      <Button disabled={connected} type="primary" onClick={() => connect()}>
        Connect HashPack
      </Button>
      <Button
        disabled={!connected}
        type="primary"
        onClick={() => {
          hashcon.hashconnect.disconnect(hashcon.topic);
          setHashcon({ pairingData: null });
          setConnected(false);
        }}
      >
        Disconnect HashPack
      </Button>
      <Button disabled={!connected} onClick={createToken}>
        Create Token
      </Button>
      <Button disabled={!connected} onClick={handleKyc}>
        Grant KYC
      </Button>
      <Button disabled={!connected} onClick={handleMint}>
        Mint Token
      </Button>
      <Button disabled={!connected} onClick={handleAssociate}>
        Associate Token
      </Button>
      <Popconfirm title="Are you sure?" okText="Yes" cancelText="No">
        <Button>Confirm</Button>
      </Popconfirm>
    </Space>
  );
}

export default App;
