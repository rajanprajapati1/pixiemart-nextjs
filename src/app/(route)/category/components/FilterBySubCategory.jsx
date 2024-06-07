import React from "react";

const FilterBySubCategory = ({
  HandleSelectedCategory,
  categories,
  SelectCategory,
  title,
}) => {
  return (
    <div>
      <h2 className="text-xl mt-3 font-bold mb-4 border-b-2 pb-1 border-white outline-none ">
        {title}
      </h2>
      <form className="text-sm flex flex-col gap-1">
        {categories?.map((product, index) => {
          return (
            <div className="flex items-center gap-3" key={product}>
              <input
                type="checkbox"
                checked={SelectCategory[product]}
                name={product}
                id={product}
                value={product}
                onChange={(e) => HandleSelectedCategory(e.target)}
              />
              <label className="mt-1" htmlFor={product}>
                {product}
              </label>
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default FilterBySubCategory;
