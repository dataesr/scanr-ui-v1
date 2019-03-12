import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import ButtonToPage from '../Ui/Buttons/ButtonToPage';

/* SCSS */
import classes from './WhatAreOurSources.scss';

const WhatAreOurSources = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section className={classes.WhatAreOurSources}>
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <FormattedHTMLMessage
                id="WhatAreOurSources.lib"
                defaultMessage="WhatAreOurSources.lib"
              />
            </div>
            <div className="col-lg-3 text-right">
              <ButtonToPage
                className={classes.MarginTop}
                url=""
              >
                Découvrir
              </ButtonToPage>
            </div>
          </div>
        </div>
      </section>
    </IntlProvider>
  );
};

export default WhatAreOurSources;

WhatAreOurSources.propTypes = {
  language: PropTypes.string.isRequired,
};
