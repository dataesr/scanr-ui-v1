import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';

import SimpleCard from '../../../../../Shared/Ui/SimpleCard/SimpleCard2';
import LogoCard from '../../../../../Shared/Ui/LogoCard/LogoCard';
import getSelectKey from '../../../../../../Utils/getSelectKey';

import classes from './SubSectionsStyles.scss';
/**
 * Informations
 * Url : .
 * Informations : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

const Identity = (props) => {
  const filterKeys = ['label', 'id', 'acronym', 'type'];
  let filtered = null;
  if (Object.keys(props.data).length > 0) {
    filtered = Object.keys(props.data)
      .filter(key => filterKeys.includes(key))
      .reduce((obj, key) => ({
        ...obj,
        [key]: props.data[key],
      }));
  }
  if (filtered) {
    const title = getSelectKey(filtered, 'label', props.language, 'default');
    const acro = (getSelectKey(filtered, 'acronym', props.language, 'default'))
      ? ` (${getSelectKey(filtered, 'acronym', props.language, 'default')})`
      : '';
    const titleAcro = title + acro;
    return (
      <div className="col-6">
        <div className="row">
          <h3 className={`col-12 ${classes.SubSectionTitle}`}>
            {<FormattedHTMLMessage id="Project.Informations.Identity.title" />}
          </h3>
          <div className={`col-6 ${classes.CardContainer}`}>
            <LogoCard
              language={props.language}
              url={`/img/projects/${props.data.type.toLowerCase()}.png`}
              label={props.data.type.toLowerCase()}
              cssClass="Height150"
            />
          </div>
          <div className={`col-6 ${classes.CardContainer}`}>
            <SimpleCard
              language={props.language}
              logo="fas fa-qrcode"
              title={<FormattedHTMLMessage id="Project.Informations.Identity.identifier" />}
              label={props.data.id}
            />
          </div>
          <div className={`col-12 ${classes.CardContainer}`}>
            <SimpleCard
              language={props.language}
              logo="fas fa-calendar-day"
              title={<FormattedHTMLMessage id="Project.Informations.Identity.name" />}
              label={titleAcro}
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default Identity;

Identity.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
};
