import React, { useEffect, useState } from "react";
import MakersFeed from "./presenter";

const Container = props => {
  const { feed, userAddress, getFeed } = props;
  const [isLoading, setIsLoading] = useState(true); //

  // 컴포넌트를 시작하기 전에, 생성자역할
  useEffect(() => {
    if (!feed) {
      getFeed();
    } else {
      setIsLoading(false);
    }
  }, [feed, getFeed]); // return

  return (
    <MakersFeed feed={feed} userAddress={userAddress} isLoading={isLoading} />
  );
};

export default Container;
