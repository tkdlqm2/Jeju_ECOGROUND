import React, { Component } from "react";
import styled from "styled-components";
import cav from "klaytn/caver";
import dealService from "../../api/deal";

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

const ListContainer = styled.div`
  padding: 20px;
  margin-left: 30px;
  margin-right: 30px;
`;

const Transaction = styled.div`
  ${props => props.theme.whiteBox};
  height: 120px;
  padding: 25px;
  margin-bottom: 20px;
`;

const LeftBox = styled.div`
  width: 14%;
  height: 100%;
  float: left;
  box-sizing: border-box;
`;

const RightBox = styled.div`
  width: 82%;
  height: 100%;
  float: right;
  box-sizing: border-box;
`;

const TXtypeBox = styled.div`
  width: 100%;
  height: 100%;
  float: left;
  box-sizing: border-box;
`;

const BlockBox = styled.div`
  width: 70%;
  height: 60%;
  float: left;
  box-sizing: border-box;
  font-size: 24px;
  padding: 8px;
  color: #17202e;
  font-weight: bold;
`;

const ValueBox = styled.div`
  width: 30%;
  height: 60%;
  float: left;
  box-sizing: border-box;
  font-size: 24px;
  padding: 8px;
  text-align: center;
  color: #03a87c;
  font-weight: bold;
`;

const HashBox = styled.div`
  width: 100%;
  height: 40%;
  box-sizing: border-box;
  clear: both;
  float: left;
  font-size: 16px;
  padding: 8px;
  color: #cccccc;
`;

const transactionsList = [
  {
    TXType: "Value Transfer",
    Block: "11663906",
    Value: "0.5",
    txHash: "0x312c0bef09770e0b845f5d51643aa19317ff0cd7"
  },
  {
    TXType: "Value Transfer",
    Block: 11663905,
    Value: 0.5,
    txHash: "0x312c0bef09770e0b845f5d51643aa19317ff0cd1"
  },
  {
    TXType: "Legacy",
    Block: 11663904,
    Value: 0.5,
    txHash: "0x312c0bef09770e0b845f5d51643aa19317ff0cd2"
  },
  {
    TXType: "Contract Execution",
    Block: 11663903,
    Value: 0.5,
    txHash: "0x312c0bef09770e0b845f5d51643aa19317ff0cd3"
  }
];
// const real_result

// const showTracking = e => {

//   dealService.getDealList().then(result => {
//     _showTracking(result);
//   }).then(result2 => {
//     real_result = result2;
//   });
// };

// const _showTracking = data => {

//   // [1] sesstion storag에 있는 JWT로 조회

//   console.log("_showTracking 호출");
//   console.log("data : ", data);
//   console.log(typeof data);
//   console.log("-----------------------")
//   console.log(data[0]);
//   console.log(data[0].Deals[0].id);
//   console.log("data.length: ", data.length);
//   for (let i = 0; i < data.length; i++) {
//     cav.klay.getTransactionReceipt(data[i].Deals[i].hash).then(result => {
//       var resultList = new Array();
//       resultList[0] = result.type.toString();         // tx타입
//       resultList[1] = result.blockNumber.toString();  // 블록번호
//       resultList[2] = result.value.toString();        // value 값 (가격)
//       resultList[3] = data[i].Deals[i].hash.toString();           // tx주소값

//       console.log(resultList);
//       return resultList;
//     });
//   }
// }

// const TXIcons = (TXType) => {
//   const T = styled.div`
//     img src:"https://1.bp.blogspot.com/-N4t_kyWaVYI/Xcah33kQj7I/AAAAAAAAADk/nCQesMFLZjMx8ZTuz8rG4jUrPu1VzwWAgCLcBGAsYHQ/s1600/ValueTransfer.png";
//     width: 68;
//     height: 68;
//   `
//   const L = styled.div`
//     img src:"https://1.bp.blogspot.com/-qtS-uZNAMFk/Xcah3xtliUI/AAAAAAAAADo/r5XuH-6LSp0HWJHQeE12TtQbXnBDdFWjQCLcBGAsYHQ/s1600/Legacy.png";
//     width: 68;
//     height: 68;
//   `
//   const CE = styled.div`
//     img src:"https://1.bp.blogspot.com/-fJOx3fNnbJE/Xcalff3U1SI/AAAAAAAAAD8/VLVu3XXp4mYjzm8HLh4A3TVv_O7GaX5lQCLcBGAsYHQ/s1600/ContractExecution.jpg";
//     width: 68;
//     height: 68;
//   `
//   if (TXType === "Value Transfer"){
//     return T
//   } else if (TXType === "Legacy"){
//     return L
//   } else {
//     return CE
//   }
// }

export default () => {
  return (
    <Container>
      <Label>Transactions list</Label>
      <ListContainer>
        {transactionsList.map(tx => {
          return (
            <>
              <Transaction>
                <LeftBox>
                  <TXtypeBox>
                    <img
                      src="https://1.bp.blogspot.com/-m45An_Kv8oA/XccT8A41ldI/AAAAAAAAAEQ/kZM4WEqwd8UwEAdRd2mqwl79J-zIcqKbQCLcBGAsYHQ/s1600/T.png"
                      width="68"
                      height="68"
                    />

                    {/* <TXIcons /> */}
                  </TXtypeBox>
                </LeftBox>
                <RightBox>
                  <BlockBox>#{tx.Block}</BlockBox>
                  <ValueBox>{tx.Value} KLAY</ValueBox>
                  <HashBox>{tx.txHash}</HashBox>
                </RightBox>
              </Transaction>
            </>
          );
        })}
      </ListContainer>
    </Container>
  );
};
