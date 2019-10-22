import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';

import RoleCard from '../../../../Components/RoleCard';

import classes from './Roles.scss';

import messagesFr from '../../../../translations/fr.json';
import messagesEn from '../../../../translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

/**
 * Roles
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Roles = (props) => {
  if (props.data.roles) {
    return (
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <section className="container-fluid">
          <div className="row">
            <div className={`col-12 ${classes.CardContainer}`}>
              <div className={classes.SubSectionTitle}>
                <FormattedHTMLMessage
                  id="Person.informations.roles.title"
                  defaultMessage="Person.informations.roles.title"
                />
              </div>
              <div className="container-fluid">
                <div className="row">
                  {
                    props.data.roles.map(role => (
                      <div className={`col-md-6 col-sm-12 ${classes.CardContainer}`}>
                        <RoleCard
                          logo="fas fa-user"
                          data={role}
                          language={props.language}
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

export default Roles;

Roles.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.array,
  masterKey: PropTypes.string, // Utilisée pour le mode modifier/enrichir
  modifyMode: PropTypes.bool,
  allData: PropTypes.object.isRequired,
};

// modifyModeHandle: PropTypes.func.isRequired,
// modifyMode: PropTypes.bool.isRequired,
