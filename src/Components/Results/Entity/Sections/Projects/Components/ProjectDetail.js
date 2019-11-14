import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import getSelectKey from '../../../../../../Utils/getSelectKey';
import ButtonToPage from '../../../../../Shared/Ui/Buttons/ButtonToPage';

import classes from './ProjectDetail.scss';

/**
 * ProjectDetail
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const ProjectDetail = (props) => {
  if (Object.entries(props.data).length === 0) {
    return null;
  }

  // Mots clés
  let keywords = [];
  if (props.data.keywords && props.data.keywords.fr) {
    keywords = props.data.keywords.fr;
  } else if (props.data.keywords && props.data.keywords.en) {
    keywords = props.data.keywords.en;
  }
  keywords = [...new Set(keywords)];


  return (
    <div className="d-flex flex-column h-100">
      <p className={classes.detailTitle}>
        {getSelectKey(props.data, 'label', props.language, 'default')}
      </p>
      <p className={`${classes.Grey} ${classes.Italic}`}>
        {
          (props.data.participantCount === 0 || props.data.participantCount === 1)
            ? `${props.data.participantCount} participant`
            : `${props.data.participantCount} participants`
        }
      </p>
      <div>
        <p className={classes.Grey}>
          {`id: ${props.data.id}`}
        </p>
      </div>
      {
        (getSelectKey(props.data, 'description', props.language, 'default') || keywords.length > 0)
          ? <hr className={`w-100 ${classes[props.data.type]}`} />
          : null
      }
      {
        (getSelectKey(props.data, 'description', props.language, 'default'))
          ? (
            <div className={classes.Summary}>
              {getSelectKey(props.data, 'description', props.language, 'default')}
            </div>
          )
          : null
      }
      <div className={classes.Keywords}>
        {
          keywords.map(keyword => (
            <Fragment key={keyword}>
              <a href={`/recherche/projects?query=${keyword}`}>
                {`#${keyword}`}
              </a>
              &nbsp;
            </Fragment>
          ))
        }
      </div>
      <hr className={`w-100 mt-auto ${classes[props.data.ProjectType]}`} />
      <div className="d-flex justify-content-between">
        <ButtonToPage
          className={`${classes.btn_scanrBlue} ${classes.RectangleButton}`}
          url={`project/${props.data.id}`}
        >
          Voir le projet dans scanR
        </ButtonToPage>
      </div>
    </div>
  );
};

export default ProjectDetail;

ProjectDetail.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
};
