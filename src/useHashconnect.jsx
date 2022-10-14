import { HashConnect } from "hashconnect";
import { HashConnectConnectionState } from "hashconnect/dist/types";
import React, { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

//initialize hashconnect
const hashConnect = new HashConnect(true);

// export interface SavedPairingData {
//   metadata: HashConnectTypes.AppMetadata | HashConnectTypes.WalletMetadata;
//   pairingData: MessageTypes.ApprovePairing;
// }

// export interface PropsType {
//   children: React.ReactNode;
//   network:  "testnet" | "mainnet" | "previewnet";
//   metaData?: HashConnectTypes.AppMetadata;
//   debug?: boolean;
// }

// //Intial App config
// let APP_CONFIG: HashConnectTypes.AppMetadata = {
//   name: "dApp Example",
//   description: "An example hedera dApp",
//   icon: "https://absolute.url/to/icon.png",
// };

// export interface HashconnectContextAPI {
//   availableExtension: HashConnectTypes.WalletMetadata;
//   state: HashConnectConnectionState;
//   topic: string;
//   pairingString: string;
//   pairingData: MessageTypes.ApprovePairing | null;
//   acknowledgeData: MessageTypes.Acknowledge;
// }

export const HashConnectAPIContext = React.createContext({
  state: HashConnectConnectionState.Disconnected,
});

export const HashConnectAPIProvider = ({
  children,
  metaData,
  network,
  debug,
}) => {
  const [cookies, setCookie] = useCookies(["hashconnectData"]);
  const [stateData, setState] = useState({});

  const localData = cookies.hashconnectData;

  //initialise the thing
  const initializeHashConnect = useCallback(async () => {
    localStorage.removeItem("hashconnectData");
    try {
      if (!localData) {
        if (debug) console.log("===Local data not found.=====");

        //first init and store the private for later
        let initData = await hashConnect.init(metaData ?? APP_CONFIG, network);

        //then connect, storing the new topic for later
        const topic = await hashConnect.connect();
        hashConnect.findLocalWallets();

        //generate a pairing string, which you can display and generate a QR code from
        const pairingString = hashConnect.generatePairingString(
          topic,
          network,
          debug ?? false
        );
        setState((exState) => ({
          ...exState,
          topic,
          pairingString,
          state: HashConnectConnectionState.Disconnected,
        }));
      } else {
        if (debug) console.log("====Local data found====", localData);
        //use loaded data for initialization + connection
        await hashConnect.init(metaData ?? APP_CONFIG, network);
        await hashConnect.connect(
          localData?.pairingData.topic,
          localData?.pairingData.metadata ?? metaData
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, [debug, localData, metaData, network]);

  const foundExtensionEventHandler = useCallback(
    (data) => {
      if (debug) console.log("====foundExtensionEvent====", data);
      setState((exState) => ({ ...exState, availableExtension: data }));
    },
    [debug]
  );

  const saveDataInLocalStorage = useCallback(
    (data) => {
      if (debug)
        console.info("===============Saving to localstorage::=============");
      const dataToSave = {
        metadata: stateData.availableExtension,
        pairingData: stateData.pairingData,
      };
      setCookie("hashconnectData", dataToSave, { path: "/" });
    },
    [debug]
  );

  const pairingEventHandler = useCallback(
    (data) => {
      if (debug) console.log("===Wallet connected=====", data);
      setState((exState) => ({ ...exState, pairingData: data }));
      saveDataInLocalStorage(data);
    },
    [debug, saveDataInLocalStorage]
  );

  const acknowledgeEventHandler = useCallback(
    (data) => {
      if (debug) console.log("====::acknowledgeData::====", data);
      setState((iniData) => ({ ...iniData, acknowledgeData: data }));
    },
    [debug]
  );

  const onStatusChange = (state) => {
    console.log("hashconnect state change event", state);
    setState((exState) => ({ ...exState, state }));
  };

  useEffect(() => {
    initializeHashConnect();
  }, []);

  useEffect(() => {
    hashConnect.foundExtensionEvent.on(foundExtensionEventHandler);
    hashConnect.pairingEvent.on(pairingEventHandler);
    hashConnect.acknowledgeMessageEvent.on(acknowledgeEventHandler);
    hashConnect.connectionStatusChangeEvent.on(onStatusChange);
    return () => {
      hashConnect.foundExtensionEvent.off(foundExtensionEventHandler);
      hashConnect.pairingEvent.off(pairingEventHandler);
      hashConnect.acknowledgeMessageEvent.off(acknowledgeEventHandler);
    };
  }, []);

  return (
    <HashConnectAPIContext.Provider value={{ ...stateData, setState, network }}>
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

// export const HashConnectProvider = React.memo(HashConnectProviderWarped);

export const useHashConnect = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["hashconnectData"]);
  const value = React.useContext(HashConnectAPIContext);
  const { topic, pairingString, setState } = value;

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

    return await hashConnect.sendTransaction(topic, transaction);
  };

  const disconnect = () => {
    removeCookie("hashconnectData");
    setState((exData) => ({ ...exData, pairingData: null }));
  };

  return { ...value, connectToExtension, sendTransaction, disconnect };
};

export default HashConnectAPIProvider;
