import React, { Fragment, useContext, useState } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import Modal from 'react-bootstrap/Modal';
import { GlobalContext } from '../../GlobalContext';
import useScrollY from '../../Hooks/useScrollY';

import ScanRMeta from '../Shared/MetaTags/ScanRMeta';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import LastFocus from '../Shared/LastFocus/LastFocus';
import MostActiveThemes from './MostActiveThemes/MostActiveThemes';
import { currentThemes } from '../../config/CurrentThemesAndSuggestions';
// import Newsletter from '../Shared/Newsletter/Newsletter';
import ScanrToday from './ScanrToday/ScanrToday';
import Search from './Search/Search';
import Banner from '../Shared/Banner/Banner';

import classes from './Home.scss';

import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const msg = {
  fr: messagesFr,
  en: messagesEn,
};

const HomePage = (props) => {
  const [isActive, setActive] = useState(true);
  const context = useContext(GlobalContext);
  const scrollY = useScrollY();
  let displayWelcomeModal = true;
  const visited = localStorage.alreadyVisitedScanR;
  if (visited) {
    displayWelcomeModal = false;
  } else {
    localStorage.alreadyVisitedScanR = true;
  }
  return (
    <IntlProvider locale={context.language} messages={msg[context.language]}>
      <Fragment>
        <Modal
          show={displayWelcomeModal && isActive}
          onHide={() => setActive(!isActive)}
          size="lg"
        >
          <Modal.Header closeButton className={classes.Header}>
            <p className={classes.Title}>
              <i className="fas fa-bookmark" />
              <FormattedHTMLMessage id="Welcome.Title" />
            </p>
          </Modal.Header>
          <Modal.Body>
            <div className={`d-flex flex-column align-items-center p-4 ${classes.Modal}`}>
              <i className="fas fa-lg-edit" />
              <FormattedHTMLMessage id="Welcome.Text" />
            </div>
          </Modal.Body>
        </Modal>
        <div className={`container-fluid ${classes.HomePage}`}>
          <FormattedHTMLMessage id="Home.title">
            {logoLabel => (<ScanRMeta title={logoLabel} />)}
          </FormattedHTMLMessage>
          <Header />
          <Search
            {...props}
            language={context.language}
            isFull={scrollY === 0}
          />
          <ScanrToday
            language={context.language}
            isFull={scrollY === 0}
          />
          <Banner
            language={context.language}
            labelKey="WhatAreOurSources"
            cssClass="BannerLight"
            url="/ressources"
          />

          <MostActiveThemes
            language={context.language}
            data={currentThemes}
          />
          <LastFocus language={context.language} />
          {/* Not for Now */}
          {/* <Newsletter language={this.context.language} /> */}
          <Banner
            language={context.language}
            labelKey="DiscoverDataesr"
            cssClass="BannerDark"
            url="https://data.esr.gouv.fr/"
            target="_blank"
          />
          <Footer />
        </div>
      </Fragment>
    </IntlProvider>
  );
};
export default HomePage;
