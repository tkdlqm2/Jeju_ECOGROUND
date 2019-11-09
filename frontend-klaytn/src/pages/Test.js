import React from "react";
import styled from "styled-components";
import MakersHeader from "components/MakersHeader";
import { getWallet } from "utils/crypto";
import { connect } from "react-redux";
import ui from "utils/ui";
import MakersContract from "klaytn/MakersContract";
import cav from "klaytn/caver";
import * as makersActions from "redux/actions/makers";
import EcoTokenContract from "klaytn/EcoTokenContract";

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
// 메이커스 강제 종료
// --------------------------------------------------

const _prohibitMakers = tokenId => {

  MakersContract.methods.showMakersState(tokenId).call()
    .then(result => {
      if (result == 0) {
        console.log("이미 종료된 Makers 입니다.");
        return 0;
      } else {
        MakersContract.methods.forcedClosure(tokenId)
          .send({
            from: getWallet().address,
            gas: "200000000",
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
    })
}
// --------------------------------------------------
//  MyMakers 확인 (master)
// --------------------------------------------------

const _checkMyMakers = addressId => {
  console.log("checkMyMakers 호출");

  MakersContract.methods.showMyMakers_cutsomer(addressId).call()
    .then(Makers => {
      if (Makers.length == 0) {
        console.log("해당되는 Makers가 없습니다.");
        return 0;
      }
      console.log("-----------------------------")
      for (let i = Makers.length; i > 0; i--) {
        console.log(MakersContract.methods.getMakers(i));
      }
      console.log("-----------------------------")

    });
}

// --------------------------------------------------
// MyMakers 확인 (운영진)
// --------------------------------------------------

const _check_master = addressId => {
  console.log("_check_master 호출 됨");

  MakersContract.methods.showMyMakers(addressId).call()
    .then(Makers => {
      if (Makers.length == 0) {
        console.log("해당되는 Makers가 없습니다.");
        return 0;
      }
      console.log("-----------------------------");
      for (let i = Makers.length; i > 0; i--) {
        console.log(MakersContract.methods.getMakers(i));
      }
      console.log("-----------------------------")
    });
}

// --------------------------------------------------
// Makers 상태 확인함수.
// --------------------------------------------------

const _showState = tokenId => {
  console.log("showState 함수 호출");

  MakersContract.methods.checkMakersStatus(tokenId).call()
    .then(state => {
      console.log("state: ", state);
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
  console.log("showMakersState 함수 호출");


  MakersContract.methods.showMakersState(tokenId).call()
    .then(result => {
      if (result == 0) {
        MakersContract.methods.showMakersPrice(tokenId).call()
          .then(price => {
            if (!price) {
              return 0;
            } // getTransactionReceipt _
            MakersContract.methods.showInvestor(tokenId).call()
              .then(buyer => {
                if (!buyer) {
                  console.log("투자자가 없어서 환불 처리는 없습니다.");
                  return 0;
                } else {
                  console.log("buyer수 :  ", buyer.length);
                  console.log("returnKlay 함수 호출");

                  for (let i = 0; i < buyer.length; i++) {
                    MakersContract.methods.returnklay(buyer[i])
                      .send({
                        from: getWallet().address,
                        gas: "20000000",
                        value: cav.utils.toPeb(price.toString(), "KLAY"),
                        // nonce: getAccount().address.account.nonce + i
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
                        console.log(error);

                        ui.showToast({
                          status: "error",
                          message: error.toString()
                        });
                      });
                  }
                }
              })
          })
      } else {
        console.log("종료된 Makers가 아니라 환불 처리가 불가능합니다.");
      }
    });
}

// --------------------------------------------------
//  Makers 공동구매 
// --------------------------------------------------

const _investMakers = tokenId => {
  console.log("invest", tokenId);


  MakersContract.methods.showMakersState(tokenId).call()
    .then(result => {
      if ((result === 0) || (result === 2)) {
        console.log("종료된 메이커스 입니다.");
        return 0;
      } else {

        MakersContract.methods.prohibitOverlap(tokenId).call()
          .then(result2 => {
            if (result2 == false) {
              console.log("이미 참여한 Makers 입니다.");
              return 0;
            } else {
              MakersContract.methods.showMakersPrice(tokenId).call()
                .then(price => {
                  if (!price) {
                    return 0;
                  }

                  console.log()

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
                    })
                    .once("error", error => {
                      console.log("_Invest Error");
                      console.log(error);
                      ui.showToast({
                        status: "error",
                        message: error.toString()
                      });
                    });
                });
            }
          })
      }
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


// TokenID로 하드코딩 되어 있어서, 해당 Makers 의 TokenID 값을 불러와서 이 함수 불러와주면 됨.
const checkDonate = e => {
  const checkDonate_value = e.target.value;
  console.log(checkDonate_value);
  _checkDonate(checkDonate_value);
};

const showTargetKlay = e => {
  const showTarget_value = e.target.value;
  console.log(showTarget_value);
  _showTargetKlay(showTarget_value);
}

const showState = e => {
  const state_value = e.target.value;
  console.log(state_value);
  _showState(state_value);
};

// 메이커스 강제 종료
const prohibitMakers = e => {
  const prohibit_value = e.target.value;
  console.log(prohibit_value);
  _prohibitMakers(prohibit_value);
};


// ------------------------------------------------------------------------------------
//                        Eco Toekn Logic (ERC20)
// ------------------------------------------------------------------------------------

const _showMyToken = addressId => {
  console.log("_showMyToken 호출");

  EcoTokenContract.methods.balanceOf(addressId).call()
    .then(result => {
      console.log("총 보유 Eco Token : ", result);
    });
}




const test = (props) => {
  const check_customer = e => {
    // props._showMyMakers(props.userAddress);
    const checkMyMakers = e.target.value;
    console.log(checkMyMakers);
    _checkMyMakers(checkMyMakers);
  };

  const check_master = e => {
    const Makers = e.target.value;
    console.log(Makers)
    _check_master(Makers);
  }

  const showMyToken = e => {
    const showMyToken_value = e.target.value;
    console.log(showMyToken_value);
    _showMyToken(showMyToken_value);
  };

  return (
    <Container>
      <MakersHeader />
      <Button onClick={remove} value={TokenId}>
        refund
      </Button>
      <Button onClick={invest} value={TokenId}>
        investMakers
      </Button>
      <Button onClick={check_customer} value={props.userAddress}>
        checkMakers (customer)
      </Button>
      <Button onClick={check_master} value={props.userAddress}>
        checkMakers (master)
      </Button>
      <Button onClick={checkDonate} value={TokenId}>
        checkDonate
      </Button>
      <Button onClick={showTargetKlay} value={TokenId}>
        showTargetKlay
      </Button>
      <Button onClick={showState} value={TokenId}>
        showState
      </Button>
      <Button onClick={prohibitMakers} value={TokenId}>
        prohibitMakers
      </Button>
      <Button onClick={showMyToken} value={props.userAddress}>
        ERC20_showMyToken
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
