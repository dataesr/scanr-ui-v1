import React from 'react';
//import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
//import PropTypes from 'prop-types';

import LogoCard from '../Ui/LogoCard/LogoCard';

/* SCSS */
import classes from './HeaderTitle.scss';

const HeaderTitle = () => (
  <section className={classes.HeaderTitle}>
    <img
      className={classes.img}
      src="./img/logo-ministere.svg"
      alt="Logo ministère"
    />
    <div className="container">
      <div className={classes.Path}>
        Accueil > Accessibilité
      </div>
      <div className={classes.Title}>
        Accessibilité
      </div>
    </div>
  </section>
);

export default HeaderTitle;
