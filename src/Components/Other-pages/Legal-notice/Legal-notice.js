import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import ButtonToPage from '../../Shared/Ui/Buttons/ButtonToPage';
import ComponentToPage from '../../Shared/ComponentToPage/ComponentToPage';
import DiscoverThreeCards from '../../Shared/DiscoverThreeCards/DiscoverThreeCards';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header-homePage';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';
import LogoCard from '../../Shared/Ui/LogoCard/LogoCard';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './Legal-notice.scss';

import Background from './poudre-bleu_Fgris-B.jpg';

const sectionStyle = {
  backgroundImage: `url(${Background})`,
};

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const LegalNoticePage = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <div className={`container-fluid ${classes.LegalNoticePage}`}>
      <Header
        language={props.language}
        switchLanguage={props.switchLanguage}
      />
      <HeaderTitle
        language={props.language}
        label="legal"
      />
      <section style={sectionStyle} className={classes.LegalSectionPoudre}>
        <div className="container">
          <div className={`row ${classes.row}`}>
            <div className="col-lg-8">
              <div className={classes.title}>
                <FormattedHTMLMessage
                  id="Section.title.service"
                  defaultMessage="Section.title.service"
                />
              </div>
              <div className={classes.bold}>
                <FormattedHTMLMessage
                  id="Section.text.service.bold"
                  defaultMessage="Section.title.service"
                />
              </div>
              <div className={classes.light}>
                <FormattedHTMLMessage
                  id="Section.text.service.light"
                  defaultMessage="Section.title.service"
                />
              </div>
              <div className={classes.address}>
                <FormattedHTMLMessage
                  id="Section.text.service.address"
                  defaultMessage="Section.title.service"
                />
              </div>
              <div className={`row ${classes.buttonsRow}`}>
                <div className="col-lg-4">
                  <ButtonToPage
                    className={classes.MarginTop}
                    url="#"
                  >
                    Voir le site
                  </ButtonToPage>
                </div>
                <div className="col-lg-4">
                  <ButtonToPage
                    className={classes.MarginTop}
                    url="#"
                  >
                    Contactez-nous
                  </ButtonToPage>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <LogoCard
                label="scanr-blue"
              />
              <LogoCard
                label="ministere"
              />
            </div>
          </div>
        </div>
      </section>

<<<<<<< HEAD
      <section className={classes.LegalSectionBlanc}>
        <div className="container">
          <div className={`row ${classes.row}`}>
            <div className="col-lg-4">
              <div className={classes.title}>
                <FormattedHTMLMessage
                  id="Section.title.actor1"
                  defaultMessage="Section.title.actor1"
                />
              </div>
              <div className={classes.light}>
                <FormattedHTMLMessage
                  id="Section.text.actor1.light"
                  defaultMessage="Section.text.actor1.light"
                />
              </div>
              <div className={classes.bold}>
                <FormattedHTMLMessage
                  id="Section.text.actor1.bold"
                  defaultMessage="Section.text.actor1.bold"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className={classes.title}>
                <FormattedHTMLMessage
                  id="Section.title.actor2"
                  defaultMessage="Section.title.actor2"
                />
=======
        <section style={sectionStyle} className={classes.LegalSectionPoudre}>
          <div className="container">
            <div className={`row ${classes.row}`}>
              <div className="col-lg-8">
                <div className={classes.title}>
                  <FormattedHTMLMessage
                    id="Section.title.service"
                    defaultMessage="Section.title.service"
                  />
                </div>
                <div className={classes.bold}>
                  <FormattedHTMLMessage
                    id="Section.text.service.bold"
                    defaultMessage="Section.title.service"
                  />
                </div>
                <div className={classes.light}>
                  <FormattedHTMLMessage
                    id="Section.text.service.light"
                    defaultMessage="Section.title.service"
                  />
                </div>
                <div className={classes.address}>
                  <FormattedHTMLMessage
                    id="Section.text.service.address"
                    defaultMessage="Section.title.service"
                  />
                </div>
                <div className={`row ${classes.buttonsRow}`}>
                  <div className="col-lg-4">
                    <ButtonToPage
                      className={classes.MarginTop}
                      url="#"
                    >
                      Voir le site
                    </ButtonToPage>
                  </div>
                  <div className="col-lg-4">
                    <ButtonToPage
                      className={classes.MarginTop}
                      url="#"
                    >
                      Contactez-nous
                    </ButtonToPage>
                  </div>
                </div>
