import React, { Fragment } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import SectionTitle from '../../../Shared/Results/SectionTitle/SectionTitle';
import Leaders from '../Shared/Leaders/Leaders';

import Background from '../../../Shared/images/poudre-jaune_Fgris-BR.jpg';

/* Gestion des langues */
import messagesFr from '../translations/fr.json';
import messagesEn from '../translations/en.json';

import classes from './Team.scss';

/**
 * Team
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Team = (props) => {
  if (!props.data) {
    return null;
  }
  const sectionStyle = {
    backgroundImage: `url(${Background})`,
  };
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  return (
    <Fragment>
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <section className={`container-fluid ${classes.Team}`} style={sectionStyle}>
          <div className="container">
            <SectionTitle icon="fas fa-users">
              <FormattedHTMLMessage id="Entity.Section.Team.label" />
            </SectionTitle>

            <Leaders
              id={props.data.id}
              language={props.language}
              leaders={props.data.leaders}
            />
          </div>
        </section>
      </IntlProvider>
    </Fragment>
  );
};

export default Team;

Team.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};
