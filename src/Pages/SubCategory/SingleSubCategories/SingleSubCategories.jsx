import React from "react";
import { Link } from "react-router-dom";

const SingleSubCategories = ({ subCategory, categoryId }) => {
  return (
    <Link
      to={`/category/subCategory/services/${categoryId}/${subCategory._id}`}
      className={`w-[250px] h-[220px] border flex justify-center items-center cursor-pointer`}
    >
      <div>
        <img
          className="mx-auto"
          src={subCategory?.photo}
          alt=""
        />
        <h1 className="text-xl text-center mt-3">{subCategory?.subCategory}</h1>
      </div>
    </Link>
  );
};

export default SingleSubCategories;
