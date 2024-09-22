import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteServiceFeature = () => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const deleteAService = async ({ serviceId, subCategoryId, serviceName }) => {
    try {
      setDeleteLoading(true);
      setDeleteError("");

      // check is all info is provided or not
      const check = checkInfo(serviceId, subCategoryId, serviceName);
      if (!check) {
        throw new Error("Please fill in all required fields.");
      }
      // create new subcategory in the backend
      const updateData = {
        serviceId,
        subCategoryId,
        serviceName,
      };

      const res = await fetch(
        `http://localhost:5000/api/v1/subCategory/deleteService`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );
      const data = await res.json();
      console.log(data);

      if (data.status === "success") {
        toast.success("Delete successfully");
      } else {
        throw new Error(data?.message);
      }
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };
  return { deleteAService, deleteError, deleteLoading };
};

function checkInfo(serviceId, subCategoryId, serviceName) {
  if (!serviceId || !subCategoryId || !serviceName) {
    return false;
  }
  return true;
}

export default useDeleteServiceFeature;
