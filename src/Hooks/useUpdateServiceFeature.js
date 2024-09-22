import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateServiceFeature = () => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState("");

  const updateAService = async ({
    serviceId,
    subCategoryId,
    serviceUpdate,
    serviceName,
  }) => {
    try {
      setUpdateLoading(true);
      setUpdateError("");

      // check is all info is provided or not
      const check = checkInfo(
        serviceId,
        subCategoryId,
        serviceUpdate,
        serviceName
      );
      if (!check) {
        throw new Error("Please fill in all required fields.");
      }
      // create new subcategory in the backend
      const updateData = {
        serviceId,
        subCategoryId,
        serviceUpdate,
        serviceName,
      };

      const res = await fetch(
        `http://localhost:5000/api/v1/subCategory/updateService`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );
      const data = await res.json();
      console.log(data);

      if (data.status === "success") {
        toast.success("Updated successfully");
      } else {
        throw new Error(data?.message);
      }
    } catch (err) {
      setUpdateError(err.message);
    } finally {
      setUpdateLoading(false);
    }
  };
  return { updateAService, updateLoading, updateError };
};

function checkInfo(serviceId, subCategoryId, serviceUpdate, serviceName) {
  if (!serviceId || !subCategoryId || !serviceUpdate || !serviceName) {
    return false;
  }
  return true;
}

export default useUpdateServiceFeature;
