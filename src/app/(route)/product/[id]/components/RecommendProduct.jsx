import ProductList from "@/app/(route)/category/components/ProductList";
import React from "react";
import Loading from "@/app/loading";
const RecommendProduct = ({RecommenededProduct}) => {
  if(RecommendProduct.length === 0 || RecommendProduct >= 0){
    return <Loading/>
  }
  return (
    <div className="w-full flex items-center justify-center h-auto">
      <main className="w-[80%]  flex flex-col gap-1 px-1 py-1">
        <div className="heading  my-5">
          <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-200 inline-block pb-2">
            Related Products
          </h1>
        </div>
        <ProductList filterProduct={RecommenededProduct} />
      </main>
    </div>
  );
};

export default RecommendProduct;
