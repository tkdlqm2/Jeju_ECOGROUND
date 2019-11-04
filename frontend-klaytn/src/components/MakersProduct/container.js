import React, { useEffect, useState } from "react";
import MakersProduct from "./presenter";
import { withRouter } from "react-router-dom";

export default withRouter(({ match: { params: { tokenId } }, ...props }) => {
  const { feed, userAddress, getFeed } = props;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!feed) {
      getFeed();
    } else {
      setIsLoading(false);
    }
  }, [feed]);

  return (
    <MakersProduct
      feed={feed}
      userAddress={userAddress}
      isLoading={isLoading}
      tokenId={tokenId}
    />
  );
});
