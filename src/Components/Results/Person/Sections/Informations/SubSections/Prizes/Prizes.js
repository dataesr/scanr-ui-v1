import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';

import PrizeCard from '../../../../../../Shared/Ui/PrizeCard/PrizeCard';

import classes from './Prizes.scss';

import messagesFr from '../../../../translations/fr.json';
import messagesEn from '../../../../translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

/**
 * Affiliations
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Prizes = (props) => {
  if (props.data.awards) {
    return (
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <section className="container-fluid">
          <div className="row">
            <div className={`col-12 ${classes.CardContainer}`}>
              <div className={classes.SubSectionTitle}>
                <FormattedHTMLMessage
                  id="Person.informations.prizes.title"
                  defaultMessage="Person.informations.prizes.title"
                />
              </div>
              <div className="container-fluid">
                <div className="row">
                  {
                    props.data.awards.map(award => (
                      <div className={`col-6 ${classes.CardContainer}`}>
                        <PrizeCard
                          date={award.date}
                          language={props.language}
                          label={award.label}
                          icon="prize"
                          color="#fe7747"
                          masterKey={props.masterKey}
                          modifyMode={props.modifyMode}
                          allData={props.allData}
                        />
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      </IntlProvider>
    );
  }
  return null;
};

export default Prizes;

Prizes.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.array,
  masterKey: PropTypes.string, // Utilisée pour le mode modifier/enrichir
  modifyMode: PropTypes.bool,
  allData: PropTypes.object.isRequired,
};

// modifyModeHandle: PropTypes.func.isRequired,
// modifyMode: PropTypes.bool.isRequired,
