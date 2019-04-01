import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import ButtonToPage from '../Ui/Buttons/ButtonToPage';

/* SCSS */
import classes from './BannerOpendata.scss';

const BannerOpendata = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section className={classes.BannerOpendata}>
        <div className="container">
          <div className="row">
            <div className="col-lg">
              <div className={classes.Title}>
                <FormattedHTMLMessage
                  id={props.title}
                  defaultMessage={props.title}
                />
              </div>
              <div className={classes.Content}>
                <FormattedHTMLMessage
                  id={props.child}
                  defaultMessage={props.child}
                />
              </div>
            </div>
            <div className="col-lg-2 text-right">
              <ButtonToPage
                className={classes.Button}
                url=""
              >
                <FormattedHTMLMessage
                  id={props.lib_button}
                  defaultMessage={props.lib_button}
                />
              </ButtonToPage>
            </div>
          </div>

        </div>
      </section>
    </IntlProvider>
  );
};

export default BannerOpendata;

BannerOpendata.propTypes = {
  language: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  child: PropTypes.string.isRequired,
  lib_button: PropTypes.string.isRequired,
};
