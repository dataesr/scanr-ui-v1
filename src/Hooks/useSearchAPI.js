import { useState, useEffect } from 'react';
import Axios from 'axios';
import { API_ERRORS_SCANR } from '../config/config';

function useSearchAPI(BASE_URL, request) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  async function getData() {
    try {
      const response = await Axios.post(BASE_URL, request);
      const res = await response.data;
      setData(res);
      setLoading(false);
    } catch (error) {
      Axios.post(API_ERRORS_SCANR, { error });
      setError(true);
      setLoading(false);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return { data, isLoading, isError };
}
export default useSearchAPI;
