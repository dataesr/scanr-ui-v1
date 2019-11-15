import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';

import SectionTitle from '../../../Shared/SectionTitle';
import PublicationCard from '../../../../Search/SearchResults/ResultCards/PublicationCard';

import classes from './Productions.scss';
import messagesFr from '../../translations/fr.json';
import messagesEn from '../../translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};
/**
 * Productions
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Productions = (props) => {
  const bgUrl = './img/poudre-projects_fond_gris.jpg';
  const sectionStyle = {
    backgroundImage: `url(${bgUrl})`,
  };

  if (props.data) {
    return (
      <section className={`container-fluid ${classes.Productions}`} style={sectionStyle}>
        <IntlProvider locale={props.language} messages={messages[props.language]}>
          <div className="container">
            <SectionTitle
              icon="fa-open"
              objectType="projects"
              language={props.language}
              id={props.id}
              title={messages[props.language]['Project.productions.title']}
            />
            <div className="row">
              {
                props.data.map(prod => (
                  <div key={prod.id} className="col-4 px-1">
                    <PublicationCard
                      language={props.language}
                      data={prod}
                    />
                  </div>
                ))
              }
            </div>
          </div>
        </IntlProvider>
      </section>
    );
  }
  return (
    <section className={`container-fluid ${classes.Productions}`} style={sectionStyle}>
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <div className="container">
          <SectionTitle
            icon="fa-th"
            objectType="projects"
            language={props.language}
            id={props.id}
            title={messages[props.language]['Project.productions.title']}
          />
          <div className="row">
            <div className={`d-flex pl-4 pr-4 ${classes.noDataOnSection}`}>
              <FormattedHTMLMessage id="Project.productions.noProductions" defaultMessage="Project.productions.noProductions" />
            </div>
          </div>
        </div>
      </IntlProvider>
    </section>
  );
};

export default Productions;

Productions.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.array,
};
