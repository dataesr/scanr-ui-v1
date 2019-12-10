import React from 'react';
import PropTypes from 'prop-types';
import useLikeApi from '../../../../../Hooks/useLikeApi';
import SectionLoader from '../../../../Shared/LoadingSpinners/GraphSpinner';
import Errors from '../../../../Shared/Errors/Errors';

import PersonCard from '../../../../Search/Results/ResultCards/PersonCard';

import classes from './Similars.scss';

/**
 * Similars
 * Url : /person/:id
 * Description : A section that present similar authors for a person
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const SimilarPersons = (props) => {
  const filtercoContributors = (d) => {
    console.log(d);
    const forbiddenSimilars = (props.coContributors) ? props.coContributors.map(co => co.id) : [];
    const pushData = [];
    if (d.length) {
      for (let i = 0; i < Math.min(d.length, 10); i += 1) {
        const isCo = forbiddenSimilars.includes(d[i].value.id);
        if (d[i].value.id !== props.id && !isCo) {
          pushData.push(d[i]);
        }
        if (pushData.length === 8) {
          break;
        }
      }
      return pushData;
    }
    return [];
  };
  const request = {
    fields: ['publications.publication.title', 'keywords.fr', 'keywords.en', 'domains.label.en', 'domains.label.fr'],
    likeIds: [props.id],
    likeTexts: [],
    lang: 'default',
    pageSize: 10,
  };
  const { data, isLoading, isError } = useLikeApi('persons', request);
  if (isLoading) {
    return (<SectionLoader />);
  }
  if (isError) {
    return (<Errors />);
  }
  const filteredData = filtercoContributors(data);
  console.log(filteredData);
  return (
    <ul className={`row px-2 ${classes.Ul}`}>
      {
        filteredData.map(item => (
          <li key={item.value} className={`col-sm-6 col-lg-3 ${classes.Li}`}>
            <PersonCard
              data={item.value}
              small
              language={props.language}
            />
          </li>
        ))
      }
    </ul>
  );
};

export default SimilarPersons;

SimilarPersons.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  coContributors: PropTypes.array.isRequired,
};
