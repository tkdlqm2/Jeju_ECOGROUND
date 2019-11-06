import MakersContract from "../../klaytn/MakersContract";
import { getWallet } from "../../utils/crypto";
import ui from "../../utils/ui";
import { feedParser } from "../../utils/misc";
import { SET_FEED } from "./actionTypes";
import { makersFeed } from "data";
import Makers from "../../pages/Makers";

// Action creators

const setFeed = feed => ({
  type: SET_FEED,
  payload: { feed }
});

const updateFeed = tokenId => (dispatch, getState) => {
  console.log("updateFeed");

  Makers.methods
    .getMakers(tokenId)
    .call()
    .then(newMakers => {
      const {
        makers: { feed }
      } = getState();
      const newFeed = [feedParser(newMakers), ...feed];
      dispatch(setFeed(newFeed));
    });
};

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

// export const getFeed = () => dispatch => {
//   dispatch(setFeed(feedParser(makersFeed)));
// };

export const uploadPhoto = (
  file,
  title,
  description,
  targetKlay = 100,
  D_day = "dsfds"
) => dispatch => {
  console.log(
    `
    file: ${file} 
    title: ${title}
    description: ${description}
    targetKlay: ${targetKlay}
    D_day: ${D_day}
    `
  );
  const reader = new window.FileReader();
  reader.readAsArrayBuffer(file);
  reader.onloadend = () => {
    console.log("onloadend");
    const buffer = Buffer.from(reader.result);
    /**
     * Add prefix `0x` to hexString
     * to recognize hexString as bytes by contract
     */
    const hexString = "0x" + buffer.toString("hex");
    console.log("hexString: ", hexString);

    MakersContract.methods
      .uploadMakers(hexString, title, description, targetKlay, D_day)
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
        dispatch(updateFeed(tokenId));
      })
      .once("error", error => {
        ui.showToast({
          status: "error",
          message: error.toString()
        });
      });
  };
};
