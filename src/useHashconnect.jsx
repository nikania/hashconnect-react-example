import { HashConnect } from "hashconnect";
import { HashConnectConnectionState } from "hashconnect/dist/types";
import React, { useCallback, useEffect, useState } from "react";

//initialize hashconnect
const hashConnect = new HashConnect(true);

export const HashConnectAPIContext = React.createContext({
  state: HashConnectConnectionState.Disconnected,
});

export const HashConnectAPIProvider = ({
  children,
  metaData,
  network,
  debug,
}) => {
  const [state, setState] = useState({
    appMetadata: {
      name: "dApp Example",
      description: "An example hedera dApp",
      icon: "https://www.hashpack.app/img/logo.svg",
    },
    availableExtension: null,
    state: HashConnectConnectionState.Disconnected,
    topic: null,
    pairingString: null,
    pairingData: null,
  });

  const initializeHashConnect = useCallback(async () => {
    const initData = await hashConnect.init(
      state.appMetadata,
      "testnet",
      false
    );
    console.log(
      "🚀 ~ file: useHashconnect.jsx ~ line 37 ~ initialize ~ initData",
      initData
    );
    setState((prev) => ({ ...prev, topic: initData.topic }));
    setState((prev) => ({ ...prev, pairingString: initData.pairingString }));

    //Saved pairings will return here, generally you will only have one unless you are doing something advanced
    setState((prev) => ({ ...prev, pairingData: initData.savedPairings[0] }));
  }, [debug, network]);

  useEffect(() => {
    initializeHashConnect();
  }, []);

  useEffect(() => {
    //This is fired when a extension is found
    hashConnect.foundExtensionEvent.on((data) => {
      console.log("============Found extension", data);
      setState((prev) => ({ ...prev, availableExtension: data }));
    });

    //This is fired when a wallet approves a pairing
    hashConnect.pairingEvent.on((data) => {
      console.log("============Paired with wallet", data);
      setState((prev) => ({ ...prev, pairingData: data.pairingData }));
    });

    //This is fired when HashConnect loses connection, pairs successfully, or is starting connection
    hashConnect.connectionStatusChangeEvent.on((state) => {
      console.log("=============hashconnect state change event", state);
      setState((prev) => ({ ...prev, state: state }));
    });
  }, []);

  return (
    <HashConnectAPIContext.Provider value={{ ...state, setState, network }}>
      {children}
    </HashConnectAPIContext.Provider>
  );
};

const defaultProps = {
  metaData: {
    name: "dApp Example",
    description: "An example hedera dApp",
    icon: "https://absolute.url/to/icon.png",
  },
  network: "testnet",
  debug: false,
};

HashConnectAPIProvider.defaultProps = defaultProps;

export const useHashConnect = () => {
  const value = React.useContext(HashConnectAPIContext);
  const { topic, pairingData, setState } = value;

  const connectToExtension = async () => {
    //this will automatically pop up a pairing request in the HashPack extension
    hashConnect.connectToLocalWallet();
  };

  const sendTransaction = async (
    trans,
    acctToSign,
    return_trans = false,
    hideNfts = false
  ) => {
    const transaction = {
      topic: topic,
      byteArray: trans,

      metadata: {
        accountToSign: acctToSign,
        returnTransaction: return_trans,
      },
    };
    console.log(
      "🚀 ~ file: useHashconnect.jsx ~ line 197 ~ useHashConnect ~ transaction",
      transaction
    );

    return await hashConnect.sendTransaction(topic, transaction);
  };

  const disconnect = () => {
    setState((prev) => ({ ...prev, pairingData: null }));
  };

  return { ...value, connectToExtension, sendTransaction, disconnect };
};

export default HashConnectAPIProvider;
