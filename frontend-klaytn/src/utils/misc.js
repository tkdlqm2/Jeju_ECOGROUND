// import Compressor from 'compressorjs'

const isArray = obj => obj instanceof Array;

const renameKeys = (obj, newKeys) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [newKeys[key] || key]: obj[key] }
    }),
    {}
  );

export const last = array => {
  const length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
};

export const donationParser = donation => {
  const donationKeys = {
    0: "donation"
  };
  if (!isArray(donation)) {
    return renameKeys(donation, donationKeys);
  }

  const parsedDonation = donation.map(donate => renameKeys(donate, donation));

  return parsedDonation;
};

export const feedParser = feed => {
  const photoKeys = {
    0: "id",
    1: "buyer",
    2: "photo",
    3: "title",
    4: "description",
    5: "targetKlay",
    6: "D_day",
    7: "status",
    8: "count",
    9: "timestamp"
  };



  /**
   * 1. If feed is one object of photo,
   * rename just one photo object's keys
   */
  if (!isArray(feed)) {
    return renameKeys(feed, photoKeys);
  }
  /**
   * 2. If feed is array of photos,
   * Iterate feed array to rename all of photo objects' keys
   */
  const parsedFeed = feed.map(photo => renameKeys(photo, photoKeys));

  return parsedFeed;
};