<<<<<<< HEAD
>>>>>>> update legalNotice page and adding logo-cradar to public/img
=======
>>>>>>> f2026ecd7232e5c58302f3bad8f3a1dd3e791546
              </div>
              <div>
                <img
                  src="./img/logo-cradar.png"
                  alt="logo C-Radar"
                  className={`img-fluid ${classes.img}`}
                />
              </div>
              <div className={classes.light}>
                <FormattedHTMLMessage
                  id="Section.text.actor2.light"
                  defaultMessage="Section.text.actor2.light"
                />
              </div>
              <div className={classes.bold}>
                <FormattedHTMLMessage
                  id="Section.text.actor2.bold"
                  defaultMessage="Section.text.actor2.bold"
                />
              </div>
              <div className={classes.address}>
                <FormattedHTMLMessage
                  id="Section.text.actor2.address"
                  defaultMessage="Section.text.actor2.address"
                />
              </div>
              <ButtonToPage
                className={classes.MarginTop}
                url="#"
              >
                Voir le site
              </ButtonToPage>
            </div>
            <div className="col-lg-4">
              <div className={classes.title}>
                <FormattedHTMLMessage
                  id="Section.title.actor3"
                  defaultMessage="Section.title.actor3"
                />
              </div>
              <div className={classes.light}>
                <FormattedHTMLMessage
                  id="Section.text.actor3.light"
                  defaultMessage="Section.text.actor3.light"
                />
              </div>
              <div className={classes.bold}>
                <FormattedHTMLMessage
                  id="Section.text.actor3.bold"
                  defaultMessage="Section.text.actor3.bold"
                />
              </div>
              <div className={classes.address}>
                <FormattedHTMLMessage
                  id="Section.text.actor3.address"
                  defaultMessage="Section.text.actor3.address"
                />
              </div>
              <ButtonToPage
                className={classes.MarginTop}
                url="#"
              >
                Voir le site
              </ButtonToPage>
            </div>
          </div>
        </div>
      </section>

<<<<<<< HEAD
<<<<<<< HEAD
      <section className={classes.LegalSectionGris}>
        <div className="container">
          <div className={`row ${classes.row}`}>
            <div className="col-lg-8">
              <div className={classes.title}>
                <FormattedHTMLMessage
                  id="Section.title.team"
                  defaultMessage="Section.title.team"
                />
              </div>
              <div className={classes.paragraph}>
                <div className={classes.bold}>
=======
=======
>>>>>>> f2026ecd7232e5c58302f3bad8f3a1dd3e791546
        <section className={classes.LegalSectionBlanc}>
          <div className="container">
            <div className={`row ${classes.row}`}>
              <div className="col-lg-4">
                <div className={classes.title}>
>>>>>>> update legalNotice page and adding logo-cradar to public/img
                  <FormattedHTMLMessage
                    id="Section.text.team.bold1"
                    defaultMessage="Section.text.team.bold1"
                  />
                </div>
                <div className={classes.light}>
