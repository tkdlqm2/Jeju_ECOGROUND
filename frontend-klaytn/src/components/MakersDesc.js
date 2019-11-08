import React from "react";
import ProductInfo from "./ProductInfo";


export default ({ tokenId, description, title }) => {
  console.log("data:  ", tokenId, description, title);
  return <div>
        <ProductInfo
          title={title}
          description={description}
          tokenId={tokenId}
        />
    </div>;
};
