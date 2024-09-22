import React, { useState } from "react";
import { MdOutlineContentPasteGo } from "react-icons/md";
import { FaPlus, FaTrash } from "react-icons/fa";
import useAddAServiceFeature from "../../Hooks/addAServiceFeature";
import useUpdateServiceFeature from "../../Hooks/useUpdateServiceFeature";
import useDeleteServiceFeature from "../../Hooks/useDeleteServiceFeature";

const AddAServiceFeatures = ({ subCategory, refresh, setRefresh }) => {
  const services = subCategory?.serviceFeatures;

  const { addAService, error, loading } = useAddAServiceFeature();
  const { updateAService, updateError, updateLoading } =
    useUpdateServiceFeature();
  const { deleteAService, deleteError, deleteLoading } =
    useDeleteServiceFeature();

  // State to track which service is being updated or deleted
  const [updatingServiceId, setUpdatingServiceId] = useState(null);
  const [deletingServiceId, setDeletingServiceId] = useState(null);

  // Handle adding a new service
  const handleAddService = async (event) => {
    event.preventDefault();
    const info = event.target.info.value;
    const subCategoryId = subCategory._id;
    const serviceName = "service";

    await addAService({ info, serviceName, subCategoryId });
    event.target.reset();
    setRefresh(refresh + 1);
  };

  // Handle updating an existing service
  const handleUpdateService = async (serviceId, info) => {
    const subCategoryId = subCategory._id;
    const serviceName = "service";

    const data = {
      serviceId,
      subCategoryId,
      serviceUpdate: info,
      serviceName,
    };

    setUpdatingServiceId(serviceId); // Set the current service being updated

    await updateAService(data);

    setUpdatingServiceId(null); // Reset after update
    setRefresh(refresh + 1);
  };

  // Handle deleting a service
  const handleDeleteService = async (serviceId) => {
    const subCategoryId = subCategory._id;
    const serviceName = "service";

    setDeletingServiceId(serviceId); // Set the current service being deleted

    await deleteAService({ serviceId, serviceName, subCategoryId });

    setDeletingServiceId(null); // Reset after deletion
    setRefresh(refresh + 1);
  };

  return (
    <div className="mt-10">
      <h1 className="text-3xl font-bold text-center mb-5">
        Manage Service Features
      </h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table-auto w-full text-left border-separate border-spacing-y-2">
          {/* Table Head */}
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-sm font-semibold text-gray-700">#</th>
              <th className="p-4 text-sm font-semibold text-gray-700">
                Service Info
              </th>
              <th className="p-4 text-sm font-semibold text-gray-700">Edit</th>
              <th className="p-4 text-sm font-semibold text-gray-700">
                Delete
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {services?.map((service, index) => (
              <tr
                key={service._id}
                className="bg-white border-b hover:bg-gray-50 transition"
              >
                <td className="p-4 text-sm text-gray-700">{index + 1}</td>
                <td className="p-4 text-sm text-gray-700">
                  <input
                    className="input input-bordered w-[500px]"
                    type="text"
                    defaultValue={service?.serviceFeatures}
                    name="info"
                    id={`info-${service._id}`}
                  />
                </td>
                <td className="p-4 text-center">
                  <button
                    className="text-blue-600 hover:text-blue-800 transition"
                    onClick={() =>
                      handleUpdateService(
                        service._id,
                        document.getElementById(`info-${service._id}`).value
                      )
                    }
                  >
                    {updatingServiceId === service._id ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <MdOutlineContentPasteGo size={20} />
                    )}
                  </button>
                </td>
                <td className="p-4 text-center">
                  <button
                    className="text-red-600 hover:text-red-800 transition"
                    onClick={() => handleDeleteService(service._id)}
                  >
                    {deletingServiceId === service._id ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <FaTrash size={20} />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add New Service Section */}
        <div className="mt-2 mx-12 mb-5">
          <form onSubmit={handleAddService} className="flex items-center gap-3">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter new service feature"
              name="info"
              required
            />
            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <FaPlus size={16} />
              )}
            </button>
          </form>
          <p className="text-red-600 text-center mt-2">
            {error || updateError || deleteError}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddAServiceFeatures;
