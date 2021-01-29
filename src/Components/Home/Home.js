import React, { useContext } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../../GlobalContext';
import ScanRMeta from '../Shared/MetaTags/ScanRMeta';
import ScanrToday from './ScanrToday/ScanrToday';
import ScanrIs from './ScanrIs/ScanrIs';
import Search from './Search/Search';
import Banner from '../Shared/Banner/Banner';
import WelcomeModal from './WelcomeModal';

import logo from '../Shared/images/MESRI_2020.png';

import classes from './Home.scss';

import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const msg = {
  fr: messagesFr,
  en: messagesEn,
};

const HomePage = () => {
  const context = useContext(GlobalContext);
  const history = useHistory();
  return (
    <IntlProvider locale={context.language} messages={msg[context.language]}>
      <div className={`container-fluid ${classes.HomePage}`}>
        <FormattedHTMLMessage id="Home.title">
          {logoLabel => (<ScanRMeta title={logoLabel} />)}
        </FormattedHTMLMessage>
        <WelcomeModal />
        <div className={`col-md ${classes.LogoHome}`}>
          <img src={logo} alt="Logo MESRI" className={classes.Logo} />
        </div>
        <Search history={history} language={context.language} />
        <ScanrToday />
        <ScanrIs
          language={context.language}
        />
        <Banner
          language={context.language}
          labelKey="DiscoverDataesr"
          cssClass="BannerDark"
          url="https://data.esr.gouv.fr/"
          target="_blank"
        />
      </div>
    </IntlProvider>
  );
};
export default HomePage;
