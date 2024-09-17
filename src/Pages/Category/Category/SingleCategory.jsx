import React from 'react';
import { Link } from 'react-router-dom';

const SingleCategory = ({category}) => {
    return (
        <Link to={`/category/subCategory/${category?._id}`}
            key={category._id}
            className={`w-[250px] h-[100px] border flex justify-center items-center cursor-pointer`}
          >
            <div>
              <img className="w-[40px] h-[40px] mx-auto" src={category?.photo} alt="" />
              <h1 className="text-2xl font-semibold">{category?.category}</h1>
            </div>
          </Link>
    );
};

export default SingleCategory;