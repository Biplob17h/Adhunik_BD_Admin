import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useUpdateSubCategory from "../../Hooks/updateSubCategoryHook";
import AddAServiceFeatures from "./ServiceFeatures";
import Excluded from "./Excluded";
import Service from "./Service";

const Services = () => {
  const { categoryId, subcategoryId } = useParams();
  const [services, setServices] = useState([]);
  const [serviceLoading, setServiceLoading] = useState(false);
  const [subCategory, setSubCategory] = useState({});
  const [category, setCategory] = useState({});
  const [refresh, setRefresh] = useState(1);

  const { error, loading, updateSubCategory } = useUpdateSubCategory();

  useEffect(() => {
    setServiceLoading(true);
    fetch(`http://localhost:5000/api/v1/subCategory/single/${subcategoryId}`)
      .then((res) => res.json())
      .then((data) => {
        setSubCategory(data?.subcategory);
        setCategory(data.category);
      });
    setServiceLoading(false);
  }, [categoryId, subcategoryId, refresh]);

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const photo = form.photo.files[0] || subCategory.photo;
    const subcategory = form.subCategory.value;

    const data = {
      photo,
      subcategory,
      subcategoryId,
    };
    await updateSubCategory(data);
    setRefresh(refresh + 1);
    form.reset();
  };
  return (
    <div>
      {serviceLoading ? (
        <p>Loading...</p>
      ) : (
        // main section
        <section className="mx-10 min-h-screen mb-96">
          <h1 className="text-4xl font-bold text-center mt-10">
            Manage Sub Category and Services
          </h1>

          {/* Category Links */}
          <div className="flex mt-20 ">
            <Link to={"/"}>Home</Link> <span className="ml-2">/</span>
            <Link to={"/category/categories"} className="ml-2">
              categories
            </Link>
            <span className="ml-2">/</span>
            <Link to={`/category/subCategory/${categoryId}`} className="ml-2">
              {category.category}
            </Link>
            <span className="ml-2">/</span>{" "}
            <h1 className="ml-2 disabled">{subCategory.subCategory}</h1>
          </div>

          {/* update you category */}
          <div className="flex">
            <form
              onSubmit={handleUpdateSubmit}
              className="max-w-[300px] mt-20 ml-20"
            >
              <img src={subCategory?.photo} alt="" />
              <div className="form-control mt-2">
                <input
                  type="file"
                  placeholder="photo"
                  className="input"
                  defaultValue={subCategory?.photo}
                  name="photo"
                />
              </div>
              <div className="form-control mt-2">
                <input
                  type="text"
                  placeholder="Category"
                  className="input input-bordered"
                  defaultValue={subCategory.subCategory}
                  name="subCategory"
                  required
                />
              </div>
              <p className="text-red-600">{error}</p>
              <button disabled={loading} className="btn mt-3 w-[170px] flex">
                <span
                  className={`${
                    loading ? "" : "hidden "
                  } loading loading-spinner mr-3`}
                ></span>{" "}
                Update
              </button>
            </form>
          </div>

          <Service
          serviceLoading={serviceLoading}
            subCategory={subCategory}
            refresh={refresh}
            setRefresh={setRefresh}
            category={category}
          />
          <AddAServiceFeatures
            subCategory={subCategory}
            refresh={refresh}
            setRefresh={setRefresh}
          />
          <Excluded
            subCategory={subCategory}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </section>
      )}
    </div>
  );
};

export default Services;
