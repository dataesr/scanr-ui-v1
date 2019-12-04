import { useState, useEffect } from 'react';
import Axios from 'axios';
import {
  API_ERRORS_SCANR,
  API_STRUCTURE_LIKE_END_POINT,
  API_PUBLICATIONS_LIKE_END_POINT,
  API_PROJECT_LIKE_END_POINT,
  API_PERSON_LIKE_END_POINT,
} from '../config/config';

const apiUrls = {
  structures: API_STRUCTURE_LIKE_END_POINT,
  persons: API_PERSON_LIKE_END_POINT,
  projects: API_PROJECT_LIKE_END_POINT,
  publications: API_PUBLICATIONS_LIKE_END_POINT,
};

function useLikeApi(api, request) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  async function getData() {
    const url = apiUrls[api];
    const response = await Axios.post(url, request);
    try {
      const res = await response.data.results;
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
export default useLikeApi;

// const errorJSON = {
//   type: 'React boundary',
//   url: window.location.href.toString(),
//   agent: window.navigator.userAgent.toString(),
//   msg: error.toString(),
//   info: info.componentStack,
// };
// Axios.post(API_ERRORS_SCANR, errorJSON);
