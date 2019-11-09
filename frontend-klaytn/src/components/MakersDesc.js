import React from "react";
import ProductInfo from "./ProductInfo";

export default ({ tokenId, description, title, D_day }) => {
  return (
    <div>
      <ProductInfo
        title={title}
        D_day={D_day}
        description={description}
        tokenId={tokenId}
      />
    </div>
  );
};
