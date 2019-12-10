import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import useSearchAPI from '../../../../../Hooks/useSearchAPI';

import { API_PUBLICATIONS_SEARCH_END_POINT } from '../../../../../config/config';
import SectionLoader from '../../../../Shared/LoadingSpinners/GraphSpinner';
import Errors from '../../../../Shared/Errors/Errors';
import PublicationCard from '../../../../Search/Results/ResultCards/PublicationCard';
import Background from '../../../../Shared/images/poudre-fuschia_Fgris-B.jpg';
import SectionTitle from '../../../Shared/SectionTitle';
import ThesisParticipationsCard from '../../Components/ThesisParticipationsCard';
import IsOa from '../../../Production/Shared/Oa/OaCard';
import OaLink from '../../../Production/Shared/Oa/OaLink';


import classes from './Thesis.scss';

/**
 * SimilarEntities
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const parseThesisData = (d, id) => {
  let theses = [];
  const rapporteur = [];
  const direction = [];
  if (d && d.length > 0) {
    d.forEach((thes, i) => {
      thes.value.authors.forEach((author) => {
        if (author.role === 'author' && author.person && author.person.id === id) {
          theses.push(d[i].value);
        } else if (author.role === 'directeurthese' && author.person && author.person.id === id) {
          direction.push(d[i].value);
        } else if (author.role === 'rapporteur' && author.person && author.person.id === id) {
          rapporteur.push(d[i].value);
        }
      });
    });
  }
  if (theses.length > 0) {
    const thesesOnly = theses.filter(t => (t.id).indexOf('these') !== -1);
    if (thesesOnly.length !== 0) {
      theses = thesesOnly;
    }
  }
  return { rapporteur, theses, direction };
};

const Thesis = (props) => {
  const request = {
    pageSize: 500,
    sourceFields: ['title', 'authors', 'oaEvidence', 'id', 'publicationDate', 'isOa', 'productionType'],
    filters: {
      productionType: {
        type: 'MultiValueSearchFilter',
        op: 'all',
        values: ['thesis'],
      },
      'authors.person.id': {
        type: 'MultiValueSearchFilter',
        op: 'all',
        values: [props.id],
      },
    },
  };
  const { data, isLoading, isError } = useSearchAPI(API_PUBLICATIONS_SEARCH_END_POINT, request);
  if (isLoading) {
    return (<SectionLoader />);
  }
  if (isError) {
    return (<Errors />);
  }
  const { rapporteur, theses, direction } = parseThesisData(data);
  return (
    <div>{JSON.strigify(theses)}</div>
  );
};

export default Thesis;

Thesis.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
