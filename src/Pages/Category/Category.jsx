import React from "react";
import { Outlet } from "react-router-dom";

const Category = () => {
  return (
    <div className="">
      <h1 className="text-center mt-10 text-4xl font-bold">Category</h1>
      <div className="flex justify-center mt-20 mx-5">
        <div className="drawer lg:drawer-open">
          <input id="CategoryDrawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center ">
            {/* Page content here */}
            <label
              htmlFor="CategoryDrawer"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open drawer
            </label>
            <Outlet></Outlet>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="CategoryDrawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-60 p-4">
              {/* Sidebar content here */}
              <li>
                <a>Sidebar Item 1</a>
              </li>
              <li>
                <a>Sidebar Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
