import React, { Fragment } from 'react';
// import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import ReactTooltip from 'react-tooltip';

import PropTypes from 'prop-types';

import classes from './PersonNameCard.scss';
import ButtonWithModal from '../../../Shared/Ui/Buttons/ButtonWithModal';

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
      </Fragment>
    );
  }
  return null;
};

export default ThesisParticipations;

ThesisParticipations.propTypes = {
  dataHtml: PropTypes.any,
  title: PropTypes.object,
  buttonLabel: PropTypes.object,
  tooltip: PropTypes.string,
};
