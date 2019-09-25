import React from 'react';
import PropTypes from 'prop-types';

import getSelectKey from '../../../../Utils/getSelectKey';

import ButtonToPage from '../../../Shared/Ui/Buttons/ButtonToPage';

import classes from './ProjectDetail.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/**
 * ProjectDetail
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const ProjectDetail = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  let description = null;
  if (props.data.value) {
    description = getSelectKey(props.data.value, 'description', props.language, 'fr');
  }
  if (!description) {
    description = 'Pas de description trouvée';
  }

  if (props.data.value) {
    return (
      <React.Fragment>
        <div className={classes.detailTitle}>
          {props.data.value.label.en}
        </div>
        <hr />
        <div className="row">
          <div className="col">
            {
              /* eslint-disable-next-line */
              /* `${this.state.selectedProject.founding.toLocaleString()} €  `*/
            }
            funding
          </div>
          <div className="col">
            {
              (props.data.value.duration)
                ? (
                  `${props.data.value.duration} mois`
                )
                : (
                  <div>
                    Durée inconnue
                  </div>
                )
            }
          </div>
        </div>
        <div className="row">
          <div className="col">
            {props.data.type}
          </div>
          <div className="col">
            {`n°${props.data.value.id}`}
          </div>
        </div>
        <hr />
        <div className={classes.Description}>
          <div className={classes.Content}>
            {description}
          </div>
        </div>
        <hr />
        <ButtonToPage
          className={classes.btn_dark}
          url={props.data.value.url}
        >
          Voir le projet
        </ButtonToPage>
      </React.Fragment>
    );
  }
  return (
    <div className={classes.Empty}>
      {messages[props.language]['Entity.projects.empty.label']}
    </div>
  );
};

export default ProjectDetail;

ProjectDetail.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
};
