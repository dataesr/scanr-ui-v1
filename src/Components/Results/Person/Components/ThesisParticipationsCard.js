import React, { Fragment } from 'react';
// import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import { IntlProvider } from 'react-intl';

import PropTypes from 'prop-types';

import classes from './PersonNameCard.scss';
import ButtonWithModal from '../../../Shared/Ui/Buttons/ButtonWithModal';
import messagesFr from '../translations/fr.json';
import messagesEn from '../translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

/**
 * ThesisParticipations component
 * Url : .
 * Description : Carte avec logo, titre, label et tooltip
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

const ThesisParticipations = (props) => {
  const tooltip = (props.tooltip) ? (
    <Fragment>
      <span className={classes.Tooltip_i_top_right} data-tip={props.tooltip}>i</span>
      <ReactTooltip html />
    </Fragment>
  ) : null;
  if (props.dataHtml.length > 0) {
    return (
      <Fragment>
        <IntlProvider locale={props.language} messages={messages[props.language]}>
          <div className={`d-flex flex-column pb-3 ${classes.ParticipationsCard}`}>
            <div className="mt-auto pb-2">
              <p className={`m-0 ${classes.Number}`}>
                {props.dataHtml.length}
              </p>
              <p className={`m-0 ${classes.Title}`}>
                {props.title}
              </p>
            </div>
            <ButtonWithModal
              logo="fas fa-qrcode"
              title={props.title}
              buttonLabel={props.buttonLabel}
              dataHtml={props.dataHtml}
            />
            {tooltip}
          </div>
        </IntlProvider>
      </Fragment>
    );
  }
  return null;
};

export default ThesisParticipations;

ThesisParticipations.propTypes = {
  language: PropTypes.string,
  dataHtml: PropTypes.object,
  title: PropTypes.object,
  buttonLabel: PropTypes.object,
  tooltip: PropTypes.string,
};
