import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import LexiconModal from '../Lexicon/LexiconModal/LexiconModal';
import ButtonToSearch from '../Ui/Buttons/ButtonToSearch';

/* SCSS */
import classes from './MostActiveThemes.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const MostActiveThemes = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <section className={classes.MostActiveThemes}>
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className={classes.Lib}>
              <FormattedHTMLMessage
                id="MostActiveThemes.lib"
                defaultMessage="MostActiveThemes.lib"
              />
              &nbsp;
              <LexiconModal language={props.language} target="top10">
                <i className="fa fa-info-circle" />
              </LexiconModal>
            </div>
            <div className={classes.Lib2}>
              <FormattedHTMLMessage
                id="MostActiveThemes.lib2"
                defaultMessage="MostActiveThemes.lib2"
              />
            </div>
          </div>
          <div className="col-lg-7">
            <ul>
              {
                props.data.map(item => (
                  <li>
                    <ButtonToSearch key={item} href={`/recherche/all?query=${item}`} className={classes.Tags}>
                      {item}
                    </ButtonToSearch>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  </IntlProvider>
);

export default MostActiveThemes;

MostActiveThemes.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};
