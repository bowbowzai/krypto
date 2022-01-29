import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
import React, { createContext, useEffect, useState } from "react";

export const TransactionContext = createContext();

const { ethereum } = window;

const getEthreumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState();
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [loading, setloading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [allTransactions, setAllTransactions] = useState([]);
  const [transactionHash, setTransactionHash] = useState("");

  const checkWalletConnected = async () => {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
      setConnectedAccount(accounts[0]);
      getAllTransactions();
    }
    //console.log(accounts);
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setConnectedAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum Object");
    }
  };

  const checkIfTransactionsExist = async () => {
    try {
      const contract = getEthreumContract();
      const res = await contract.transactionCount();
      const transactionCount = res.toNumber();
      window.localStorage.setItem("transactionCount", transactionCount);
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum Object");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const { addressTo, amount, keyword, message } = formData;
      const contract = getEthreumContract();
      const parsedAmount = ethers.utils.parseEther(amount);
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: connectedAccount,
            to: addressTo,
            value: parsedAmount._hex,
            gas: "0x5208", // 21000 gwei
          },
        ],
      });
      const transactionHash = await contract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );
      setloading(true);
      //console.log(transactionHash);
      await transactionHash.wait();
      setloading(false);
      setTransactionHash(transactionHash);
      const transactionCount = await contract.transactionCount();
      setTransactionCount(transactionCount.toNumber());
      window.location.reload();
      //console.log(transactionCount.toNumber());
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum Object");
    }
  };

  const getAllTransactions = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const contract = getEthreumContract();
      const transactions = await contract.getAllTransactions();
      const structedTransactions = transactions.map((ele) => ({
        addressTo: ele["receiver"],
        addressFrom: ele["sender"],
        message: ele["message"],
        keyword: ele["keyword"],
        timestamp: new Date(
          ele["timestamp"].toNumber() * 1000
        ).toLocaleString(),
        amount: ele["amount"].toNumber() / 10 ** 18,
      }));
      // console.log(transactions);
      setAllTransactions(structedTransactions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  useEffect(() => {
    checkWalletConnected();
    checkIfTransactionsExist();
  }, []);
  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        connectedAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        allTransactions,
        loading,
        transactionHash,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
