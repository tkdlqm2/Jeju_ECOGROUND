import React, { useEffect, useState } from "react";
import MakersFeed from "./presenter";

const Container = props => {
  const { feed, userAddress, getFeed } = props;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!feed) {
      console.log("feed");
      // getFeed();
    } else {
      setIsLoading(false);
    }
  }, [feed]);

  return (
    <MakersFeed feed={feed} userAddress={userAddress} isLoading={isLoading} />
  );
};

export default Container;
