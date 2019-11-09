import React from "react";
import styled from "styled-components";

const Container = styled.div`
  /* background-color: ${props => props.theme.lightGrey}; */
  width: ${props => props.theme.maxCardWidth};
  height: 500px;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const Label = styled.div`
  font-size: 16px;
  padding: 10px 25px;
  font-weight: 600;
`;

const transactionsList = [
  {
    txHash: "0x312c0bef09770e0b845f5d51643aa19317ff0cd7",
    TXType: "Smart Contract Execution",
    Block: 11663903,
    Time: "2 hours ago",
    TXFee: 0.5
  },
  {
    TXType: "Value Transfer",
    Block: 11663903,
    txHash: "0x312c0bef09770e0b845f5d51643aa19317ff0cd7",
    Time: "2 hours ago",
    TXFee: 0.5
  },
  {
    TXType: "Smart Contract Execution",
    Block: 11663903,
    txHash: "0x312c0bef09770e0b845f5d51643aa19317ff0cd7",
    Time: "2 hours ago",
    TXFee: 0.5
  },
  {
    TXType: "Smart Contract Execution",
    Block: 11663903,
    txHash: "0x312c0bef09770e0b845f5d51643aa19317ff0cd7",
    Time: "2 hours ago",
    TXFee: 0.5
  },
  {
    TXType: "Smart Contract Execution",
    Block: 11663903,
    txHash: "0x312c0bef09770e0b845f5d51643aa19317ff0cd7",
    Time: "2 hours ago",
    TXFee: 0.5
  }
];

const ListContainer = styled.div`
  padding: 20px;
`;

const Transaction = styled.div`
  ${props => props.theme.whiteBox};
  height: 120px;
  padding: 20px;
  margin-bottom: 20px;
`;

export default () => {
  return (
    <Container>
      <Label>Transactions list</Label>
      <ListContainer>
        {transactionsList.map(tx => {
          return (
            <>
              <Transaction>
                <div>TX type: {tx.TXType}</div>
                <div>Block: {tx.Block}</div>
                <div>tx hash: {tx.txHash}</div>
                <div>time: {tx.Time}</div>
                <div>tx fee: {tx.TXFee}</div>
              </Transaction>
            </>
          );
        })}
      </ListContainer>
    </Container>
  );
};
