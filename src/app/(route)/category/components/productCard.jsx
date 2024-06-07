import Link from "next/link";
import { FaHeart } from "react-icons/fa6";

const ProductCard = ({ det ,AddToWishList }) => {
  return (
    <div className="product-card relative bg-white w-[250px] rounded-md shadow-md mx-2 my-2">
      {det?.isInOffer && (
        <div className="badge absolute left-0 top-2 z-50 uppercase text-xs font-semibold bg-red-500 text-white py-1 px-3">
          Offer
        </div>
      )}
      <Link href={`/product/${det?._id}`}>
        <div className="product-tumb flex items-center justify-center w-full h-64 bg-gray-200 rounded-t-md">
          <img
            src={det?.image}
            alt={det?.name}
            className="max-h-full mix-blend-multiply max-w-full object-contain"
          />
        </div>
      </Link>
      <div className="product-details p-4 w-full h-auto overflow-hidden">
        <div className="brand h-[20px] ">
          <span className="product-catagory block text-xs font-semibold uppercase text-gray-500 mb-2">
            {det?.brand?.slice(0,20)+".."}
          </span>
        </div>
        <div className="name h-[80px] ">
          <h4 className="font-medium text-base text-gray-700 mb-2 hover:text-yellow-500 transition duration-300">
            {det?.name?.slice(0, 60)}
          </h4>
        </div>
        <div className="desc h-[70px] overflow-hidden">
          <p className="text-sm leading-5 text-gray-900 mb-4 line-clamp-3">
            {det?.description}
          </p>
        </div>
        <div className="product-bottom-details border-t pt-2 flex justify-between items-center">
          <div>
            <span className="main-price text-lg font-semibold">
              ₹{Math.abs(det?.finalPrice) || 0}
            </span>
            <span className="cut ml-2 line-through relative text-red-600">
              <small>
                ₹{Math.floor(det?.price + det?.finalPrice) || 0}
                <small className="absolute text-orange-500 font-bold -top-1 ml-2 text-xl">
                  {(det?.finalPrice && det?.price
                    ? (det?.price / (det?.finalPrice + det?.price)) * 100
                    : 0
                  ).toFixed(0)}
                  %
                </small>
              </small>
            </span>
          </div>
          <div>
            <button
              onClick={() =>AddToWishList(det?._id)}
              className="text-gray-500 text-xl hover:text-red-500 transition duration-300"
            >
              <FaHeart size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
