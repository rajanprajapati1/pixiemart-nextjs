"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FetchCatgeory } from "../configs/helper";
const CategoryList = () => {
  const [Category, setCategory] = useState([]);
  const router = useRouter();

  const GetCategory = async () => {
    const res = await FetchCatgeory();
    if (!res) {
      console.log("failed fetch category");
    } else {
      setCategory(res);
    }
  };
  useEffect(() => {
    GetCategory();
  }, []);

  return (
    <div className="category w-full flex items-center justify-center h-40 ">
      <div className="main w-[80%] bg-slate-100 flex items-center justify-around rounded-xl mr-4 h-full">
        {Category?.map((_, i) => {
          return (
            <div
              key={_?._id}
              onClick={() =>
                router.push(`/category?search=${encodeURIComponent(_?.name)}`)
              }
              className="box w-[120px] flex items-center border-2 border-white hover:border-2
               hover:border-red-200 overflow-hidden justify-between
                py-4 flex-col text-center bg-white h-[120px] rounded-md"
            >
              <img
                src={_?.image}
                alt={_?.name}
                className="object-cover w-[70px] h-[70px] "
              />
              <h1 className="text-xs   w-[90%] font-semibold leading-4">
                {_?.name}
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
