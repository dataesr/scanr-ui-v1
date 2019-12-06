import React from 'react';
import PropTypes from 'prop-types';

import { API_PERSONS_END_POINT } from '../../../config/config';

import useGetData from '../../../Hooks/useGetData';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import HeaderTitle from '../../Shared/Results/HeaderTitle/HeaderTitle';
import CoAuthors from './Sections/CoAuthors/CoAuthors';
import Informations from './Sections/Informations/Informations';
import Similars from './Sections/Similars/Similars';
import Thesis from './Sections/Thesis/Thesis';
import Productions from '../Shared/Productions/Productions';
import Banner from '../../Shared/Banner/Banner';
import Loader from '../../Shared/LoadingSpinners/RouterSpinner';
import Errors from '../../Shared/Errors/Errors';

import styles from '../../../style.scss';

/**
 * Publication
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Person = (props) => {
  const { data, isLoading, isError } = useGetData(API_PERSONS_END_POINT, props.match.params.id);

  if (isLoading) {
    return <Loader color={styles.productionsColor} />;
  }
  if (isError) {
    return <Errors />;
  }
  return (
    <React.Fragment>
      <Header />
      <HeaderTitle
        language={props.language}
        label={(data.fullName) ? data.fullName : ''}
        idPage="Person"
        id={props.match.params.id}
      />
      <div id="Informations">
        <Informations
          language={props.language}
          data={data}
          id={props.match.params.id}
        />
      </div>

      <Banner
        language={props.language}
        labelKey="Appear"
        cssClass="BannerDark"
        url=""
      />

      <div id="Thesis">
        <Thesis
          language={props.language}
          person={props.match.params.id}
          personName={data.fullName}
          id={props.match.params.id}
        />
      </div>
      <div id="Production">
        <Productions
          language={props.language}
          match={props.match}
          childs={[]}
          person
        />
      </div>
      <div id="CoAuthors">
        <CoAuthors
          language={props.language}
          data={data.coContributors}
          id={props.match.params.id}
        />
      </div>
      <Banner
        language={props.language}
        labelKey="Appear"
        cssClass="BannerLight"
        url=""
      />

      <div>
        <Similars
          language={props.language}
          data={data}
        />
      </div>

      <Footer language={props.language} />
    </React.Fragment>
  );
};

export default Person;

Person.propTypes = {
  language: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
};
