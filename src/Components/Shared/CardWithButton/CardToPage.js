import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import ButtonToPage from '../Ui/Buttons/ButtonToPage';

/* SCSS */
import classes from './CardToPage.scss';

const CardToPage = (props) => {
  const style = {
    backgroundColor: props.bgColor,
    color: props.textColor,
  };

  return (
    <div className={`card text-center mb-1 ${classes.CardToPage}`} style={style}>
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
            id={`ButtonToPage.${props.text}`}
            defaultMessage={`ButtonToPage.${props.text}`}
          />
        </ButtonToPage>
      </div>
    </div>
  );
};


export default CardToPage;

CardToPage.propTypes = {
  bgColor: PropTypes.string.isRequired,
  labelKey: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
};
