"use client"
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa6";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { UsePixie } from "../providers/PixieProvider";
import { useSession } from "next-auth/react";

const RandomProductList = ({ data }) => {
  const {AddProducttoWishlist} = UsePixie();
  const {data:session} = useSession();
  const AddtoWishlist = (productId)=>{
    const payload = {
      user : session?.user?.id,
      productId : productId
    }
    AddProducttoWishlist(payload)
  }
  return (
    <main className=" w-full flex flex-col items-center justify-center">
      <div className="head w-[80%] h-[15vh] flex items-center">
        <h1 className="text-left font-semibold text-3xl ml-4">
          🔥 Deal of The Day !
        </h1>
      </div>
       {data?.length  === 0 && (<>
        <div className="w-[80%] h-full -mt-2 flex items-center justify-center ">
                  <div
                    className="card w-[100%]  relative bg-slate-100
                     animate-pulse h-[80vh]  rounded-xl mb-2"
                  ></div>
                </div>
       </>)}
      <div className="productlist h-auto text-center  w-[80%] px-3 py-5  ">
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 5 }}>
          <Masonry columnsCount={5} gutter="15px">
            {
              data?.sort(() => Math.random() - 0.5)?.map((_, i) => (
                <div
                  key={`item-${i}`}
                  style={{
                    height: `${Math.floor(Math.random() * 100) + 200}px`,
                  }}
                  className="relative border-2 flex items-center justify-center rounded-md"
                >
                  <div
                    className="overlay top-20
                    bg-slate-200
                     left-16 absolute rounded-md w-[270px]
                   h-[100px] flex justify-between items-center
                    border-2 shadow-md p-2 border-red-300"
                  >
                    <Link href={`/product/${_?._id}`}>
                      <img
                        src={_?.image}
                        alt={_?.name}
                        className="w-[80px] h-[80px] 
                      object-cover rounded-sm"
                      />
                    </Link>
                    <div
                      className="relative details_ 
                    flex flex-col text-left flex-grow ml-2"
                    >
                      <h1 className="text-sm font-semibold ">
                        {_?.name.slice(0, 25)}
                      </h1>
                      <h1 className="text-xl ">
                        ₹{parseInt(Math.abs(_?.finalPrice)).toFixed(0)}
                      </h1>
                      <span
                        className="absolute text-orange-500
                        font-bold top-8  right-10 text-xl"
                      >
                      {(_?.finalPrice && _?.price
                      ? _?.price / (_?.finalPrice + _?.price) * 100 
                      : 0
                    ).toFixed(0)}{" "}
                    %
                      </span>
                    </div>
                    <button className="flex-shrink-0">
                      <FaRegHeart color="red" size={26} onClick={()=>AddtoWishlist(_?._id)}/>
                    </button>
                  </div>
                  <img
                    src={_?.image}
                    alt={`Item ${_?._id}`}
                    width="80%"
                    style={{
                      mixBlendMode: "multiply",
                      objectFit: "contain",
                      borderRadius: "8px",
                      height: "80%",
                    }}
                  />
                </div>
              ))
            }
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </main>
  );
};

export default RandomProductList;
