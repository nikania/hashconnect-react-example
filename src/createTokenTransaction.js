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

export default async function CreateTokenTransaction(values, signingAcct, sendTransaction) {
  console.log(
    "🚀 ~ file: App.jsx ~ line 129 ~ onSubmit={ ~ values",
    values
  );
  let accountInfo = await window.fetch(
    "https://testnet.mirrornode.hedera.com/api/v1/accounts/" +
      signingAcct,
    { method: "GET" }
  );
  // let accountInfo:any = await window.fetch("https://mainnet-public.mirrornode.hedera.com/api/v1/accounts/" + signingAcct, { method: "GET" });
  accountInfo = await accountInfo.json();
  console.log("🚀 ~ file: createTokenTransaction.js ~ line 41 ~ CreateTokenTransaction ~ accountInfo", accountInfo)

  let key = await PublicKey.fromString(accountInfo.key.key);
  console.log("🚀 ~ file: createTokenTransaction.js ~ line 44 ~ CreateTokenTransaction ~ key", key)

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

  let transId = TransactionId.generate(signingAcct);
  trans.setTransactionId(transId);
  trans.setNodeAccountIds([new AccountId(3)]);

  await trans.freeze();

  let transBytes = trans.toBytes();
  // console.log("🚀 ~ file: createTokenTransaction.js ~ line 64 ~ CreateTokenTransaction ~ transBytes", transBytes)

  // const transaction = {
  //   topic: topic,
  //   byteArray: transBytes,

  //   metadata: {
  //     accountToSign: signingAcct,
  //     returnTransaction: false,
  //     hideNft: false,
  //   },
  // };

  let res = await sendTransaction(
    transBytes,
    signingAcct
  );
  console.log("🚀 ~ file: createTokenTransaction.js ~ line 81 ~ CreateTokenTransaction ~ res", res)

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
}