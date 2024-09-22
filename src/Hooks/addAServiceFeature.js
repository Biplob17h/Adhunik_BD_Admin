import react, { useState } from "react";
import toast from "react-hot-toast";

const useAddAServiceFeature = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(1);

  const addAService = async ({ info, serviceName, subCategoryId }) => {
    try {
      setLoading(true);
      setError("");
      //   check info
      function checkInfo( info, serviceName, subCategoryId) {
        if (!info || !serviceName || !subCategoryId) {
          return false;
        }
        return true;
      }

      const check = checkInfo(info, serviceName, subCategoryId);
      if (!check) {
        throw new Error("Please fill all required fields");
      }

      //   send data to server
      const res = await fetch(
        `http://localhost:5000/api/v1/subCategory/createService`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ info, serviceName, subCategoryId }),
        }
      );
      const data = await res.json();
      if (data.status === "success") {
        toast.success("Service info created successfully");
        setRefresh((prevRefresh) => prevRefresh + 1);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, refresh, addAService };
};

export default useAddAServiceFeature;
