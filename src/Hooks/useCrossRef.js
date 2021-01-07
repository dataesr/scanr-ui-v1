import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { API_ERRORS_SCANR, API_CROSSREF } from '../config/config';

export default function useCrossRef(ids) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  async function getData() {
    const url = `${API_CROSSREF}?filter=${ids.map(doi => `doi:${doi}`).join(',')}`;
    const response = await Axios.get(url);
    try {
      const res = await response.data.message.items || [];
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

useCrossRef.propTypes = {
  ids: PropTypes.string.isRequired,
};
