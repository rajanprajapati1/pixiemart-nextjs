import Link from "next/link";
import React from "react";
const OfferedProductList = ({ data }) => {
  return (
    <>
      <div className=" w-[97%] m-2 rounded-2xl h-[500px] bg-slate-50">

        <div className="inner_box p-2 gap-2 h-full flex items-center justify-center flex-wrap">
          {data?.map((val, i) => {
            return (
              <div className="w-[48%] h-[235px] bg-red-200 rounded-3xl">
                <Link href={`/product/${val?._id}`}>
                <img
                  src={val?.image}
                  alt={val?.name}
                  className="object-cover z-50 rounded-3xl w-full h-full"
                />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OfferedProductList;
