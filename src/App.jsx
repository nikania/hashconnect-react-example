import "./App.css";
import "antd/dist/antd.css";
import { Button, Card, Space, Layout, Tabs, Collapse } from "antd";
import React from "react";
import { useHashConnect } from "./hooks/useHashconnect";
import AccountTab from "./tabs/AccountTab";
import TokenTab from "./tabs/TokenTab";
import SmartContractTab from "./tabs/SmartContractTab";
import ConsensusTab from "./tabs/ConsensusTab";
import FileTab from "./tabs/FileTab";

const { Panel } = Collapse;

const { Header, Content, Footer } = Layout;
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

  // !!! USE TABS FOR DIFFERNT TYPES OF ACTIONS!!! like HTS HCS account etc
  // for each tab - different component
  const items = [
    { label: "Account", key: "Account", children: <AccountTab /> }, // remember to pass the key prop
    { label: "Token Service", key: "Token", children: <TokenTab /> },
    {
      label: "SmartContract",
      key: "SmartContract",
      children: <SmartContractTab />,
    },
    {
      label: "Consensus Service",
      key: "Consensus",
      children: <ConsensusTab />,
    },
    { label: "File Service", key: "File", children: <FileTab /> },
  ];

  return (
    <Layout className="layout">
      <Header>
        <h1 className="logo">Hashconnect React Example</h1>
      </Header>
      <Content className="site-layout-content">
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          {pairingData != null && (
            <Collapse size="small">
              <Panel header="HashPack Connection Info">
                <p>Network: {network}</p>
                <p>Account Id: {pairingData.accountIds}</p>
              </Panel>
            </Collapse>
          )}

          <Space>
            <Button disabled={pairingData != null} type="primary" onClick={connectToExtension}>
              Connect HashPack
            </Button>
            <Button disabled={pairingData == null} type="primary" onClick={disconnect}>
              Disconnect HashPack
            </Button>
          </Space>
          <Tabs centered items={items} />
        </Space>
      </Content>
      <Footer style={{ textAlign: "center" }}>2022 Created with Ant Design </Footer>
    </Layout>
  );
}

export default App;
