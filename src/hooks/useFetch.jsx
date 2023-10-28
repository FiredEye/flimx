import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/Api";

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchData();
  }, [url]);
  const fetchData = async () => {
    setLoading(true);
    setData(null);
    setError(null);
    try {
      const res = await fetchDataFromApi(url);
      setData(res);
    } catch (err) {
      setError("something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error };
};

export default useFetch;
