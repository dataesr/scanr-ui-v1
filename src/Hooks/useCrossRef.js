import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { API_ERRORS_SCANR, API_CROSSREF } from '../config/config';

function parseCrossRef(item) {
  const obj = {};
  obj.doi = item.DOI;
  if (item.title.length) {
    obj.title = item.title[0];
  }
  if (item.issued && item.issued['date-parts'].length && item.issued['date-parts'][0].length) {
    obj.date = item.issued['date-parts'][0][0];
  }
  if (item['container-title'] && item['container-title'].length) {
    obj.journal = item['container-title'][0];
  }
  if (item.author && item.author.length) {
    obj.num_authors = item.author.length;
    obj.authors = item.author.map(
      auth => `${(auth.given) ? `${auth.given} ` : ''}${(auth.family) ? auth.family : ''}`,
    );
  }
  return obj;
}

export default function useCrossRef(ids) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  async function getData() {
    const url = `${API_CROSSREF}?filter=${ids.slice(0, 50).map(doi => `doi:${doi}`).join(',')}&rows=50`;
    const response = await Axios.get(url);
    try {
      const res = await response.data.message.items || [];
      setData(res.map(item => parseCrossRef(item)));
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
