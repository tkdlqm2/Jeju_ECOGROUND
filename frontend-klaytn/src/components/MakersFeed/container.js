import React, { useEffect, useState } from "react";
import MakersFeed from "./presenter";
import { getFeed } from "../../redux/actions/makers";

const Container = props => {
  const { feed, userAddress } = props;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!feed) {
      getFeed();
    } else {
      setIsLoading(false);
    }
  }, [feed]);

  return (
    <MakersFeed feed={feed} userAddress={userAddress} isLoading={isLoading} />
  );
};

export default Container;
