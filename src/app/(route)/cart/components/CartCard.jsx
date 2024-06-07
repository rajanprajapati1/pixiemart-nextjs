"use client";

import { useSession } from "next-auth/react";
import {  useState } from "react";

const CartCard = ({ item, onRemove, onUpdateQuantity }) => {
  const [quantity, setQuantity] = useState(item?.quantity || 1);
  const {data :session} = useSession()
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    onUpdateQuantity(item?._id, item?.product?._id , newQuantity , session?.user?.id);
  };

  return (
    <div className="h-auto bg-white rounded-md w-full p-4 shadow-md flex flex-col sm:flex-row items-center justify-between mb-4">
      <div className="  flex justify-center sm:justify-start mb-4 sm:mb-0">
        <img
          src={item?.product?.image}
          alt={item?.product?.name}
          className="object-cover border h-32 w-32 rounded bg-red-600"
        />
      </div>
      <div className="flex-grow  sm:pl-4">
        <h2 className="text-xl font-semibold mb-1">{item?.product?.name?.slice(0,55)+".."}</h2>
        <h2 className="text-sm font-semibold mb-1">
          Id : #{item?._id}
        </h2>
        <h2 className="text-xl font-semibold mb-1">₹ 
        {Math.abs(item?.product?.finalPrice)}</h2>

        <div className="section flex gap-5">
          {item?.color?.length > 0 && <div className="flex items-center mb-1">
            <span className="text-gray-700 mr-2 ">Color:</span>
            <div
              style={{ backgroundColor: ` ${item?.color}` }}
              className="w-6 ring-2 ring-offset-2 ring-blue-500 h-6 rounded-full "
            ></div>
          </div> }
          {}
         { item?.size?.length > 0 && <div className="flex items-center">
            <span className="text-gray-700 mr-2">Size:</span>
            <div className="w-auto px-2 py-2 h-8 flex text-sm items-center justify-center border rounded">
              {item?.size}
            </div>
          </div>}
        </div>
      </div>
      <div className="flex flex-col items-center mt-4 sm:mt-0 sm:flex-row sm:justify-between sm:pl-4">
        <div className="flex items-center mb-4 sm:mb-0 sm:mr-4">
          <button
            className="bg-gray-300 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-400 transition duration-300"
            onClick={() => handleQuantityChange(quantity - 1)}
          >
            -
          </button>
          <input
            type="text"
            className="w-12 text-center border-t border-b border-gray-300 mx-2"
            value={quantity}
            readOnly
          />
          <button
            className="bg-gray-300 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-400 transition duration-300"
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            +
          </button>
        </div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
          onClick={() => onRemove(item?._id , session?.user?.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartCard;
