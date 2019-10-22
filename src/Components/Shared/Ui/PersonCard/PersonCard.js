import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import getSelectKey from '../../../../Utils/getSelectKey';

import SubmitBox from '../../SubmitBox/SubmitBox';

import classes from './PersonCard.scss';

import logo from '../../svg/icon-fiche-responsable_h.svg';
import ButtonToPage from '../Buttons/ButtonToPage';


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

  let email = props.email;
  let firstName = props.firstName;
  let lastName = props.lastName;
  const role = props.role;
  let url = null;

  if (props.data.person) {
    if (props.data.person.email) {
      email = props.data.person.email;
    }
    if (props.data.person.firstName) {
      firstName = props.data.person.firstName;
    }
    if (props.data.person.lastName) {
      lastName = props.data.person.lastName;
    }
    if (props.data.person.id) {
      url = `/person/${props.data.person.id}`;
    }
  }

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <div className={`d-flex flex-column ${classes.PersonCard}`}>
        {
          (props.showTitle) ? (
            <div>
              <span className={classes.Title}>
                <FormattedHTMLMessage
                  id="PersonCard.title"
                  defaultMessage="PersonCard.title"
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
        <div>
          <span className={classes.Name}>
            {`${firstName} ${lastName}`}
          </span>
        </div>
        <div>
          {(role) ? <span className={classes.Role}>{role}</span> : null}
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
          (url)
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

        {(props.modifyMode) ? <SubmitBox language={props.language} masterKey={props.masterKey} label={getSelectKey(props.allData, 'label', props.language, 'fr')} /> : null}
      </div>
    </IntlProvider>
  );
};

export default PersonCard;

PersonCard.defaultProps = {
  masterKey: 'default.default',
  modifyMode: false,
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
  masterKey: PropTypes.string, // Utilisée pour le mode modifier/enrichir
  modifyMode: PropTypes.bool,
  allData: PropTypes.object.isRequired,
};
