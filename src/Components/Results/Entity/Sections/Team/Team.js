import React, { Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

import EmptySection from '../../../../Shared/Results/EmptySection/EmptySection';
import SectionTitle from '../../../Shared/SectionTitle';
import Leaders from '../../Shared/Leaders/Leaders';
import TeamComposition from './SubComponents/teamComposition';
// import Background from '../../../Shared/images/poudre-orange_Fgris-BR.jpg';
import Background from '../../../../Shared/images/poudre-orange-Fbleu-BR.jpg';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import messagesEntityFr from '../../translations/fr.json';
import messagesEntityEn from '../../translations/en.json';

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
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  const messagesEntity = {
    fr: messagesEntityFr,
    en: messagesEntityEn,
  };

  const sectionStyle = {
    backgroundImage: `url(${Background})`,
  };
  const hideTeam = props.childs.length > 0;

  if (!props.data.leaders || props.data.leaders.length === 0) {
    return (
      <Fragment>
        <IntlProvider locale={props.language} messages={messages[props.language]}>
          <section className={`container-fluid ${classes.Team}`} style={sectionStyle}>
            <div className="container">
              <SectionTitle
                icon="fa-folder-open"
                objectType="structures"
                language={props.language}
                id={props.id}
                title={messagesEntity[props.language]['Entity.Section.Team.label']}
              />
              <div className="row">
                <div className="col">
                  <EmptySection
                    language={props.language}
                    color="#fff"
                  />
                </div>
              </div>
            </div>
          </section>
        </IntlProvider>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <section className={`container-fluid ${classes.Team}`} style={sectionStyle}>
          <div className="container">
            <SectionTitle
              icon="fa-folder-open"
              objectType="structures"
              language={props.language}
              id={props.id}
              title={messagesEntity[props.language]['Entity.Section.Team.label']}
            />
            <div className="row">
              <Leaders
                id={props.data.id}
                language={props.language}
                leaders={props.data.leaders}
              />
              { hideTeam ? null
                : (
                  <TeamComposition
                    id={props.data.id}
                    language={props.language}
                    persons={props.data.persons}
                  />
                )}
            </div>
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
  childs: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
