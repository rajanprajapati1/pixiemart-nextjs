import Link from "next/link";
import { IoMdHeartDislike } from "react-icons/io";
const WishCard = ({ data ,RemoveProductFrom }) => {
  const getCategoryBgColor = (name) => {
    switch (name) {
      case "Electronics":
        return "bg-blue-200";
      case "Clothing":
        return "bg-pink-200";
      case "Home & Grocery":
        return "bg-green-200";
      case "Toys & Games":
        return "bg-yellow-200";
      case "Books":
        return "bg-purple-200";
      case "Sports & Outdoors":
        return "bg-orange-200";
      case "Beauty & Personal Care":
        return "bg-red-200";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="h-auto bg-white  rounded-md w-full p-4 shadow-md flex flex-col sm:flex-row items-center justify-between mb-4">
      <div className="flex justify-center sm:justify-start mb-4 sm:mb-0">
        <Link href={`/product/${data?.product?._id}`}>
        <img
          src={data?.product?.image}
          alt="Product Name"
          className="object-cover border h-32 w-32 rounded bg-red-600"
        />
        </Link>
      </div>
      <div className="flex-grow sm:pl-4">
        <h2 className="text-xl font-semibold mb-1">
          {data?.product?.name?.slice(0, 65) + ".."}
        </h2>
        <h2 className="text-sm font-semibold mb-1">Id: #{data?._id}</h2>
        <h2 className="text-xl font-semibold mb-1">
          ₹ {data?.product?.finalPrice}{" "}
          <small className="text-sm line-through">
            ₹ {Math.floor(data?.product?.finalPrice + data?.product?.price)}
          </small>
        </h2>
        <h1
          className={`inline-block px-2 py-1 text-sm font-semibold rounded 
          bg-blue-500
          ${getCategoryBgColor(data?.product?.category?.parentCategory?.name)}
          `}
        >
          {data?.product?.category?.name}
        </h1>
      </div>
      <div className="flex flex-col items-center mt-4 sm:mt-0 sm:flex-row sm:justify-between sm:pl-4">
        <button onClick={()=>RemoveProductFrom(data?._id)} className="bg-red-500 flex items-center justify-between gap-2 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300">
          <IoMdHeartDislike /> Remove
        </button>
      </div>
    </div>
  );
};

export default WishCard;
