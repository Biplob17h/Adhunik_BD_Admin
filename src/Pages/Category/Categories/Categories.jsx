import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import useCategories from "../../../Hooks/CategoriesHook";
import { Link } from "react-router-dom";
import SingleCategory from "../Category/SingleCategory";

const Category = () => {
  const { categories, isLoading, refresh, setRefresh } = useCategories();

  return (
    <div className="mx-10">
      <h1 className="text-4xl font-bold text-center mt-10">
        Manage All Categories
      </h1>
      
      <div className="mt-20 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
        {categories.map((category) => (
          <SingleCategory key={category._id} category={category} />
        ))}
        
      </div>
    </div>
  );
};

export default Category;
