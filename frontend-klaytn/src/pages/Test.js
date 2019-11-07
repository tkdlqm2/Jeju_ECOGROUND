import React from "react";
import styled from "styled-components";
import MakersHeader from "components/MakersHeader";
import { getWallet } from "utils/crypto";
import ui from "utils/ui";
import MakersContract from "klaytn/MakersContract";
import cav from "../../klaytn/caver";

const Container = styled.main`
  width: 100%;
  min-height: 100%;
  min-width: ${props => props.theme.maxCardWidth};
  max-width: ${props => props.theme.maxCardWidth};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  margin-bottom: 20px;
  margin-top: 20px;
  width: 100px;
`;

const _investMakers = tokenId => {
  console.log("invest", tokenId);
  MakersContract.methods.investMakers(tokenId)
    .send({
      from: getWallet().address,
      gas: "200000000",
      value: cav.utils.toPeb(MakersContract._MakersPrice[tokenId], "KLAY")
    })
    .once("transactionHash", txHash => {
      console.log("txHash:", txHash);
      ui.showToast({
        status: "pending",
        message: `Sending a transaction... (uploadPhoto)`,
        txHash
      });
    })
    .once("receipt", receipt => {
      ui.showToast({
        status: receipt.status ? "success" : "fail",
        message: `Received receipt! It means your transaction is
          in klaytn block (#${receipt.blockNumber}) (uploadPhoto)`,
        link: receipt.transactionHash
      });
      const tokenId = receipt.events.MakersUploaded.returnValues[0];
      console.log("tokenId: ", tokenId);
    })
    .once("error", error => {
      ui.showToast({
        status: "error",
        message: error.toString()
      });
    });
}

const _removeMakers = tokenId => {
  console.log("remove", tokenId);
  MakersContract.methods
    .removeMakers(tokenId)
    .send({
      from: getWallet().address,
      gas: "200000000"
    })
    .once("transactionHash", txHash => {
      console.log("txHash:", txHash);
      ui.showToast({
        status: "pending",
        message: `Sending a transaction... (uploadPhoto)`,
        txHash
      });
    })
    .once("receipt", receipt => {
      ui.showToast({
        status: receipt.status ? "success" : "fail",
        message: `Received receipt! It means your transaction is
          in klaytn block (#${receipt.blockNumber}) (uploadPhoto)`,
        link: receipt.transactionHash
      });
      const tokenId = receipt.events.MakersUploaded.returnValues[0];
      console.log("tokenId: ", tokenId);
    })
    .once("error", error => {
      ui.showToast({
        status: "error",
        message: error.toString()
      });
    });
};

const TokenId = 123;

const invest = e => {
  const invest_value = e.target.value;
  console.log(invest_value);
  _investMakers(invest_value);
};

const remove = e => {
  const remove_value = e.target.value;
  console.log(remove_value);
  _removeMakers(remove_value);
};

export default () => {
  return (
    <Container>
      <MakersHeader />
      <Button onClick={remove} value={TokenId}>
        removeMakers
      </Button>
      <Button onClick={invest} value={TokenId}>
        investMakers
      </Button>
      <Button>test4</Button>
    </Container>
  );
};
