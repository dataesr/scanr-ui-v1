import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';

import SimpleCard from '../../../../../../Shared/Ui/SimpleCard/SimpleCard2';

import classes from './Activities.scss';

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
const Activities = (props) => {
  if (props.data) {
    return (
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <section className="container-fluid">
          <div className="row">
            <div className={`col-12 ${classes.CardContainer}`}>
              <div className={classes.SubSectionTitle}>
                <FormattedHTMLMessage
                  id="Person.informations.activities.title"
                  defaultMessage="Person.informations.activities.title"
                />
              </div>
              <div className={`col-12 ${classes.CardContainer}`}>
                <SimpleCard
                  logo="fas fa-flask"
                  title="Domaines de recherche"
                  language={props.language}
                  label="Tous les domaines"
                  masterKey={props.masterKey}
                  modifyMode={props.modifyMode}
                  allData={props.allData}
                />
              </div>
              <div className="container-fluid">
                <div className="row">
                  <div className={`col-6 ${classes.CardContainer}`}>
                    <SimpleCard
                      logo="fas fa-flask"
                      title="Domaines de recherche"
                      language={props.language}
                      label="Tous les domaines"
                      masterKey={props.masterKey}
                      modifyMode={props.modifyMode}
                      allData={props.allData}
                    />
                  </div>
                  <div className={`col-6 ${classes.NoSpace}`}>
                    <div className="container-fluid">
                      <div className="row">
                        <div className={`col-12 ${classes.CardContainer}`}>
                          <SimpleCard
                            logo="fas fa-flask"
                            title="Domaines de recherche"
                            language={props.language}
                            label="Tous les domaines"
                            masterKey={props.masterKey}
                            modifyMode={props.modifyMode}
                            allData={props.allData}
                          />
                        </div>
                        <div className={`col-12 ${classes.CardContainer}`}>
                          <SimpleCard
                            logo="fas fa-flask"
                            title="Domaines de recherche"
                            language={props.language}
                            label="Tous les domaines"
                            masterKey={props.masterKey}
                            modifyMode={props.modifyMode}
                            allData={props.allData}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
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

export default Activities;

Activities.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.array,
  masterKey: PropTypes.string, // Utilisée pour le mode modifier/enrichir
  modifyMode: PropTypes.bool,
  allData: PropTypes.object.isRequired,
};

// modifyModeHandle: PropTypes.func.isRequired,
// modifyMode: PropTypes.bool.isRequired,
