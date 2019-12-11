import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import { API_PERSONS_END_POINT } from '../../../config/config';
import useGetData from '../../../Hooks/useGetData';
import useScrollY from '../../../Hooks/UseScrollY';

import SectionTitle from '../Shared/SectionTitle';
import ScanRMeta from '../../Shared/MetaTags/ScanRMeta';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import HeaderTitle from '../Shared/HeaderTitle/HeaderTitle';
import CoAuthors from './Sections/CoAuthors/CoAuthors';
import Informations from './Sections/Informations/Informations';
import Similars from './Sections/Similars/Similars';
import Thesis from './Sections/Thesis/Thesis';
import Productions from '../Shared/Productions/Productions';
import Banner from '../../Shared/Banner/Banner';
import Loader from '../../Shared/LoadingSpinners/RouterSpinner';
import Errors from '../../Shared/Errors/Errors';

import styles from '../../../style.scss';
import OrangeBackground from '../../../images/img/poudre-orange_Fgris-BR.jpg';
import FuschiaBackground from '../../../images/img/poudre-fuschia_Fgris-B.jpg';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';
/**
 * Person
 * Url : /person/:id
 * Description : A page that presents a person in scanR.
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Person = (props) => {
  const scrollY = useScrollY();
  const { data, isLoading, isError } = useGetData(API_PERSONS_END_POINT, props.match.params.id);
  if (isLoading) return <Loader color={styles.productionsColor} />;
  if (isError) return <Errors />;
  const messages = { fr: messagesFr, en: messagesEn };
  const BG = {
    padding: '1em 0px',
    backgroundSize: '40%',
    backgroundRepeat: 'no-repeat',
    backgroundColor: styles.scanrlightgreyColor,
    backgroundPosition: 'bottom 0 right 0',
  };
  const ThesisBG = {
    ...BG,
    backgroundImage: `url(${FuschiaBackground})`,
    backgroundPosition: 'bottom 0 left 0',
  };
  const InformationBG = { ...BG, backgroundImage: `url(${OrangeBackground})` };
  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <React.Fragment>
        <ScanRMeta
          title={(data.fullName) ? data.fullName : ''}
          href2="./recherche/persons?query="
          href2Title="Persons"
          href3={`./person/${props.match.params.id}`}
        />
        <Header />
        <HeaderTitle
          language={props.language}
          label={(data.fullName) ? data.fullName : ''}
          idPage="persons"
          id={props.match.params.id}
          isFull={scrollY === 0}
        />
        <section id="Informations" style={InformationBG}>
          <div className="container">
            <SectionTitle
              icon="fa-id-card"
              objectType="persons"
              language={props.language}
              id={props.match.params.id}
              title={<FormattedHTMLMessage id="Person.informations" />}
            />

            <Informations
              language={props.language}
              data={data}
            />
          </div>
        </section>
        <Banner
          language={props.language}
          labelKey="Appear"
          cssClass="BannerDark"
          url=""
        />
        <section id="Thesis" style={ThesisBG}>
          <div className="container">
            <SectionTitle
              icon="fa-id-card"
              objectType="persons"
              lexicon="PersonThesis"
              language={props.language}
              id={props.match.params.id}
              title={<FormattedHTMLMessage id="Person.thesis" />}
            />
            <Thesis language={props.language} id={props.match.params.id} />
          </div>
        </section>
        <div id="Production">
          <Productions
            language={props.language}
            match={props.match}
            childs={[]}
            person
          />
        </div>
        <section id="CoAuthors" style={InformationBG}>
          <div className="container">
            <SectionTitle
              icon="fa-folder-open"
              objectType="persons"
              language={props.language}
              lexicon="PersonCollab"
              id={props.match.params.id}
              title={<FormattedHTMLMessage id="Person.coAuthors.title" />}
            />
            <CoAuthors
              language={props.language}
              data={data.coContributors}
              id={props.match.params.id}
            />
          </div>
        </section>
        <Banner
          language={props.language}
          labelKey="Appear"
          cssClass="BannerLight"
          url=""
        />
        <section style={InformationBG}>
          <div className="container">
            <SectionTitle
              icon="fa-th"
              language={props.language}
              lexicon="PersonSimilar"
              id={props.match.params.id}
              title={<FormattedHTMLMessage id="Person.similars" />}
            />
            <Similars
              language={props.language}
              coContributors={data.coContributors}
              id={props.match.params.id}
            />
          </div>
        </section>
        <Footer />
      </React.Fragment>
    </IntlProvider>
  );
};

export default Person;

Person.propTypes = {
  language: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
};
