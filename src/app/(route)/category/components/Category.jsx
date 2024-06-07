"use client";
import { useSearchParams ,useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SortByPrice from "./SortBy";
import Searchbar from "./Searchbar";
import ProductList from "./ProductList";
import {
  FetchCatgeory,
  FetchProduct,
  FetchSpecificProduct,
} from "@/tools/configs/helper";
import Paginationbutton from "./Paginationbutton";
import FilterByCategory from "./FilterByCategory";

const Category = () => {
  const router = useRouter();
  const [filterProduct, SetfilterProduct] = useState([]);
  const [CategoryList, SetCategoryList] = useState([]);
  const [SortBy, SetSortBy] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const searchParams = useSearchParams();

  const handleSearch = async (search) => {
    const controller = new AbortController();
    const signal = controller.signal;
    const SearchQuery = search;
    try {
      const data = await FetchSpecificProduct(SearchQuery, signal);
      SetfilterProduct(data);
      if (data?.length === 0) {
        getProducts()
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategorySelection = (event) => {
    const { name, value, checked } = event;
    const updatedCategories = new Set(selectedCategories);
  
    if (checked) {
      updatedCategories.add(value);
    } else {
      updatedCategories.delete(value);
    }
  
    setSelectedCategories(Array.from(updatedCategories));
  
    // Encode category names with `encodeURIComponent` to handle spaces and other special characters:
    const encodedCategories = Array.from(updatedCategories).map(encodeURIComponent);
    router.push(`/category?search=${encodedCategories.join(",")}`);
  };
  
  
  const handleChangeSortBy = (e) => {
    const { value } = e.target;
    let SortBylist;
    SetSortBy(value);
    if (value === "asc") {
      SortBylist = filterProduct?.sort((a, b) => a.finalPrice - b.finalPrice);
    }
    if (value === "dsc") {
      SortBylist = filterProduct?.sort((a, b) => b.finalPrice - a.finalPrice);
    }
    if (value === "all") {
      SortBylist = filterProduct;
    }
    SetfilterProduct(SortBylist);
  };
  const handleNextPage = () => {
    if (currentPage * itemsPerPage < totalItems) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({
        top: 1,
        left: 10,
        behavior: "smooth",
      });
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({
        top: 1,
        left: 10,
        behavior: "smooth",
      });
    }
  };
  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filterProduct?.slice(startIndex, endIndex);
  };

  const FetchCategoryList = async()=>{
    const res = await  FetchCatgeory()
    if(!res) return false ;
    SetCategoryList(res)
  }
  useEffect(()=>{
    FetchCategoryList();
  },[])
  const getProducts = async () => {
    const search = searchParams.get("search");
    const categories = search ? search.split(",") : [];
    const res = await FetchProduct(`search=${categories.join(",")}`);
    if (!res) return [];
    setTotalItems(res?.length);
    SetfilterProduct(res);
  };
  useEffect(() => {
    const search = searchParams.get("search");
    const categories = search ? search.split(",").map(decodeURIComponent) : []; // Decode categories
    setSelectedCategories(categories);
    getProducts();
  }, [searchParams]);
  return (
    <main className="w-full h-auto flex items-center justify-center ">
      <div className="flex  w-[80%]">
        <div
          className="filtersection  w-1/4 bg-red-200
         rounded-sm flex flex-col  h-full p-4 overflow-y-scroll"
        >
          <SortByPrice Sort={SortBy} handleChangeSortBy={handleChangeSortBy} />
          <FilterByCategory
            HandleSelectedCategory={handleCategorySelection}
            categories={CategoryList}
            SelectCategory={selectedCategories }
          />
      
        </div>
        <div className="w-3/4 ml-3 flex flex-col">
          <Searchbar handleSearch={handleSearch} />
          <h1>Search Result : {`( ${filterProduct?.length} )`}</h1>
          <ProductList
            loading={filterProduct?.length === 0}
            filterProduct={getCurrentPageProducts()}
          />
          <Paginationbutton
            currentPage={currentPage}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            key={1}
          />
        </div>
      </div>
    </main>
  );
};

export default Category;
