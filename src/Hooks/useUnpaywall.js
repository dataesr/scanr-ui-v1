import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { API_ERRORS_SCANR, API_UNPAYWALL } from '../config/config';

function parseUnpaywall(item) {
  const obj = {
    doi: '',
    title: '',
    date: '',
    journal: '',
    authors: [],
  };
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

export default function useUnpaywall(ids) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const fetchLimit = 50;
  const urls = ids.slice(0, fetchLimit).map(doi => `${API_UNPAYWALL}${doi}?email=unpaywall@impactstory.org`);
  console.log(urls);
  async function getData() {
    Axios.all(urls).then(Axios.spread((...responses) => {
      console.log(responses);
    })).catch((errors) => {
      console.log(errors);
    });
  }
  useEffect(() => {
    getData();
  }, []);
  return { data, isLoading, isError };
}

useUnpaywall.propTypes = {
  ids: PropTypes.string.isRequired,
};