<<<<<<< HEAD
=======
                  <FormattedHTMLMessage
                    id="Section.text.actor1.light"
                    defaultMessage="Section.text.actor1.light"
                  />
                </div>
                <div className={classes.bold}>
                  <FormattedHTMLMessage
                    id="Section.text.actor1.bold"
                    defaultMessage="Section.text.actor1.bold"
                  />
                </div>
                <div className={classes.light}>
                  <FormattedHTMLMessage
                    id="Section.text.actor1.light"
                    defaultMessage="Section.text.actor1.light"
                  />
                </div>
                <div className={classes.bold}>
                  <FormattedHTMLMessage
                    id="Section.text.actor1.bold"
                    defaultMessage="Section.text.actor1.bold"
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className={classes.title}>
>>>>>>> update legalNotice page and adding logo-cradar to public/img
                  <FormattedHTMLMessage
                    id="Section.text.team.light1"
                    defaultMessage="Section.text.team.light1"
                  />
                </div>
                <div>
                  <img
                    src="./img/logo-cradar.png"
                    alt="logo C-Radar"
                    className={`img-fluid ${classes.img}`}
                  />
                </div>
                <div className={classes.light}>
                  <FormattedHTMLMessage
                    id="Section.text.actor2.light"
                    defaultMessage="Section.text.actor2.light"
                  />
                </div>
                <div className={classes.bold}>
                  <FormattedHTMLMessage
                    id="Section.text.actor2.bold"
                    defaultMessage="Section.text.actor2.bold"
                  />
                </div>
                <div className={classes.address}>
                  <FormattedHTMLMessage
                    id="Section.text.actor2.address"
                    defaultMessage="Section.text.actor2.address"
                  />
                </div>
<<<<<<< HEAD
=======
                <div>
                  <img
                    src="./img/logo-cradar.png"
                    alt="logo C-Radar"
                    className={`img-fluid ${classes.img}`}
                  />
                </div>
                <div className={classes.light}>
                  <FormattedHTMLMessage
                    id="Section.text.actor2.light"
                    defaultMessage="Section.text.actor2.light"
                  />
                </div>
                <div className={classes.bold}>
                  <FormattedHTMLMessage
                    id="Section.text.actor2.bold"
                    defaultMessage="Section.text.actor2.bold"
                  />
                </div>
                <div className={classes.address}>
                  <FormattedHTMLMessage
                    id="Section.text.actor2.address"
                    defaultMessage="Section.text.actor2.address"
                  />
                </div>
>>>>>>> f2026ecd7232e5c58302f3bad8f3a1dd3e791546
                <ButtonToPage
                  className={classes.MarginTop}
                  url="#"
                >
                  Voir le site
                </ButtonToPage>
              </div>
              <div className={classes.paragraph}>
                <div className={classes.bold}>
                  <FormattedHTMLMessage
                    id="Section.text.team.bold2"
                    defaultMessage="Section.text.team.bold2"
                  />
                </div>
                <div className={classes.light}>
<<<<<<< HEAD
=======
                  <FormattedHTMLMessage
                    id="Section.text.actor3.light"
                    defaultMessage="Section.text.actor3.light"
                  />
                </div>
                <div className={classes.bold}>
                  <FormattedHTMLMessage
                    id="Section.text.actor3.bold"
                    defaultMessage="Section.text.actor3.bold"
                  />
                </div>
                <div className={classes.address}>
                  <FormattedHTMLMessage
                    id="Section.text.actor3.address"
                    defaultMessage="Section.text.actor3.address"
                  />
                </div>
<<<<<<< HEAD
=======
                <div className={classes.light}>
                  <FormattedHTMLMessage
                    id="Section.text.actor3.light"
                    defaultMessage="Section.text.actor3.light"
                  />
                </div>
                <div className={classes.bold}>
                  <FormattedHTMLMessage
                    id="Section.text.actor3.bold"
                    defaultMessage="Section.text.actor3.bold"
                  />
                </div>
                <div className={classes.address}>
                  <FormattedHTMLMessage
                    id="Section.text.actor3.address"
                    defaultMessage="Section.text.actor3.address"
                  />
                </div>
>>>>>>> f2026ecd7232e5c58302f3bad8f3a1dd3e791546
                <ButtonToPage
                  className={classes.MarginTop}
                  url="#"
                >
                  Voir le site
                </ButtonToPage>
              </div>
            </div>
          </div>
        </section>

        <section className={classes.LegalSectionGris}>
          <div className="container">
            <div className={`row ${classes.row}`}>
              <div className="col-lg-8">
                <div className={classes.title}>
