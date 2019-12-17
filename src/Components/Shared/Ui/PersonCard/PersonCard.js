import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import classes from './PersonCard.scss';

import logo from '../../svg/icon-fiche-responsable_h.svg';
import ButtonToPage from '../Buttons/ButtonToPage2';


/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/**
 * Leaders
 * Url : ex: /entite/200711886U
 * Description : Bloc Direction visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const PersonCard = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  let email = props.data.email;
  const country = props.data.country;
  let firstName = props.data.firstName;
  let lastName = props.data.lastName;
  let fullName = props.data.fullName;
  const exists = (props.data.person) ? (props.data.person.fullName !== undefined) : false;
  const role = (props.role) ? (props.role) : null;
  let url = null;
  if (props.data.person) {
    if (props.data.person.email) {
      email = props.data.person.email;
    }
    if (props.data.person.firstName) {
      firstName = props.data.person.firstName;
    }
    if (props.data.person.fullName) {
      fullName = props.data.person.fullName;
    }
    if (props.data.person.lastName) {
      lastName = props.data.person.lastName;
    }
    if (props.data.person.id) {
      url = `/person/${props.data.person.id}`;
    }
  }
  if (!fullName) {
    fullName = `${firstName} ${lastName}`;
  }
  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <div className={`d-flex flex-column ${classes.PersonCard} ${props.className}`}>
        {
          (props.showTitle) ? (
            <div>
              <span className={classes.Title}>
                <FormattedHTMLMessage
                  id="PersonCard.titleFromData"
                  defaultMessage={role}
                />
              </span>
            </div>
          ) : null
        }
        <div>
          <div className={classes.Logo}>
            <img src={logo} alt="" />
          </div>
        </div>
        <div className={classes.Name}>
          {fullName}
        </div>
        <div>
          {(role) ? (
            <span className={classes.Role}>
              {messages[props.language][role]}
            </span>
          ) : null}
        </div>
        <div>
          {(country) ? (
            <span className={classes.Role}>
              {country}
            </span>
          ) : null}
        </div>
        <div>
          {
            (email)
              ? (
                <span className={classes.Email}>
                  <a href={`"mailto:${props.email}"`}>
                    <FormattedHTMLMessage
                      id="PersonCard.emailLink.label"
                      defaultMessage="PersonCard.emailLink.label"
                    />
                  </a>
                </span>
              )
              : null
          }
        </div>
        {
          (url && exists)
            ? (
              <div className="mt-auto">
                <ButtonToPage
                  className={`${classes.Button} ${classes.btn_scanrBlue}`}
                  url={url}
                >
                  <FormattedHTMLMessage
                    id="PersonCard.ButtonToPage.label"
                    defaultMessage="PersonCard.ButtonToPage.label"
                  />
                </ButtonToPage>
              </div>
            )
            : null
        }
      </div>
    </IntlProvider>
  );
};

export default PersonCard;

PersonCard.defaultProps = {
  showTitle: true,
};

PersonCard.propTypes = {
  data: PropTypes.object,
  showTitle: PropTypes.bool,
  email: PropTypes.string,
  firstName: PropTypes.string,
  language: PropTypes.string,
  lastName: PropTypes.string,
  role: PropTypes.string,
  className: PropTypes.any,
};
