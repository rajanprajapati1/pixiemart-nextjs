"use client";
import React, { useEffect, useState } from "react";
import ProductCarousel from "../components/ProductCarousel";
import ProductListCarousel from "../components/ProductListCarousel";
import CategoryList from "../components/CategoryList";
import Clothing from "../components/Clothing";
import RandomProductList from "../components/RandomProductList";
import { FetchSpecificProduct } from "../configs/helper";
import { useSession } from "next-auth/react";
const HomePage = () => {
  const [FeaturedProduct,SetFeaturedProduct] = useState([])
  const [AirpodsProduct,SetAirpodsProduct] = useState([])
  const [WomensClothingsProduct,SetWomensClothingsProduct] = useState([])
  const [MensClothingsProduct,SetMensClothingsProduct] = useState([])
  const [LaptopTvProduct,SetLaptopTvProduct] = useState([])
  const [TopDealProduct,SetTopDealProduct] = useState([])
  const [ClothingBannerRes,SetClothingBannerRes] = useState([])
  const [SmartPhones,SetSmartPhones] = useState([])
  const {data :session}  =useSession();
  useEffect(()=>{
    localStorage.setItem('userId' ,JSON.stringify(session?.user?.id))
    const FetchAllProducts = async () => {
      try {
        const [
          featuredRes,
          airpodsRes,
          womensClothingsRes,
          mensClothingsRes,
          laptopTvRes,
          topDealRes ,
          ClothingRes ,
          PhonesRes
        ] = await Promise.all([
          FetchSpecificProduct('isfeaturedonly=true'),
          FetchSpecificProduct('Airpods=true'),
          FetchSpecificProduct('WomensClothing=true'),
          FetchSpecificProduct('MensClothing=true'),
          FetchSpecificProduct('Laptop=true&Tv=true'),
          FetchSpecificProduct('isInOffer=true') ,
          FetchSpecificProduct('isfeatured=true&isoffer=true'),
          FetchSpecificProduct('SmartPhone=true')
        ]);
    
        if (featuredRes) {
          SetFeaturedProduct(featuredRes);
        }
    
        if (airpodsRes) {
          SetAirpodsProduct(airpodsRes);
        }
    
        if (womensClothingsRes) {
          SetWomensClothingsProduct(womensClothingsRes);
        }
    
        if (mensClothingsRes) {
          SetMensClothingsProduct(mensClothingsRes);
        }
    
        if (laptopTvRes) {
          SetLaptopTvProduct(laptopTvRes);
        }
    
        if (topDealRes) {
          SetTopDealProduct(topDealRes);
        }
        if(ClothingRes){
          SetClothingBannerRes(ClothingRes)
        }if(PhonesRes){
          SetSmartPhones(PhonesRes)
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    
    FetchAllProducts();
    
  },[])
  return (
    <div>
      <CategoryList />
      <ProductCarousel FeaturedProduct={FeaturedProduct} />
      <div className="productlist mt-8">
        <ProductListCarousel data={SmartPhones} title={"SmartPhones"} />
        <ProductListCarousel data={AirpodsProduct} title={"Airpods"} />
        <ProductListCarousel data={LaptopTvProduct} title={"Best of Electronics"} />
        <Clothing data={ClothingBannerRes}  />
        <ProductListCarousel data={ MensClothingsProduct} title={"Best of Mens  Clothings"} />
        <ProductListCarousel data={WomensClothingsProduct} title={"Best of Womens  Clothings"} />
      </div>
      <RandomProductList data={TopDealProduct}/>
    </div>
  );
};

export default HomePage;
