"use client";
import  { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import RecommendProduct from "./RecommendProduct";
import ReviewPage from "./Reviewpage";
import { UsePixie } from "@/tools/providers/PixieProvider";
import {  FetchSingleProduct } from "@/tools/configs/helper";
import Loading from "@/app/loading";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import Image from "next/image";

const ProductPage = ({ ProductId }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [product, setproduct] = useState(null);
  const [RecommenededProduct, setRecommenededProduct] = useState([]);
  const {  AddToCart ,AddProducttoWishlist} = UsePixie();
  const { data: session } = useSession();

  useEffect(() => {
    const GetSingleProduct = async (id) => {
      const res = await FetchSingleProduct(id);
      if (!res) return;
      setproduct(res?.product);
      setRecommenededProduct(res?.recommeded);
    };
    GetSingleProduct(ProductId);
  }, [ProductId]);

   const AddItemToWishList = async(productId)=>{
    const payload = {
      user : session?.user?.id,
      productId : productId
    }
    AddProducttoWishlist(payload)
   }
  const HandleAddToCart = (productUid) => {
    if (product?.color?.length > 0 && !selectedColor) {
      toast({
        title: "Please Select a Color from the Color Bar",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (product?.size?.length > 0 && !selectedSize) {
      toast({
        title: "Please Select a Size from the Size Bar",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const payload = {
      product: productUid,
      size: selectedSize?.size,
      color: selectedColor?.color,
      user: session?.user?.id,
      quantity: 1,
    };
    AddToCart(payload);
    setSelectedColor(null);
    setSelectedSize(null);
  };
 
  if (product === null || !product) {
    return <Loading />;
  }
  return (
    <section className="h-auto">
      <div className="w-full flex items-center justify-center h-screen">
        <main className="w-[80%] h-screen flex gap-1 px-1 py-1">
          <div className="image_Section w-1/2 flex px-2 py-2 h-[90vh]">
            <div className="images h-full flex flex-col justify-between 
            items-center w-40">
              {[1, 1, 1 ,1].map((val, i) => {
                return (
                 <div
                 key={i}
                  className="image_div w-[120px] h-[120px] border p-4 rounded-sm">
                   <Image
                    className="w-full h-full object-fill 
                      rounded-md "
                    src={product?.image}
                    alt="ss"
                    width={1000}
                    height={1000}
                  />
                 </div>
                );
              })}
            </div>
            <div className="main_images w-full flex items-center  justify-center h-full">
              <div className="main_image w-[70%] h-[70%] ">
              <Image
                className="w-full h-full object-contain "
                src={product?.image}
                alt={product?.name}
                width={1000}
                height={1000}
              />
              </div>
            </div>
          </div>
          <div className="details_section w-1/2 h-[90vh]">
            <div className="w-full h-full bg-white my-8">
              <nav className="text-gray-600 mb-4">
                <ol className="list-reset flex">
                  <li>
                    <a href="#" className="text-blue-600">
                      Home
                    </a>
                  </li>
                  <li>
                    <span className="mx-2">/</span>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600">
                      T-Shirts
                    </a>
                  </li>
                  <li>
                    <span className="mx-2">/</span>
                  </li>
                  <li className="text-gray-700">
                    {product?.name?.slice(0, 10) + "..."}
                  </li>
                </ol>
              </nav>
              <h1 className="text-3xl font-bold mb-2">{product?.name}</h1>
              <div className="flex items-center justify-between mb-4">
                <p className="text-2xl text-gray-800">
                  ₹ {Math.abs(product?.finalPrice) || 0}
                  <span className="cut ml-3 line-through text-red-600">
                    <span className="relative text-xl">
                      ₹{product?.finalPrice + product?.price || 0}
                      <span className="absolute text-orange-500  font-bold -top-1 -right-14">
                        {product?.finalPrice && product?.price
                          ? `${(
                            product?.price / (product?.finalPrice + product?.price) * 100
                            ).toFixed(0)}%`
                          : "0%"}
                      </span>
                    </span>
                  </span>
                </p>

                <FaHeart
                  className="text-gray-500  cursor-pointer hover:text-red-500"
                  size={24}
                  onClick={()=> AddItemToWishList(product?._id)}
                />
              </div>
              <p className="text-gray-700 mb-4">{product?.description}</p>
              <b
                className="text-white mb-4 inline-block text-center mr-60 mt-1 px-2 py-1 
        text-sm font-semibold rounded bg-orange-500"
              >
                {product?.brand}
              </b>
              {product?.color?.length > 0 && (
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Color:
                  </label>
                  <div className="flex space-x-2">
                    {product?.color &&
                      product?.color?.map((color) => (
                        <button
                          key={color?.color}
                          style={{ backgroundColor: `${color?.color}` }}
                          className={`w-8 h-8 rounded-full cursor-pointer  relative
                      ${color?.color === "White" ? "border-2" : ""}
                    ${!color?.stock ? "cursor-not-allowed" : ""}
                     ${
                       selectedColor?.color === color?.color
                         ? "ring-2 ring-offset-2 ring-blue-500"
                         : ""
                     }`}
                          disabled={!color?.stock}
                          onClick={() => setSelectedColor(color)}
                        >
                          {!color?.stock && (
                            <span className="w-1 h-12 absolute cursor-not-allowed -rotate-45 bg-red-700"></span>
                          )}
                        </button>
                      ))}
                  </div>
                </div>
              )}
              {product?.size?.length > 0 && (
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Size:
                  </label>
                  <div className="flex space-x-2">
                    {product?.size?.map((size) => (
                      <button
                        key={size?._id}
                        className={`w-9 h-9 border rounded-sm flex text-sm items-center relative
                      ${
                        !size?.stock ? "cursor-not-allowed  line-through  " : ""
                      }
                      justify-center border-gray-300  cursor-pointer ${
                        selectedSize?.size === size?.size
                          ? "ring-2 ring-offset-2 ring-gray-500"
                          : ""
                      }`}
                        disabled={!size?.stock}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size?.size}
                        {!size?.stock && (
                          <span className="w-1 h-12 absolute cursor-not-allowed -rotate-45 bg-red-700"></span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <button
                onClick={() => HandleAddToCart(product?._id)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 w-full mb-4"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </main>
      </div>
      <RecommendProduct RecommenededProduct={RecommenededProduct} />
      <ReviewPage review={product?.ratings} product={product?._id} />
    </section>
  );
};

export default ProductPage;
