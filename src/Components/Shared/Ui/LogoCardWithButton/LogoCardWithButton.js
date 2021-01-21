import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ReactImageFallback from 'react-image-fallback';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import { GlobalContext } from '../../../../GlobalContext';

import ButtonToPage from '../Buttons/ButtonToPage2';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './LogoCardWithButton.scss';

// import fallbackImage from '../../images/not_found_image.png';
import initialImage from '../../images/Spinner-1s-70px.gif';

/**
 * LogoCardWithButton
 * Url : ui
 * Description : Composant affichant un logo soit à partir d'une URL distante, soit à partir du répertoire ./img
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const LogoCardWithButton = (props) => {
  const context = useContext(GlobalContext);
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  const src = (props.src) ? props.src : `./img/logo-${props.label}.svg`;
  let cssClass = '';

  if (props.cssClass) {
    cssClass = classes[`${props.cssClass}`];
  }
  const defaultText = (props.link) ? (props.link) : 'Website';

  return (
    <IntlProvider locale={context.language} messages={messages[context.language]}>
      <div className={`${classes.card} ${cssClass}`}>
        <a href={props.targetUrl} target="_blank" rel="noopener noreferrer">
          <ReactImageFallback
            src={src}
            fallbackImage={props.url}
            initialImage={initialImage}
            alt={props.label}
            className={`img-fluid ${classes.img}`}
          />
        </a>
        {
            (props.targetUrl)
              ? (
                <div className="mt-auto">
                  <ButtonToPage
                    className={`${classes.Button} ${classes.btn_scanrBlue}`}
                    url={props.targetUrl}
                    target="_blank"
                  >
                    <FormattedHTMLMessage
                      id={props.link}
                      defaultMessage={defaultText}
                    />
                  </ButtonToPage>
                </div>
              ) : null
        }
      </div>
    </IntlProvider>
  );
};

export default LogoCardWithButton;

LogoCardWithButton.propTypes = {
  label: PropTypes.string,
  src: PropTypes.string,
  url: PropTypes.string,
  link: PropTypes.string,
  cssClass: PropTypes.string,
  targetUrl: PropTypes.string,
};
