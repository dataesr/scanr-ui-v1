import React from 'react';
import PropTypes from 'prop-types';

// Composants
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
    return <div>ERROR...</div>;
  }
  if (isLoading) {
    return <Loader />;
  }
  if (!data.data) {
    return <div>NO DATA</div>;
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
              data.data.map(oneFocus => (
                <div className={`col-lg-4 ${classes.CardContainer}`} key={oneFocus.title.fr}>
                  {/* eslint-disable */}
                  {/* disableReason: Does not accept _id */}
                  <FocusCard
                    schema={oneFocus.api}
                    tags={oneFocus.tags[props.language]}
                    title={oneFocus.title[props.language]}
                    type="bubble"
                    url={`/focus/${oneFocus._id}`}
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
  switchLanguage: PropTypes.func.isRequired,
};
