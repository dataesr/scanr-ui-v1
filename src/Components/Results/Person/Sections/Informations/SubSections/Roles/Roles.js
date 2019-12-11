import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';

import RoleCard from '../../../../Components/RoleCard';
import LexiconModal from '../../../../../../Shared/Lexicon/LexiconModal/LexiconModal';

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
                &nbsp;
                <LexiconModal language={props.language} target="PersonRole">
                  <i className="fa fa-info-circle" />
                </LexiconModal>
              </div>
              <div className="container-fluid">
                <div className="row">
                  {
                    props.data.roles.map(role => (
                      <div className={`col-md-6 col-sm-12 ${classes.CardContainer}`} key={role}>
                        <RoleCard
                          logo="fas fa-user"
                          data={role}
                          language={props.language}
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
  data: PropTypes.object,
};
