"use client";
import React from "react";
import ReviewUploadComponent from "./ReviewUploadComponent";
import AllReview from "./AllReview";

const Reviewpage = ({review ,product}) => {
  return (
    <div className="w-full  flex items-center justify-center h-auto">
      <main className="w-[80%]   flex flex-col h-auto  bg-slate-100 rounded-md gap-1 px-1 py-1 ">
        <div className="rating flex w-full px-2 gap-1 py-2">
          {!review.length ? (<> 
          <div className="reviewlist flex  w-[90%] flex-col px-4 py-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
            <h1>No Review For this Product</h1>
          </div>
          </>) : (<>
            <div className="reviewlist flex w-[65%]  flex-col items-center gap-3">
            <AllReview data={review} />
          </div>
          </>
          )}
          <div className="topreview px-1 w-[35%]   overflow-hidden flex flex-col">
            <ReviewUploadComponent product={product}  />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reviewpage;
