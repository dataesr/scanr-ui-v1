import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_UNPAYWALL } from '../config/config';

export default function useUnpaywall(ids) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const fetchLimit = 50;
  const urls = ids.slice(0, fetchLimit).map(doi => `${API_UNPAYWALL}${doi}?email=unpaywall@impactstory.org`);
  async function getData() {
    const responses = await axios.all(urls.map(url => axios.get(url).catch(() => ({}))));
    const unpaywallData = responses.map(response => (response.status === 200) && response.data);
    setData(unpaywallData.filter(Boolean));
    setLoading(false);
  }
  useEffect(() => {
    getData();
  }, []);
  return { data, isLoading };
}

useUnpaywall.propTypes = {
  ids: PropTypes.string.isRequired,
};
