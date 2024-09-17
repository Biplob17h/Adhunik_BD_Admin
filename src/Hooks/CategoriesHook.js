import { useEffect, useState } from "react";
import { MainApiLink } from "../App";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(1);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${MainApiLink}/api/v1/category/all`);
      const data = await res.json();
      if (data.status === "success") {
        setCategories(data.categories);
      } else {
        throw new Error(`Cannot fetch categories`);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [refresh]);

  return { categories, isLoading, setRefresh, refresh };
};

export default useCategories;
