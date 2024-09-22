import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SingleSubCategories from "../SingleSubCategories/SingleSubCategories";
import { FaPlus } from "react-icons/fa";
import useAddASubCategory from "../../../Hooks/addSubCategoryHook";

const SubCategory = () => {
  // all states
  const { id } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);

  // use hook
  const { addASubcategory, error, isLoading, refresh } = useAddASubCategory();

  // all use effects
  useEffect(() => {
    setCategoryLoading(true);
    fetch(`http://localhost:5000/api/v1/subCategory/all?categoryId=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSubCategories(data?.subcategories);
        setCategory(data?.category);
      });
    setCategoryLoading(false);
  }, [id, refresh]);

  // all functions
  const handleAddCategorySubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const subCategory = form.subCategory.value;
    const photo = form.photo.files[0];

    const data = {
      subCategory,
      photo,
      categoryId: category._id,
    };

    await addASubcategory(data);
    form.reset();
  };

  // main section
  return (
    <div>
      {categoryLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="mx-10">
          <h1 className="text-4xl font-bold text-center mt-10">
            Manage {category?.category} category Sub Categories
          </h1>

          {/* Category Links */}
          <div className="flex mt-20">
            <Link to={"/"}>Home</Link> <span className="ml-2">/</span>{" "}
            <Link to={"/category/categories"} className="ml-2">
              Categories
            </Link>{" "}
            <span className="ml-2">/</span>{" "}
            <h1 className="ml-2 disabled">{category?.category}</h1>
          </div>

          {/* Map All Sub Categories */}
          <div className="min-h-screen">
            <h1 className="text-center text-4xl font-bold mt-10">
              All Subcategories
            </h1>
            {subCategories.length > 0 ? (
              <div className="mt-20 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                {subCategories.map((subCategory) => (
                  <SingleSubCategories
                    key={subCategory._id}
                    subCategory={subCategory}
                    categoryId={category._id}
                  />
                ))}

                {/* The button to open modal */}
                <label
                  htmlFor="my_modal_6"
                  className={`w-[250px] h-[220px] border flex justify-center items-center cursor-pointer tooltip btn`}
                  data-tip="Add a Sub Category"
                >
                  <FaPlus size={30} />
                </label>
              </div>
            ) : (
              // section for if category has no subcategory
              <div className="text-center min-h-screen my-auto">
                <h1 className="text-4xl font-bold mt-[20%]">
                  This Category Has No Sub Category
                </h1>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Model body */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn btn-ghost">
              ✕
            </label>
          </div>
          <form onSubmit={handleAddCategorySubmit}>
            <h1 className="text-center text-2xl mt-2 ">Add a SubCategory</h1>

            <div className="form-control mt-10">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="file"
                placeholder="file"
                className="input"
                name="photo"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Subcategory Name</span>
              </label>
              <input
                type="text"
                placeholder="Subcategory Name"
                className="input input-bordered"
                name="subCategory"
              />
            </div>
            <p className="text-center text-red-600">{error}</p>
            <div className="flex justify-center items-center">
              <button
                disabled={isLoading}
                type="submit"
                className="btn btn-primary w-[200px] mt-10"
              >
                <span
                  className={isLoading ? "loading loading-spinner" : "hidden"}
                ></span>
                <span>Add a Subcategory</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubCategory;