>>>>>>> update legalNotice page and adding logo-cradar to public/img
                  <FormattedHTMLMessage
                    id="Section.text.team.light2"
                    defaultMessage="Section.text.team.light2"
                  />
                </div>
                <div className={classes.paragraph}>
                  <div className={classes.bold}>
                    <FormattedHTMLMessage
                      id="Section.text.team.bold1"
                      defaultMessage="Section.text.team.bold1"
                    />
                  </div>
                  <div className={classes.light}>
                    <FormattedHTMLMessage
                      id="Section.text.team.light1"
                      defaultMessage="Section.text.team.light1"
                    />
                  </div>
                </div>
                <div className={classes.paragraph}>
                  <div className={classes.bold}>
                    <FormattedHTMLMessage
                      id="Section.text.team.bold2"
                      defaultMessage="Section.text.team.bold2"
                    />
                  </div>
                  <div className={classes.light}>
                    <FormattedHTMLMessage
                      id="Section.text.team.light2"
                      defaultMessage="Section.text.team.light2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

<<<<<<< HEAD
<<<<<<< HEAD
      <section className={classes.LegalSectionBlanc}>
        <div className="container">
          <div className={`row ${classes.row}`}>
            <div className="col-lg-8">
              <div className={classes.title}>
                <FormattedHTMLMessage
                  id="Section.title.data1"
                  defaultMessage="Section.title.data1"
                />
=======
=======
>>>>>>> f2026ecd7232e5c58302f3bad8f3a1dd3e791546
        <section className={classes.LegalSectionBlanc}>
          <div className="container">
            <div className={`row ${classes.row}`}>
              <div className="col-lg-8">
                <div className={classes.title}>
                  <FormattedHTMLMessage
                    id="Section.title.data1"
                    defaultMessage="Section.title.data1"
                  />
                </div>
                <div className={classes.subtitle}>
<<<<<<< HEAD
=======
                  <FormattedHTMLMessage
                    id="Section.subtitle.data1"
                    defaultMessage="Section.subtitle.data1"
                  />
                </div>
                <div className={classes.light}>
                  <FormattedHTMLMessage
                    id="Section.text.data1.light"
                    defaultMessage="Section.text.data1.light"
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className={classes.title}>
>>>>>>> f2026ecd7232e5c58302f3bad8f3a1dd3e791546
                  <FormattedHTMLMessage
                    id="Section.subtitle.data1"
                    defaultMessage="Section.subtitle.data1"
                  />
                </div>
                <div className={classes.light}>
                  <FormattedHTMLMessage
                    id="Section.text.data1.light"
                    defaultMessage="Section.text.data1.light"
                  />
                </div>
>>>>>>> update legalNotice page and adding logo-cradar to public/img
              </div>
              <div className={classes.subtitle}>
                <FormattedHTMLMessage
                  id="Section.subtitle.data1"
                  defaultMessage="Section.subtitle.data1"
                />
              </div>
              <div className={classes.light}>
                <FormattedHTMLMessage
                  id="Section.text.data1.light"
                  defaultMessage="Section.text.data1.light"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className={classes.title}>
                <FormattedHTMLMessage
                  id="Section.title.data2"
                  defaultMessage="Section.title.data2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={classes.LegalSectionGris}>
        <div className="container">
          <div className={`row ${classes.row}`}>
            <div className="col-lg-8">
              <div className={classes.title}>
                <FormattedHTMLMessage
                  id="Section.title.personal"
                  defaultMessage="Section.title.personal"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className={`row ${classes.row}`}>
            <div className="col-lg-8">
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
<<<<<<< HEAD
        </div>
      </section>

      <section style={sectionStyle} className={classes.LegalSectionPoudre}>
        <DiscoverThreeCards
          language={props.language}
          TitleCard1="Discover.TalkAboutScanr"
          UrlCard1=""
          TitleCard2="Discover.Sources"
          UrlCard2=""
          TitleCard3="Discover.Team"
          UrlCard3=""
        />
      </section>

      <ComponentToPage
        labelKey="HowToAppearInScanR"
        language={props.language}
        url=""
      />

      <Footer language={props.language} />

    </div>
  </IntlProvider>
);
=======
        </section>

        <Footer language={props.language} />

      </div>
    </IntlProvider>
  );
};
>>>>>>> update legalNotice page and adding logo-cradar to public/img

export default LegalNoticePage;

LegalNoticePage.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
