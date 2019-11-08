import React from "react";
import ProductInfo from "./ProductInfo";


export default ({ tokenId, description, title, D_day }) => {
  console.log("data:  ", tokenId, description, title);
  return <div>
        <ProductInfo
          title={title}
          D_day={D_day}
          description={description}
          tokenId={tokenId}
        />
    </div>;
};
