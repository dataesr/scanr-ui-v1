import React from 'react';
// import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import { FormattedHTMLMessage } from 'react-intl';

import PropTypes from 'prop-types';

import classes from './PersonNameCard.scss';
import ButtonWithModal from '../../../Shared/Ui/Buttons/ButtonWithModal';

/**
 * PersonCardName component
 * Url : .
 * Description : Carte avec logo, titre, label et tooltip
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

const PersonCardName = (props) => {
  const logo = (<div className={classes.Logo}><i className="fas fa-qrcode" aria-hidden="true" /></div>);
  const htmlList = (props.data.externalIds)
    ? props.data.externalIds.map(tag => (
      <li className="d-flex" key={tag}>
        <p className="m-0 pr-4">
          {tag.type}
        </p>
        <p className="m-0">
          {tag.id}
        </p>
      </li>
    ))
    : null;
  const tooltip = (props.tooltip) ? (
    <React.Fragment>
      <span className={classes.Tooltip_i_top_right} data-tip={props.tooltip}>i</span>
      <ReactTooltip html />
    </React.Fragment>
  ) : null;
  return (
    <React.Fragment>
      <div className={`d-flex flex-column pb-3 ${classes.PersonCardName}`}>
        <div className={classes.Logo}>
          {logo}
        </div>
        <div className={classes.Title}>
          <FormattedHTMLMessage id="Person.PersonNameCard.name" />
        </div>
        <div className={classes.Label}>
          {props.data.fullName}
        </div>
        {
          (props.data.gender) ? (
            <React.Fragment>
              <div className={classes.Title}>
                <FormattedHTMLMessage id="Person.PersonNameCard.gender" />
              </div>
              <div className={classes.Label}>
                {props.data.gender}
              </div>
            </React.Fragment>
          ) : null
        }
        {
          (props.data.externalIds && props.data.externalIds.length < 0)
            ? (
              <div className={`mt-auto pb-2 ${classes.Title}`}>
                <FormattedHTMLMessage id="Person.PersonNameCard.identifiers" />
              </div>
            ) : null
        }
        {
          (props.data.externalIds && props.data.externalIds.length < 0)
            ? (
              <ButtonWithModal
                logo="fas fa-qrcode"
                title={<FormattedHTMLMessage id="Person.PersonNameCard.identifiers" />}
                buttonLabel={<FormattedHTMLMessage id="Person.Global.seeAll" />}
                dataHtml={htmlList}
              />
            )
            : null
        }
        {tooltip}
      </div>
    </React.Fragment>
  );
};

export default PersonCardName;

PersonCardName.propTypes = {
  data: PropTypes.object,
  tooltip: PropTypes.string,
};
