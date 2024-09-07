import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const Category = () => {
  const [selected, setSelected] = useState("");

  return (
    <div className="mx-10">
      <h1 className="text-4xl font-bold text-center mt-10">
        Manage All Categories
      </h1>

      <div className="mt-20 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
        <div
          className={`w-[250px] h-[100px] border flex justify-center items-center cursor-pointer`}
        >
          <h1 className="text-2xl font-semibold">Ac Servicing</h1>
        </div>
        <div
          className={`w-[250px] h-[100px] border flex justify-center items-center cursor-pointer`}
        >
          <FaPlus size={20} />
        </div>
        {/*  */}
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click on ✕ button to close</p>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Category;
