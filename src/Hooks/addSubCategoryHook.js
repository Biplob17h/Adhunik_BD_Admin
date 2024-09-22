import { useState } from "react";
import toast from "react-hot-toast";

const useAddASubCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(1);
  const [error, setError] = useState("");

  const addASubcategory = async ({ subCategory, categoryId, photo }) => {
    try {
      setIsLoading(true);
      setError("");

      // check is all info is provided or not
      const check = checkInfo(subCategory, categoryId, photo);
      if (!check) {
        throw new Error("Please fill in all required fields.");
      }

      // upload photo to cloud provider
      //  update photo to react cloudinary
      const photoData = new FormData();

      photoData.append("file", photo);
      photoData.append("upload_preset", "test-upload");
      photoData.append("cloud_name", "dqeuy96cs");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dqeuy96cs/image/upload",
        {
          method: "POST",
          body: photoData,
        }
      );
      const resData = await response.json();
      if (!resData.url) {
        throw new Error("Failed to upload photo");
      }
      const photoUrl = resData.url;

      // create new subcategory in the backend
      const info = {
        subCategory,
        categoryId,
        photo: photoUrl,
      };

      const res = await fetch(
        `http://localhost:5000/api/v1/subCategory/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info),
        }
      );
      const data = await res.json();
      console.log(data);

      if (data.status === "success") {
        setRefresh(refresh + 1);
        document.getElementById("my_modal_6").checked = false;
        toast.success("SubCategory created successfully");
      } else {
        throw new Error(data?.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, error, addASubcategory, refresh };
};

function checkInfo(subCategory, categoryId, photo) {
  if (!subCategory || !categoryId || !photo) {
    return false;
  }
  return true;
}

export default useAddASubCategory;
