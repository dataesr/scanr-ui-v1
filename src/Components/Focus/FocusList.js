import React from 'react';
import PropTypes from 'prop-types';

// Composants
import Errors from '../Shared/Errors/Errors';
import Loader from '../Shared/LoadingSpinners/RouterSpinner';
import Banner from '../Shared/Banner/Banner';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import HeaderTitle from '../Shared/HeaderTitle/HeaderTitle';
import FocusCard from '../Shared/Ui/FocusCard/FocusCard';
import useGetData from '../../Hooks/useGetData';

// import Lexicon from '../Shared/Lexicon/Lexicon';
// import Search from '../Home-page/Search/Search';
import classes from './Focus.scss';

/**
 * FocusList
 * Url : /focus <br/>
 * Description : Page principale des focus (aperçu des différents graphs et résultats) <br/>
 * Responsive : . <br/>
 * Accessible : . <br/>
 * Tests
 */

const FocusList = (props) => {
  const { data, isLoading, isError } = useGetData('http://66.70.222.205/api/focus');
  if (isError) {
    return <Errors />;
  }
  if (isLoading) {
    return <Loader />;
  }
  if (!data.data) {
    return <Errors />;
  }
  let focusList = [];
  const useApi = false;
  if (!useApi) {
    focusList = props.focusList;
  } else {
    focusList = data.data;
  }
  return (
    <React.Fragment>
      <Header
        language={props.language}
        switchLanguage={props.switchLanguage}
      />
      <HeaderTitle
        language={props.language}
        labelkey="focus"
        url1="/"
        url2="/focus"
      />
      <section className={classes.FocusSection}>
        <div className="container">
          <div className="row py-3">
            {
              focusList.map(oneFocus => (
                <div className={`col-lg-4 ${classes.CardContainer}`} key={oneFocus.title.fr}>
                  {/* eslint-disable */}
                  {/* disableReason: Does not accept _id */}
                  <FocusCard
                    schema={oneFocus.api}
                    tags={oneFocus.tags[props.language]}
                    title={oneFocus.title[props.language]}
                    type={(oneFocus.type) ? (oneFocus.type) : 'bubble'}
                    url={(useApi) ? (`/focus/${oneFocus._id}`) : (oneFocus.url)}
                  />
                {/* eslint-enable */}
                </div>
              ))
            }
          </div>
        </div>
      </section>
      <Banner
        language={props.language}
        labelKey="DiscoverDataesr"
        cssClass="BannerDark"
        url="https://data.esr.gouv.fr/"
        target="_blank"
      />
      <Footer />
    </React.Fragment>
  );
};

export default FocusList;

FocusList.propTypes = {
  language: PropTypes.string.isRequired,
  focusList: PropTypes.array,
  switchLanguage: PropTypes.func.isRequired,
};
FocusList.defaultProps = {
  focusList: [
    {
      tags: {
        fr: ['#satt', '#transfert', '#technologies'],
        en: ['#satt', '#transfert', '#technologies'],
      },
      title: {
        fr: 'Sociétés d’Accélération du Transfert de Technologies (SATT)',
        en: 'French technology transfer offices (SATT, Sociétés d’Accélération du Transfert de Technologies)',
      },
      type: 'map',
      url: '/focus/carte-satt-2019',
      api: 'structures',
    },
    {
      tags: {
        fr: ['Thèses', '#EcolesDoctorales'],
        en: ['PhD', '#DoctoralSchools'],
      },
      title: {
        fr: 'Les thèses soutenues en 2018. Sur quels thèmes ?',
        en: '2018 thesis in france. Which thematics?',
      },
      type: 'bubble',
      url: '/focus/themes-theses-2018',
      api: 'publications',
    },
    {
      tags: {
        fr: ['#InstitutUniversitaireDeFrance', '#IUF'],
        en: ['#InstitutUniversitaireDeFrance', '#IUF'],
      },
      title: {
        fr: "Les nominations 2019 à l'Institut Universitaire de France",
        en: 'Persons distinguished by the Institut Universitaire de France in 2019',
      },
      type: 'treemap',
      url: '/focus/iuf',
      api: 'persons',
    },
    {
      tags: {
        fr: ['#youtube', '#vulgarisation'],
        en: ['#youtube', '#popularization'],
      },
      title: {
        fr: 'Chaînes scientifiques sur Youtube dans scanR',
        en: 'Scientific Youtube channels in scanR',
      },
      type: 'youtube',
      url: '/focus/youtube',
      api: 'persons',
    },
    {
      tags: {
        fr: ['#SoftwareHeritage', '#CodeSource'],
        en: ['#SoftwareHeritage', '#SourceCode'],
      },
      title: {
        fr: 'Productions avec un lien Software Heritage dans scanR',
        en: 'Productions with a link to Software Heritage in scanR',
      },
      type: 'bubbleTop',
      url: '/focus/software_heritage',
      api: 'publications',
    },
  ],
};
