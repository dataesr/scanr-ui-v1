import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header-homePage';
import CardTwoColumns from './CardTwoColumns';
import CardOneColumn from './CardOneColumn';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './Opendata.scss';


const Opendata = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <div className={`container-fluid ${classes.Opendata}`}>
        <Header
          language={props.language}
          switchLanguage={props.switchLanguage}
        />

        <section className={classes.Content}>
          <div className="container">
            <div className="row">
              <CardTwoColumns
                language={props.language}
                title="Opendata.TitleOpendata"
              >
                <FormattedHTMLMessage
                  id="Opendata.TitleOpendata.content"
                  defaultMessage="Opendata.TitleOpendata.content"
                />
              </CardTwoColumns>
              <CardOneColumn
                language={props.language}
                schema="entities"
                title="Opendata.card01"
                url="https://worldwide.espacenet.com/?locale=fr_EP"
              />
              <CardOneColumn
                language={props.language}
                schema="entities"
                title="Opendata.card02"
                url="https://worldwide.espacenet.com/?locale=fr_EP"
              />
              <CardOneColumn
                language={props.language}
                schema="projects"
                title="Opendata.card03"
                url="https://worldwide.espacenet.com/?locale=fr_EP"
              />
              <CardOneColumn
                language={props.language}
                schema="projects"
                title="Opendata.card04"
                url="https://worldwide.espacenet.com/?locale=fr_EP"
              />
              <CardOneColumn
                language={props.language}
                schema="entities"
                title="Opendata.card05"
                url="https://worldwide.espacenet.com/?locale=fr_EP"
              />
              <CardOneColumn
                language={props.language}
                schema="persons"
                title="Opendata.card06"
                url="https://worldwide.espacenet.com/?locale=fr_EP"
              />
              <CardOneColumn
                language={props.language}
                schema="persons"
                title="Opendata.card07"
                url="https://worldwide.espacenet.com/?locale=fr_EP"
              />
              <CardOneColumn
                language={props.language}
                schema="entities"
                title="Opendata.card08"
                url="https://worldwide.espacenet.com/?locale=fr_EP"
              />
              <CardOneColumn
                language={props.language}
                schema="entities"
                title="Opendata.card09"
                url="https://worldwide.espacenet.com/?locale=fr_EP"
              />
              <CardOneColumn
                language={props.language}
                schema="entities"
                title="Opendata.card10"
                url="https://worldwide.espacenet.com/?locale=fr_EP"
              />
              <CardOneColumn
                language={props.language}
                schema="persons"
                title="Opendata.card11"
                url="https://worldwide.espacenet.com/?locale=fr_EP"
              />
            </div>
          </div>
        </section>

        <Footer language={props.language} />
      </div>
    </IntlProvider>
  );
};

export default Opendata;

Opendata.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
