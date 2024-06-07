"use client";
import { UsePixie } from "@/tools/providers/PixieProvider";
import React from "react";
import CartCard from "./CartCard";
import CartTotal from "./CartTotal";
import EmptyCart from "./EmptyCart";
import Loading from "@/app/loading";

const Cartpage = () => {
  const { cart, onRemove, onUpdateQuantity ,totalofCart ,loading } = UsePixie();
   
  if (cart?.length <= 0) {
    return <EmptyCart />;
  }
  if(loading){
    return <Loading/>
  }
  return (
    <div className="w-full flex items-center justify-center h-auto">
      <main className="w-[80%] rounded-xl bg-slate-200 h-auto flex flex-col ">
        <CartTotal Total={totalofCart} />
        <div className="cartshowing flex flex-col items-center px-8 py-4 justify-center gap-4">
          {cart?.map((val, i) => {
            return (
              <CartCard
                item={val}
                onRemove={onRemove}
                onUpdateQuantity={onUpdateQuantity}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Cartpage;
