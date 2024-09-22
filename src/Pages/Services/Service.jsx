import React, { useEffect, useState } from "react";
import { MdOutlineContentPasteGo } from "react-icons/md";
import { FaPlus, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

const AddAServiceFeatures = ({
  subCategory,
  refresh,
  setRefresh,
  category,
}) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false); // Global loading state
  const [serviceLoading, setServiceLoading] = useState({}); // Loading state for individual services

  // Fetch services when the component loads or refresh is triggered
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/service/subCategory/${subCategory?._id}`
        );
        const data = await res.json();
        setServices(data.services);
      } catch (err) {
        toast.error("Failed to fetch services");
      } finally {
        setLoading(false); // Stop loading when fetch is done
      }
    };

    if (subCategory?._id) {
      fetchServices();
    }
  }, [refresh, subCategory?._id]);

  // Add Service Function
  const handleAddService = async (event) => {
    event.preventDefault();
    const name = event.target.info.value;
    const price = event.target.price.value;
    const categoryId = category?._id; // Replace with actual categoryId
    const subCategoryId = subCategory?._id;

    const serviceData = { name, price, categoryId, subCategoryId };

    setLoading(true); // Start global loading when adding
    try {
      const res = await fetch(`http://localhost:5000/api/v1/service/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      });

      if (res.ok) {
        toast.success("Service added successfully!");
        setRefresh(refresh + 1);
        event.target.reset();
      } else {
        toast.error("Failed to add service");
      }
    } catch (error) {
      toast.error("Error while adding service");
    } finally {
      setLoading(false); // Stop global loading when add request is done
    }
  };

  // Update Service Function
  const handleUpdateService = async (serviceId) => {
    const name = document.getElementById(`info-${serviceId}`).value;
    const price = document.getElementById(`price-${serviceId}`).value;
    const subCategoryId = subCategory?._id;

    const updateData = { name, price, subCategoryId, serviceId };

    // Set individual loading state
    setServiceLoading((prev) => ({ ...prev, [serviceId]: true }));

    try {
      const res = await fetch(`http://localhost:5000/api/v1/service/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (res.ok) {
        toast.success("Service updated successfully!");
        setRefresh(refresh + 1);
      } else {
        toast.error("Failed to update service");
      }
    } catch (error) {
      toast.error("Error while updating service");
    } finally {
      // Stop individual loading after update
      setServiceLoading((prev) => ({ ...prev, [serviceId]: false }));
    }
  };

  // Delete Service Function
  const handleDeleteService = async (serviceId) => {
    // Set individual loading state
    setServiceLoading((prev) => ({ ...prev, [serviceId]: true }));

    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/service/delete?serviceId=${serviceId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        toast.success("Service deleted successfully!");
        setRefresh(refresh + 1);
      } else {
        toast.error("Failed to delete service");
      }
    } catch (error) {
      toast.error("Error while deleting service");
    } finally {
      // Stop individual loading after delete
      setServiceLoading((prev) => ({ ...prev, [serviceId]: false }));
    }
  };

  return (
    <div className="mt-10">
      <h1 className="text-3xl font-bold text-center mb-5">Manage Service</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <div>
          <table className="table-auto w-full text-left border-separate border-spacing-y-2">
            {/* Table Head */}
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-sm font-semibold text-gray-700">#</th>
                <th className="p-4 text-sm font-semibold text-gray-700">
                  Service
                </th>
                <th className="p-4 text-sm font-semibold text-gray-700">
                  Price
                </th>
                <th className="p-4 text-sm font-semibold text-gray-700">
                  Edit
                </th>
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
                      className="input input-bordered w-full"
                      type="text"
                      defaultValue={service?.name}
                      name="info"
                      id={`info-${service._id}`}
                    />
                  </td>
                  <td className="p-4 text-sm text-gray-700">
                    <input
                      className="input input-bordered w-full"
                      type="text"
                      defaultValue={service?.price}
                      name="price"
                      id={`price-${service._id}`}
                    />
                  </td>
                  <td className="p-4 text-center">
                    <button
                      className={`text-blue-600 hover:text-blue-800 transition ${
                        serviceLoading[service._id] ? "opacity-50" : ""
                      }`}
                      onClick={() => handleUpdateService(service._id)}
                      disabled={serviceLoading[service._id]} // Disable button during loading
                    >
                      {serviceLoading[service._id] ? (
                        <div className="spinner-border" />
                      ) : (
                        <MdOutlineContentPasteGo size={20} />
                      )}
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      className={`text-red-600 hover:text-red-800 transition ${
                        serviceLoading[service._id] ? "opacity-50" : ""
                      }`}
                      onClick={() => handleDeleteService(service._id)}
                      disabled={serviceLoading[service._id]} // Disable button during loading
                    >
                      {serviceLoading[service._id] ? (
                        <div className="spinner-border" />
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
            <form
              onSubmit={handleAddService}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter new service feature"
                name="info"
                required
              />
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter price"
                name="price"
                required
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading} // Disable button during loading
              >
                {loading ? "Loading..." : <FaPlus size={16} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAServiceFeatures;
