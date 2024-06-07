"use client";
import { useEffect, useState } from "react";
import Heading from "./Heading";
import WishCard from "./WishCard";
import { FetchWishlist } from "@/tools/configs/helper";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import Loading from "@/app/loading";
import { UsePixie } from "@/tools/providers/PixieProvider";
import EmptyWishlist from "./EmptyWishlist";
const Wishlist = () => {
  const {loading,SetLoading , wishlistItems ,
    setWishlistItems} = UsePixie()
  const { data: session } = useSession();
  const GetWishlist = async () => {
    SetLoading(true)
    const data = await FetchWishlist(session?.user?.id);
    if (!data) return false;
    setWishlistItems(data);
    SetLoading(false)
  };
  const RemoveProductFrom = async (id) => {
    try {
      const res = await fetch(`/api/wishlist/${session?.user?.id}`, {
        method: "DELETE",
        body: JSON.stringify({ WishlistId: id }),
      });
      const data = await res.json();
      if (res.ok || res.status === 202) {
        GetWishlist();
        toast({
          title: data?.msg,
        });
      }
    } catch (error) {
      console.log("failed to delete");
      toast({
        title: error?.msg,
      });
    }
  };
  useEffect(() => {
    GetWishlist();
  }, []);
  if (loading) {
    return <Loading/>
  }
  if (wishlistItems?.length <= 0) {
    return <EmptyWishlist />;
  }
  return (
    <div className="main w-full h-auto flex flex-col items-center justify-center">
      <div className="w-[80%] mx-auto p-4 h-full bg-slate-100 rounded-md">
        <Heading />
        <div className="cartshowing flex flex-col items-center px-8 py-4 justify-center gap-4"></div>
        {wishlistItems?.map((val, i) => (
          <WishCard
            key={i + 1}
            data={val}
            RemoveProductFrom={RemoveProductFrom}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
