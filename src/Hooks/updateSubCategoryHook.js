import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateSubCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateSubCategory = async (info) => {
    try {
      setLoading(true);
      setError("");

      const subCategory = info?.subcategory;
      const photo = info?.photo;
      const subcategoryId = info?.subcategoryId;
      const type = typeof photo;

      const checkedData = checkData(subCategory, photo, subcategoryId);
      if (!checkData) {
        console.log("error in providing data");
        throw new Error("please provide your data");
      }
      let updateData = {};
      if (type === "object") {
        //  update photo to react cloudinary
        const photoData = new FormData();

        photoData.append("file", photo);
        photoData.append("upload_preset", "test-upload");
        photoData.append("cloud_name", "dqeuy96cs");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dqeuy96cs/image/upload",
          {
            method: "POST",
            body: photoData,
          }
        );
        const resData = await res.json();
        const url = resData?.url;
        if (!url) {
          throw new Error("error in uploading photo");
        }

        updateData = {
          subcategoryId,
          subCategoryUpdate: {
            subCategory: subCategory,
            photo: url,
          },
        };
      } else {
        updateData = {
          subcategoryId,
          subCategoryUpdate: {
            subCategory: subCategory,
            photo,
          },
        };
      }

      const response = await fetch(
        `http://localhost:5000/api/v1/subCategory/update`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );
      const data = await response.json();

      if (data.status !== "success") {
        throw new Error(data.message);
      }
      toast.success("Sub category updated successfully");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateSubCategory, loading, error };
};

// check data
function checkData(subCategory, subcategoryId) {
  if (!subCategory || !subcategoryId) {
    return false;
  }
  return true;
}

export default useUpdateSubCategory;
