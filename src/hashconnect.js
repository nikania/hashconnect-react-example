import { HashConnect } from "hashconnect";
import {
  Client,
  PrivateKey,
  HbarUnit,
  TransferTransaction,
  Transaction,
  AccountId,
  Hbar,
  TransactionId,
  PublicKey
} from "@hashgraph/sdk"

const hashconnect = new HashConnect();

const connect = async () => {
  let appMetadata = {
    name: "dApp Example Forward Tokens",
    description: "An example hedera dApp",
    // icon: "https://absolute.url/to/icon.png",
  };
  let initData = await hashconnect.init(appMetadata, "testnet", false);
  console.log("🚀 ~ file: hashconnect.js ~ line 12 ~ connect ~ initData", initData)
  
  hashconnect.connectToLocalWallet();
  return hashconnect;
};

const makeBytes = async (trans, signingAcctId) => {
  let transId = TransactionId.generate(signingAcctId)
  trans.setTransactionId(transId);
  trans.setNodeAccountIds([new AccountId(3)]);

  await trans.freeze();
  
  let transBytes = trans.toBytes();

  return transBytes;
}

const sendTransaction = async (trans, acctToSign, return_trans = false, hideNfts = false) => {
  const transaction= {
      topic: this.topic,
      byteArray: trans,
      
      metadata: {
          accountToSign: acctToSign,
          returnTransaction: return_trans,
          hideNft: hideNfts
      }
  }

  return await hashconnect.sendTransaction(this.topic, transaction)
}

export { connect, makeBytes, sendTransaction };
