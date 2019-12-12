import React from 'react';
import PropTypes from 'prop-types';
import useLikeApi from '../../../../../Hooks/useLikeApi';
import SectionLoader from '../../../../Shared/LoadingSpinners/GraphSpinner';
import Errors from '../../../../Shared/Errors/Errors';

import ProjectCard from '../../../../Search/Results/ResultCards/ProjectCard';

import classes from './Similars.scss';

/**
 * Similars
 * Url : /person/:id
 * Description : A section that present similar authors for a person
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const SimilarProjects = (props) => {
  const request = {
    fields: ['publications.title', 'description', 'title', 'domains.label', 'label'],
    likeIds: [props.id],
    likeTexts: [],
  };
  const { data, isLoading, isError } = useLikeApi('projects', request);
  if (isLoading) return <SectionLoader />;
  if (isError) return <Errors error={500} />;
  return (
    <ul className={`row px-2 ${classes.Ul}`}>
      {
        data.slice(0, 6).map(item => (
          <li key={item.value.id} className={`col-md-4 ${classes.Li}`}>
            <ProjectCard
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

export default SimilarProjects;

SimilarProjects.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
