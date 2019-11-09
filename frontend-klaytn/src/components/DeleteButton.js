import React from "react";
import styled from "styled-components";
import Button from "components/Button";
import { getWallet } from "utils/crypto";
import ui from "utils/ui";
import MakersContract from "klaytn/MakersContract";
import { Redirect } from "react-router-dom";

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled(Button)`
  background-color: ${props => props.theme.lightGrey};
`;

const _prohibitMakers = tokenId => {
  MakersContract.methods
    .showMakersState(tokenId)
    .call()
    .then(result => {
      if (result == 0) {
        console.log("이미 종료된 Makers 입니다.");
        return 0;
      } else {
        MakersContract.methods
          .forcedClosure(tokenId)
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
          })
          .once("error", error => {
            ui.showToast({
              status: "error",
              message: error.toString()
            });
          });
      }
    });
};

export default ({ tokenId }) => {
  const onClick = e => {
    _prohibitMakers(tokenId);
    return <Redirect to="/makers/" />;
  };

  return (
    <Container>
      <StyledButton onClick={onClick}>Delete</StyledButton>
    </Container>
  );
};
