import React, { useContext } from "react";

import dummy_data from "../utils/dummy_data";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import useFetch from "../hooks/useFetch";

const TransactionCard = ({
  addressTo,
  addressFrom,
  amount,
  message,
  timestamp,
  keyword,
  url,
}) => {
  const gifUrl = useFetch({ keyword });
  return (
    <div
      className="bg-[#181918] m-4 flex flex-1 2xl:min-w-[450px]
  2xl:max-w-[500px]
  sm:min-w-[270px]
  sm:max-w-[300px]
  min-w-full
  flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center justify-center mt-3">
        <div className="w-full mb-6 p-2">
          <a
            href={`https://ropsten.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <p className="text-white">From: {shortenAddress(addressFrom)}</p>
          </a>
          <a
            href={`https://etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <p className="text-white">To: {shortenAddress(addressTo)}</p>
          </a>
          <p className="text-white">Amount: {amount} ETH</p>
          <a
            href={`https://etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <p className="text-white">
              Transaction Record: {shortenAddress(addressTo)}
            </p>
          </a>
          {message && <p className="text-white mt-3">Message: {message}</p>}
        </div>
        <img
          src={gifUrl || url}
          alt={keyword}
          className="w-ull h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
        <div className="p-3 px-5 bg-black -mt-5 rounded-3xl shadow-2xl w-max z-10">
          <p className="text-[#37c7da] font-bold ">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

export default function Transactions() {
  const { connectedAccount, allTransactions } = useContext(TransactionContext);
  return (
    <div className="flex w-full items-center justify-center gradient-bg-transactions 2xl:px-20">
      <div className="flex flex-col md:p-12 py-12 px-4 justify-center items-center">
        {!connectedAccount ? (
          <h1 className="text-white text-3xl">
            Connect your account to see the latest transactions
          </h1>
        ) : (
          <h1 className="text-white text-3xl">Latest Transactions</h1>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center">
          {allTransactions.reverse().map((element, index) => (
            <TransactionCard key={index} {...element} />
          ))}
        </div>
      </div>
    </div>
  );
}
