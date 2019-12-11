import React, { Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

import EmptySection from '../../../Shared/EmptySection/EmptySection';
import SectionTitle from '../../../Shared/SectionTitle';
import PrizeCard from '../../../../Shared/Ui/PrizeCard/PrizeCard';

import getSelectKey from '../../../../../Utils/getSelectKey';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import messagesEntityFr from '../../translations/fr.json';
import messagesEntityEn from '../../translations/en.json';

import classes from './Awards.scss';

/**
 * Awards
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Awards = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  const messagesEntity = {
    fr: messagesEntityFr,
    en: messagesEntityEn,
  };
  if (!props.data || !props.data.badges) {
    return (
      <Fragment>
        <IntlProvider locale={props.language} messages={messages[props.language]}>
          <section className={`container-fluid ${classes.Awards}`}>
            <div className="container">
              <SectionTitle
                icon="fa-th"
                objectType="structures"
                language={props.language}
                id={props.id}
                title={messagesEntity[props.language]['Entity.Section.Awards.label']}
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
  const nonNetworkBadges = props.data.badges.filter(b => !(['carnot', 'gican', 'gifas', 'gicat', 'rescurie', 'allenvi', 'itagricole', 'irt', 'polecompetitivite', 'satt'].includes(b.code.toLowerCase())));

  return (nonNetworkBadges.length > 0) ? (
    <Fragment>
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <section className={`container-fluid ${classes.Awards}`}>
          <div className="container">
            <SectionTitle
              icon="fa-th"
              objectType="structures"
              language={props.language}
              id={props.id}
              title={messagesEntity[props.language]['Entity.Section.Awards.label']}
            />
            <div className="row">
              {
                nonNetworkBadges.map(badge => (
                  <div className={`col-md-4 ${classes.CardContainer}`}>
                    <PrizeCard
                      date={null}
                      language={props.language}
                      label={getSelectKey(badge, 'label', props.language, 'fr')}
                      icon="prize"
                      color="#fe7747"
                    />
                  </div>
                ))
              }
            </div>
          </div>
        </section>
      </IntlProvider>
    </Fragment>
  ) : null;
};

export default Awards;

Awards.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
