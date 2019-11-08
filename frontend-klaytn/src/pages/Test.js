import React from "react";
import styled from "styled-components";
import MakersHeader from "components/MakersHeader";
import { getWallet } from "utils/crypto";
import { connect } from "react-redux";
import ui from "utils/ui";
import MakersContract from "klaytn/MakersContract";
import cav from "klaytn/caver";
import * as makersActions from "redux/actions/makers"

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

// --------------------------------------------------
//  Makers 공동구매 
// --------------------------------------------------

const _investMakers = tokenId => {
  console.log("invest", tokenId);
  // var price = MakersContract.methods.getPriceMakers(tokenId);
  // var price = MakersContract._MakerList[tokenId].price;
  MakersContract.methods.showMakersPrice(tokenId).call()
    .then(price => {
      if (!price) {
        return 0;
      }
      // -------------------
      MakersContract.methods.investMakers(tokenId)
        .send({
          from: getWallet().address,
          gas: "200000000",
          value: cav.utils.toPeb(price.toString(), "KLAY")
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
    });

}

// --------------------------------------------------
//  Makers 임의 종료
// --------------------------------------------------

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

const TokenId = 1;

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


const test = (props) => {
  const check = e => {
    props._showMyMakers(props.userAddress);
  }
  return (
    <Container>
      <MakersHeader />
      <Button onClick={remove} value={TokenId}>
        removeMakers
      </Button>
      <Button onClick={invest} value={TokenId}>
        investMakers
      </Button>
      <Button onClick={check} value={props.userAddress}>
        checkMakers
      </Button>
    </Container>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  userAddress: state.auth.address
});

const mapDispatchToProps = dispatch => ({
  _showMyMakers: (addressId) => dispatch(makersActions._showMyMakers(addressId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(test);