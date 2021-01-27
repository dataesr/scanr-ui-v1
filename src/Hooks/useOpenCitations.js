import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { API_ERRORS_SCANR, API_OPEN_CITATIONS } from '../config/config';

export default function useOpenCitations(api, id) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  async function getData() {
    const url = `${API_OPEN_CITATIONS}${api}/${id}`;
    try {
      const response = await Axios.get(url);
      const res = await response.data || [];
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

useOpenCitations.propTypes = {
  ids: PropTypes.string.isRequired,
};
