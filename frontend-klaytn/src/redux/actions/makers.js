import MakersContract from "../../klaytn/MakersContract";
// import { getWallet } from "../../utils/crypto";
// import ui from "../../utils/ui";
import { feedParser } from "../../utils/misc";
import { SET_FEED } from "./actionTypes";
// import Makers from "../../pages/Makers";

// Action creators

const setFeed = feed => ({
  type: SET_FEED,
  payload: { feed }
});

// const updateFeed = tokenId => (dispatch, getState) => {
//   Makers.methods
//     .getMakers(tokenId)
//     .call()
//     .then(newMakers => {
//       const {
//         makers: { feed }
//       } = getState();
//       const newFeed = [feedParser(newMakers), ...feed];
//       dispatch(setFeed(newFeed));
//     });
// };

// API functions

export const getFeed = () => dispatch => {
  MakersContract.methods
    .getTotalMakersCount()
    .call()
    .then(totalMakersCount => {
      if (!totalMakersCount) return [];
      const feed = [];
      for (let i = totalMakersCount; i > 0; i--) {
        const product = MakersContract.methods.getMakers(i).call();
        feed.push(product);
      }
      return Promise.all(feed);
    })
    .then(feed => dispatch(setFeed(feedParser(feed))));
};

// export const uploadPhoto = (file, fileName, location, caption) => dispatch => {
//   const reader = new window.FileReader();
//   reader.readAsArrayBuffer(file);
//   reader.onloadend = () => {
//     const buffer = Buffer.from(reader.result);
//     /**
//      * Add prefix `0x` to hexString
//      * to recognize hexString as bytes by contract
//      */
//     const hexString = "0x" + buffer.toString("hex");
//     MakersContract.methods
//       .uploadPhoto(hexString, fileName, location, caption)
//       .send({
//         from: getWallet().address,
//         gas: "200000000"
//       })
//       .once("transactionHash", txHash => {
//         ui.showToast({
//           status: "pending",
//           message: `Sending a transaction... (uploadPhoto)`,
//           txHash
//         });
//       })
//       .once("receipt", receipt => {
//         ui.showToast({
//           status: receipt.status ? "success" : "fail",
//           message: `Received receipt! It means your transaction is
//           in klaytn block (#${receipt.blockNumber}) (uploadPhoto)`,
//           link: receipt.transactionHash
//         });
//         const tokenId = receipt.events.PhotoUploaded.returnValues[0];
//         dispatch(updateFeed(tokenId));
//       })
//       .once("error", error => {
//         ui.showToast({
//           status: "error",
//           message: error.toString()
//         });
//       });
//   };
// };
