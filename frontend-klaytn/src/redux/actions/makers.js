import MakersContract from "../../klaytn/MakersContract";
import { getWallet } from "../../utils/crypto";
import ui from "../../utils/ui";
import { feedParser } from "../../utils/misc";
import { SET_FEED, SET_DONATION, MAKERS_PRICE, MAKERS_REMOVE, MAKERS_INVEST, MAKERS_RETURN } from "./actionTypes";
// import { makersFeed } from "data";
import Makers from "../../pages/Makers";
import cav from "../../klaytn/caver";

// Action creators

const setFeed = feed => ({
  type: SET_FEED,
  payload: { feed }
});

const setDonation = donation => ({
  type: SET_DONATION,
  payload: { donation }
});

const MakersPrice = makersPrice => ({
  type: MAKERS_PRICE,
  payload: { makersPrice }
});

const MakersRemove = makersRemove => ({
  type: MAKERS_REMOVE,
  payload: { makersRemove }
});

const MakersInvest = makersInvest => ({
  type: MAKERS_INVEST,
  payload: { makersInvest }
});

const MakersReturn = makersReturn => ({
  type: MAKERS_RETURN,
  payload: { makersReturn }
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

export const getDonation = (tokenId) => (dispatch) => {
  MakersContract.methods.parentStateMakers(tokenId).call()
    .then(newDonation => {
      const {
        invests: { donation }
      } = getState();
      const donation = [donationParser(newDonation), ...donation];
      dispatch(setDonation(newDonation));
    })
};

export const getMakersPrice = (tokenId) => (dispatch) => {
  MakersContract.methods.showMakersPrice(tokenId).call()
    .then(newMakersPrice => {
      const {
        prices: { makersPrice }
      } = getState();
      const makersPrice = [priceParser(newMakersPrice), ...makersPrice];
      dispatch(MakersPrice(newMakersPrice));
    })
}

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


// ----------------------------------------------------------------
//              Makers 마감시 환불
// ----------------------------------------------------------------

export const returnKlay = (tokenId) => (dispatch) => {
  MakersContract.methods.returnKlay(tokenId)
    .send({
      from: getWallet().address,
      gas: "200000000",
      value: cav.utils.toPeb(MakersContract._MakersPrice[tokenId], "KLAY")
    }).once("transactionHash", txHash => {
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
      dispatch(MakersReturn(tokenId));
    })
    .once("error", error => {
      ui.showToast({
        status: "error",
        message: error.toString()
      });
    });
}

// ----------------------------------------------------------------
//              Makers 삭제
// ----------------------------------------------------------------

export const removeMakers = (tokenId) => (dispatch) => {
  MakersContract.methods.removeMakers(tokenId)
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
      dispatch(MakersRemove(tokenId));
    })
    .once("error", error => {
      ui.showToast({
        status: "error",
        message: error.toString()
      });
    });
}


// ----------------------------------------------------------------
//              Makers 투자
// ----------------------------------------------------------------

export const investMakers = (tokenId) => (dispatch) => {
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
      dispatch(MakersInvest(tokenId));
    })
    .once("error", error => {
      ui.showToast({
        status: "error",
        message: error.toString()
      });
    });
};


// ----------------------------------------------------------------
//              Makers 업로드
// ----------------------------------------------------------------

export const uploadItem = (
  file,
  title,
  description,
  targetKlay,
  D_day
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
    console.log("hexString");

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
          message: `Sending a transaction... (uploadMakers)`,
          txHash
        });
      })
      .once("receipt", receipt => {
        ui.showToast({
          status: receipt.status ? "success" : "fail",
          message: `Received receipt! It means your transaction is
          in klaytn block (#${receipt.blockNumber}) (uploadMakers)`,
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
