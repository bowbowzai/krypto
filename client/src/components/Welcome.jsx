import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { Loader } from "./";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";

const companyCommonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  );
};

export default function Welcome() {
  const {
    connectWallet,
    connectedAccount,
    formData,
    sendTransaction,
    handleChange,
    loading,
  } = useContext(TransactionContext);

  const handleSubmit = () => {
    const { addressTo, amount, keyword, message } = formData;
    if (!addressTo || !amount || !keyword || !message) return;
    sendTransaction();
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col mf:flex-row justify-between items-start md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send Crypto <br /> accross the world
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Buy and sell cryptocurrencies easily on
            Krypto.
          </p>
          {!connectedAccount && (
            <button
              className="flex items-center justify-center my-5 bg-[#2952e3] rounded-full cursor-pointer hover:bg-[#2546bd] py-2 text-white"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          )}

          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Reliability
            </div>
            <div className={`${companyCommonStyles}`}>Security</div>
            <div className={`rounded-tr-2xl ${companyCommonStyles}`}>
              Ethereum
            </div>
            <div className={`rounded-bl-2xl ${companyCommonStyles}`}>
              Web 3.0
            </div>
            <div className={`${companyCommonStyles}`}>Low fees</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Blockchain
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 w-full mt-10 mf:mt-0 items-center">
          <div className="eth-card h-40 flex w-full  sm:w-72 rounded-xl">
            <div className="w-full p-3 flex flex-col justify-between ">
              <div className="w-full flex justify-between">
                <div className="border border-2 border-white rounded-full p-3">
                  <SiEthereum fontSize={25} className="text-white" />
                </div>
                <div>
                  <BsInfoCircle fontSize={25} className="text-white" />
                </div>
              </div>
              <div className="flex flex-col text-white">
                <div>
                  {connectedAccount ? shortenAddress(connectedAccount) : "..."}
                </div>
                <div>Ethereum</div>
              </div>
            </div>
          </div>
          <div className="p-5 blue-glassmorphism mt-5 sm:w-96 w-full">
            <Input
              placeholder="Address To"
              name="addressTo"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              handleChange={handleChange}
            />
            <Input
              placeholder="Keyword (GIF)"
              name="keyword"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Enter message"
              name="message"
              type="text"
              handleChange={handleChange}
            />
            <div className="h-[1px] w-full bg-gray-400 my-2"></div>
            <div>
              {loading ? (
                <Loader />
              ) : (
                <button
                  className="text-white w-full border-[1px] p-2 mt-2 border-[#3d4f7c] rounded-full cursor-pointer"
                  onClick={handleSubmit}
                >
                  Send Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
