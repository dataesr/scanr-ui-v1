import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import Header from '../../Shared/Header/Header-homePage';
import Footer from '../../Shared/Footer/Footer';
import ButtonToPage from '../../Shared/Ui/Buttons/ButtonToPage';
import LogoCard from '../../Shared/Ui/LogoCard/LogoCard';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './Legal-notice.scss';

import Background from './poudre-bleu_Fgris-B.jpg';

const sectionStyle = {
  backgroundImage: `url(${Background})`,
  backgroundPosition: 'bottom 0 left 0',
  backgroundColor: 'rgb(233, 236, 241)',
};

const LegalNoticePage = (props) => {
  const frActive = (props.language === 'fr') ? classes.ActiveLink : '';
  const enActive = (props.language === 'en') ? classes.ActiveLink : '';

  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <div className={`container-fluid ${classes.LegalNoticePage}`}>
        <Header
          language={props.language}
          switchLanguage={props.switchLanguage}
        />

        <section style={sectionStyle} className={classes.LegalSectionPoudre}>
          <div className="container">
            <div className={`row ${classes.row}`}>
              <div className={`col-lg-8 ${classes.col}`}>
                <div className={classes.title}>
                  <FormattedHTMLMessage
                    id="Section.title.service"
                    defaultMessage="Section.title.service"
                  />
                </div>
              </div>
              <div className={`col-lg-4 ${classes.col}`}>
                <LogoCard
                  schema="scanr-blue"
                />
                <LogoCard
                  schema="ministere"
                />
              </div>
            </div>
          </div>
        </section>

        <section className={classes.LegalSection}>
          <div className="container">
            <div className={`row ${classes.row}`}>
              <div className={`col-lg-4 ${classes.col}`}>
                <div className={classes.title}>
                  <FormattedHTMLMessage
                    id="Section.title.actor1"
                    defaultMessage="Section.title.actor1"
                  />
                </div>
              </div>
              <div className={`col-lg-4 ${classes.col}`}>
                <div className={classes.title}>
                  <FormattedHTMLMessage
                    id="Section.title.actor2"
                    defaultMessage="Section.title.actor2"
                  />
                </div>
              </div>
              <div className={`col-lg-4 ${classes.col}`}>
                <div className={classes.title}>
                  <FormattedHTMLMessage
                    id="Section.title.actor3"
                    defaultMessage="Section.title.actor3"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={classes.LegalSectionGris}>
          <div className={`row ${classes.row}`}>
            <div className={`col-lg-8 ${classes.col}`}>
              <div className={classes.title}>
                <FormattedHTMLMessage
                  id="Section.title.team"
                  defaultMessage="Section.title.team"
                />
              </div>
            </div>
          </div>
        </section>

        <section className={classes.LegalSection}>
          <div className={`row ${classes.row}`}>
            <div className={`col-lg-8 ${classes.col}`}>
              <div className={classes.title}>
                <FormattedHTMLMessage
                  id="Section.title.data1"
                  defaultMessage="Section.title.data1"
                />
              </div>
            </div>
            <div className={`col-lg-4 ${classes.col}`}>
              <div className={classes.title}>
                <FormattedHTMLMessage
                  id="Section.title.data2"
                  defaultMessage="Section.title.data2"
                />
              </div>
            </div>
          </div>
        </section>

        <section className={classes.LegalSectionGris}>
          <div className={`row ${classes.row}`}>
            <div className={`col-lg-8 ${classes.col}`}>
              <div className={classes.title}>
                <FormattedHTMLMessage
                  id="Section.title.personal"
                  defaultMessage="Section.title.personal"
                />
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className={`row ${classes.row}`}>
            <div className={`col-lg-8 ${classes.col}`}>
              <div className={classes.title}>
                <FormattedHTMLMessage
                  id="Section.title.credit"
                  defaultMessage="Section.title.credit"
                />
              </div>
              <div className="sectionContent">
                <div className="content">
                  <FormattedHTMLMessage
                    id="credit.image"
                    defaultMessage="credit.image"
                  />
                </div>
                <div className="content">
                  <FormattedHTMLMessage
                    id="credit.infographic"
                    defaultMessage="credit.infographic"
                  />
                </div>
                <div className="content">
                  <FormattedHTMLMessage
                    id="credit.video"
                    defaultMessage="credit.video"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <ButtonToPage
          className={classes.MarginTop}
          url=""
        >
          Découvrir
        </ButtonToPage>
        <Footer language={props.language} />

      </div>
    </IntlProvider>
  );
};

export default LegalNoticePage;

LegalNoticePage.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
