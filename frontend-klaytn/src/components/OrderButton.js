import React from "react";
import styled from "styled-components";
import { HeartFull } from "./Icons";
import MakersContract from "klaytn/MakersContract";
import cav from "klaytn/caver";
import ui from "utils/ui";
import { getWallet } from "utils/crypto";
import EcoTokenContract from "klaytn/EcoTokenContract";
import * as makersActions from "redux/actions/makers";
import dealService from '../api/deal';

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LikeButton = styled.span`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.headerColor};
`;

const Order = styled.div`
  display: grid;
  grid-template-columns: 4fr 9fr;
  height: 65px;
  width: 100%;
  position: fixed;
  bottom: 0;
  max-width: ${props => props.theme.maxCardWidth};
`;

const LikeText = styled.div`
  font-size: 10px;
  margin-top: 8px;
  font-weight: 200;
  color: ${props => props.theme.white};
`;

const OrderText = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme.white};
`;

const OrderButton = styled.button`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.lightGreen};
  width: 100%;
  font-size: 12px;
  text-align: center;
  font-weight: 300;
  padding: 7px 0px;
  border: 0;
  @import url("https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap");
  font-family: -apple-system, "Noto Sans KR", sans-serif, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans";
`;

async function getCount(address) {
  const cnt = await cav.klay.getTransactionCount(address)
  return cnt
}

export default ({ userAddress, tokenId }) => {
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

                    getCount(getWallet().address).then(cnt => {

                      MakersContract.methods.investMakers(tokenId)
                        .send({
                          from: getWallet().address,
                          gas: "200000000",
                          value: cav.utils.toPeb(price.toString(), "KLAY"),
                          nonce: cnt + 1
                        })
                        .once("transactionHash", txHash => {
                          console.log("txHash:", txHash);

                          // TODO : param1 : txHash
                          // TODO : 여기!
                          dealService.registerDeal(txHash);


                          ui.showToast({
                            status: "pending",
                            message: `Sending a transaction... (uploadPhoto)`,
                            txHash
                          });
                        })
                        .once("receipt", receipt => {
                          ui.showToast({
                            status: receipt.status ? "success" : "fail",
                            message: `Received receipt! It means your transaction is in klaytn block (#${receipt.blockNumber}) (uploadPhoto)`,
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
                    })
                  });

                console.log("------------------------------------");
                console.log("reward Eco power");
                console.log("------------------------------------");

                EcoTokenContract.methods.transfer(getWallet().address, 3)
                  .send({
                    from: getWallet().address,
                    gas: "200000000",
                  })
                  .once("receipt", receipt => {
                    console.log("Eco power 영수증");
                    ui.showToast({
                      status: receipt.status ? "success" : "fail",
                      message: `Received receipt! It means your transaction isin klaytn block (#${receipt.blockNumber}) (uploadPhoto)`,
                      link: receipt.transactionHash
                    });
                  })
                  .once("error", error => {
                    console.log(error);
                    ui.showToast({
                      status: "error",
                      message: error.toString()
                    });
                  })

              }
            })
        }
      });
  };
  //   const _investMakers = tokenId => {
  //     console.log("invest token id: ", tokenId);
  //     // var price = MakersContract.methods.getPriceMakers(tokenId);
  //     // var price = MakersContract._MakerList[tokenId].price;

  //     MakersContract.methods
  //       .successMakers(tokenId)
  //       .call()
  //       .then(result => {
  //         if (result === true) {
  //           console.log("모금액을 모두 달성하여서 참여 불가능함.");
  //           return 0;
  //         } else {
  //           MakersContract.methods
  //             .showMakersPrice(tokenId)
  //             .call()
  //             .then(price => {
  //               if (!price) {
  //                 return 0;
  //               }
  //               // -------------------
  //               MakersContract.methods
  //                 .investMakers(tokenId)
  //                 .send({
  //                   from: getWallet().address,
  //                   gas: "200000000",
  //                   value: cav.utils.toPeb(price.toString(), "KLAY")
  //                 })
  //                 .once("transactionHash", txHash => {
  //                   console.log("txHash:", txHash);
  //                   ui.showToast({
  //                     status: "pending",
  //                     message: `Sending a transaction... (uploadPhoto)`,
  //                     txHash
  //                   });
  //                 })
  //                 .once("receipt", receipt => {
  //                   ui.showToast({
  //                     status: receipt.status ? "success" : "fail",
  //                     message: `Received receipt! It means your transaction is
  //                         in klaytn block (#${receipt.blockNumber}) (uploadPhoto)`,
  //                     link: receipt.transactionHash
  //                   });
  //                 })
  //                 .once("error", error => {
  //                   ui.showToast({
  //                     status: "error",
  //                     message: error.toString()
  //                   });
  //                 });
  //             });
  //         }
  //       });
  //   };
  const onClick = e => {
    console.log("click!!", tokenId, userAddress);
    _investMakers(tokenId);
  };

  return (
    <Container>
      <Order>
        <LikeButton>
          <HeartFull />
          <LikeText>좋아요</LikeText>
        </LikeButton>
        <OrderButton>
          <OrderText onClick={onClick}>신청하기</OrderText>
        </OrderButton>
      </Order>
    </Container>
  );
};
