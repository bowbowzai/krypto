// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract Transactions {
  uint256 public transactionCount;

  struct TransferStruct {
    address sender;
    address receiver;
    uint256 amount;
    string message;
    uint256 timestamp;
    string keyword;
  }

  TransferStruct[] public transactions;

  event Transfer(
    address indexed from,
    address to,
    uint256 amount,
    string message,
    uint256 timestamp,
    string keyword
  );
 
  function addToBlockchain(
    address _receiver,
    uint256 _amount,
    string memory _message,
    string memory _keyword
  ) public {
    transactionCount++;
    transactions.push(TransferStruct(msg.sender, _receiver, _amount, _message, block.timestamp, _keyword));
    emit Transfer(msg.sender, _receiver, _amount, _message, block.timestamp, _keyword);
  }

  function getAllTransactions() public view returns (TransferStruct[] memory) {
    return transactions;
  }
}