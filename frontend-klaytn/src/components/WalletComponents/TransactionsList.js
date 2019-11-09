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
`

const RightBox = styled.div`
  width: 82%;
  height: 100%;
  float: right;
  box-sizing: border-box;
`

const TXtypeBox = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  height: 100%;
  float: left;
  box-sizing: border-box;
  background: #FAFAFA;
`

const BlockBox = styled.div`
  width: 70%;
  height: 60%;
  float: left;
  box-sizing: border-box;
  font-size: 24px;
  padding: 8px;
  color: #17202E;
  font-weight: bold;
`

const ValueBox = styled.div`
  width: 30%;
  height: 60%;
  float: left;
  box-sizing: border-box;
  font-size: 24px;
  padding: 8px;
  text-align: center;
  color:#03A87C;
  font-weight: bold;
`

const HashBox = styled.div`
  width: 100%;
  height: 40%;
  box-sizing: border-box;
  clear:both;
  float:left;
  font-size: 16px;
  padding: 8px;
  color: #CCCCCC;
`

const transactionsList = [
  {
    TXType: "Value Transfer",
    Block: "11663906",
    Value: "0.5",
    txHash: "0x312c0bef09770e0b845f5d51643aa19317ff0cd7",
  },
  {
    TXType: "Value Transfer",
    Block: 11663905,
    Value: 0.5,
    txHash: "0x312c0bef09770e0b845f5d51643aa19317ff0cd1",
  },
  {
    TXType: "Legacy",
    Block: 11663904,
    Value: 0.5,
    txHash: "0x312c0bef09770e0b845f5d51643aa19317ff0cd2",
  },
  {
    TXType: "Contract Execution",
    Block: 11663903,
    Value: 0.5,
    txHash: "0x312c0bef09770e0b845f5d51643aa19317ff0cd3",
  },
];

// const TXIcons = (TXType) => {
//   switch (TXType){
//     case "transfer":
//       transfer일 때 img url
//       break;
//     case "legacy" :
//       legacy일 때 img url
//       break;
//     case "contract execution" :
//       contract execution일 때 img url
//       break;
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
                  <TXtypeBox><img src="https://1.bp.blogspot.com/-asYYjf83Gno/XcEyk217XrI/AAAAAAAAAB8/hiwnkFubUfMAQdG7OaghUG5B1DELPs1qACLcBGAsYHQ/s1600/paper%2Bcosmetics.jpg" width="68" height="68" />
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
