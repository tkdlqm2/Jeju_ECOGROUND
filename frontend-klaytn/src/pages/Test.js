import React from "react";
import styled from "styled-components";
import MakersHeader from "components/MakersHeader";
import { getWallet } from "utils/crypto";
import { connect } from "react-redux";
import ui from "utils/ui";
import MakersContract from "klaytn/MakersContract";
import cav from "klaytn/caver";
import * as makersActions from "redux/actions/makers";

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

const _showTargetKlay = tokenId => {
  console.log("_showTargetKlay 함수 호출");

  MakersContract.methods
    .showTargetKlay(tokenId)
    .call()
    .then(targetKlay => {
      if (!targetKlay) {
        return 0;
      }
      console.log("-----------------");
      console.log("targetKlay : ", targetKlay);
      console.log("-----------------");
    });
};

// --------------------------------------------------
//  MyMakers 확인
// --------------------------------------------------

const _checkMyMakers = addressId => {
  console.log("checkMyMakers 호출");

  MakersContract.methods
    .showMyMakers(addressId)
    .call()
    .then(Makers => {
      if (!Makers) {
        return 0;
      }
      console.log("-----------------------------");
      for (let i = Makers.length; i > 0; i--) {
        console.log(MakersContract.methods.getMakers(i));
      }
      console.log("-----------------------------");
    });
};

// --------------------------------------------------
//  Makers 현재 모금액 확인
// --------------------------------------------------

const _checkDonate = tokenId => {
  console.log("checkNodate 호출");

  MakersContract.methods
    .parentStateMakers(tokenId)
    .call()
    .then(donate => {
      if (!donate) {
        return 0;
      }
      console.log("---------< donate >---------------");
      console.log(donate);
      console.log("-----------------------------");
    });
};

// --------------------------------------------------
//  Makers 임의 종료
// --------------------------------------------------

const _removeMakers = tokenId => {
  console.log("refund 함수 호출");

  MakersContract.methods
    .checkMakersStatus(tokenId)
    .call()
    .then(state => {
      if (state == 0) {
        console.log("종료된 Makers 입니다.");
        return 0;
      } else {
        MakersContract.methods
          .showMakersPrice(tokenId)
          .call()
          .then(price => {
            if (!price) {
              return 0;
            }
            // -------------------
            console.log(price);
            MakersContract.methods
              .showInvestor(tokenId)
              .call()
              .then(buyer => {
                if (!buyer) {
                  return 0;
                }
                MakersContract.methods.removeMakers(tokenId);
                console.log("------------------");
                console.log(buyer[0]);
                console.log(buyer[1]);
                console.log("------------------");
                for (let i = 0; i < buyer.length; i++) {
                  console.log("i : ", i);
                  MakersContract.methods
                    .returnklay(buyer[i])
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
                    })
                    .once("error", error => {
                      ui.showToast({
                        status: "error",
                        message: error.toString()
                      });
                    });
                }
              });
          });
      }
    });
};

// --------------------------------------------------
//  Makers 공동구매
// --------------------------------------------------

const _investMakers = tokenId => {
  console.log("invest", tokenId);
  // var price = MakersContract.methods.getPriceMakers(tokenId);
  // var price = MakersContract._MakerList[tokenId].price;

  MakersContract.methods
    .successMakers(tokenId)
    .call()
    .then(result => {
      if (result == true) {
        console.log("모금액을 모두 달성하여서 참여 불가능함.");
        return 0;
      } else {
        MakersContract.methods
          .showMakersPrice(tokenId)
          .call()
          .then(price => {
            if (!price) {
              return 0;
            }
            // -------------------
            MakersContract.methods
              .investMakers(tokenId)
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
              })
              .once("error", error => {
                ui.showToast({
                  status: "error",
                  message: error.toString()
                });
              });
          });
      }
    });
};

const TokenId = 2;

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

const checkDonate = e => {
  const checkDonate_value = e.target.value;
  console.log(checkDonate_value);
  _checkDonate(checkDonate_value);
};

const showTargetKlay = e => {
  const showTarget_value = e.target.value;
  console.log(showTarget_value);
  _showTargetKlay(showTarget_value);
};

const test = props => {
  const check = e => {
    // props._showMyMakers(props.userAddress);
    const checkMyMakers = e.target.value;
    console.log(checkMyMakers);
    _checkMyMakers(checkMyMakers);
  };

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
      <Button onClick={checkDonate} value={TokenId}>
        checkDonate
      </Button>
      <Button onClick={showTargetKlay} value={TokenId}>
        showTargetKlay
      </Button>
    </Container>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  userAddress: state.auth.address
});

const mapDispatchToProps = dispatch => ({
  _showMyMakers: addressId => dispatch(makersActions._showMyMakers(addressId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(test);
