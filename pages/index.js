import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";
import { abi } from "../constants/abi";

const injected = new InjectedConnector();

export default function Home() {
  const [hasMetamask, setHasMetamask] = useState(false);
  const [cokes, setCokes] = useState([]);
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState("");

  const hexToDecimal = (hex) => parseInt(hex, 16);
  const mansoor = "0x84d1d7a0bD026F38A34356fd6d086235dA48F248";
  const sarmad = "0xdcEE744ddAF709126b85d704b28ec087AFee598a";

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
      execute();
      acbalan();
    }
  });

  const {
    activate,
    active,
    library: provider,
    chainId,
    account,
    deactivate,
  } = useWeb3React();
  async function connect() {
    try {
      await activate(injected);
      setHasMetamask(true);
    } catch (e) {
      console.log(e);
    }
  }

  async function acbalan() {
    provider?.getBalance(account).then((result) => {
      setBalance(result / 1e18);
    });
  }
  //0x84d1d7a0bD026F38A34356fd6d086235dA48F248

  async function execute() {
    if (active) {
      const signer = provider.getSigner();
      const contractAddress = "0x3f59F5254e561aC878304fcc0F7CB136F2AAf260";
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        let balance = [];
        balance = await contract.getVendingMachineBalance();
        setCokes(hexToDecimal(balance._hex));
        console.log(cokes);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function buyCoke(amo) {
    if (active) {
      const signer = provider.getSigner();
      const contractAddress = "0x3f59F5254e561aC878304fcc0F7CB136F2AAf260";
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        let tx = await contract.purchase(amo, {
          value: ethers.utils.parseEther("0.001"),
        });
        console.log(tx);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <Image src="/coke.svg" height={200} width={200} />
        <h1 style={{ fontSize: "80px", color: "wheat" }}>
          Coca-Cola Vending Machine
        </h1>
      </div>
      <div>
        <strong>Network</strong> :{" "}
        {chainId == 5 ? "Goerli Test Network" : "Connected"}
      </div>
      <div>
        {account == mansoor ? "Hi Mansoor ✅" : ""}
        {account == sarmad ? "Hi Sarmad" : ""}
      </div>
      <div>
        <strong>Account</strong> : {account}
      </div>
      <div>
        <strong>Balance</strong> : {balance} ETH{" "}
      </div>
      <div className={styles.cont}>
        {hasMetamask ? (
          active ? (
            <div className={styles.MetaMask}>
              <span>
                <h3>
                  Connected to MetaMask
                  <Image
                    className={styles.logo}
                    src="/metamask.svg"
                    height={30}
                    width={30}
                  />
                </h3>
              </span>
            </div>
          ) : (
            <button onClick={() => connect()}>Connect</button>
          )
        ) : (
          "Please install metamask"
        )}

        {active ? <button onClick={deactivate}>Disconnect</button> : ""}
        {active ? (
          <div className={styles.buy}>
            <h1>Cokes Available : {cokes}</h1>
            <h3>You want to buy some coke ?</h3>
            <div className={styles.inp}>
              <label>Enter Amount of Coke : </label>
              <input
                style={{ textAlign: "center", height: "2em" }}
                type="text"
                onChange={handleChange}
              ></input>
            </div>
            <br></br>
            <button onClick={() => buyCoke(amount)}>Buy Coke</button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
