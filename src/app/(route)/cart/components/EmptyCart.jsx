import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";

const EmptyCart = () => {
  return (
    <div className="empty h-[80vh] rounded-xl bg-slate-200 w-[80%] m-auto flex items-center justify-center">
      <div className="w-full h-[35vh] text-center flex flex-col items-center justify-center">
        <AiOutlineShoppingCart className="text-6xl text-gray-400 mb-4" />
        <h1 className="text-2xl font-semibold mb-4">Your bag is Empty.</h1>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          href={"/"}
          className="py-2 px-8 text-sm bg-red-600 text-white rounded-md hover:bg-red-500"
        >
          Go Add Some Product in Cart !
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
