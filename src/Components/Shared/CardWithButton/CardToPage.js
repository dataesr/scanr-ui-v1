import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import ButtonToPage from '../Ui/Buttons/ButtonToPage';

/* SCSS */
import classes from './CardToPage.scss';

const CardToPage = props => (
  <div className={`card text-center mb-1 ${classes.CardToPage} ${classes[props.cssClass]}`}>
    <div className={classes.Title}>
      <FormattedHTMLMessage
        id={`CardToPage.${props.labelKey}`}
        defaultMessage={`CardToPage.${props.labelKey}`}
      />
    </div>
    <div className={classes.Button}>
      <ButtonToPage
        className={classes.MarginTop}
        url={props.url}
      >
        <FormattedHTMLMessage
          id={`ButtonToPage.${props.btnText}`}
          defaultMessage={`ButtonToPage.${props.btnText}`}
        />
      </ButtonToPage>
    </div>
  </div>
);


export default CardToPage;

CardToPage.propTypes = {
  cssClass: PropTypes.string.isRequired,
  labelKey: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
};
