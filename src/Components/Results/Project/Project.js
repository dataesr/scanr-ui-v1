import React from 'react';
import PropTypes from 'prop-types';

import { API_PROJECTS_END_POINT } from '../../../config/config';

import getSelectKey from '../../../Utils/getSelectKey';
import useGetData from '../../../Hooks/useGetData';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import HeaderTitle from '../../Shared/Results/HeaderTitle/HeaderTitle';
import Description from './Sections/Description/Description';
import Participants from './Sections/Participants/Participants';
import Productions from './Sections/Productions/Productions';
import Informations from './Sections/Informations/Informations';
import Financial from './Sections/Financial/Financial';
import Programs from './Sections/Programs/Programs';
import Similars from './Sections/Similars/Similars';
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


const Project = (props) => {
  const { data, isLoading, isError } = useGetData(API_PROJECTS_END_POINT, props.match.params.id);

  if (isLoading) {
    return <Loader color={styles.productionsColor} />;
  }
  if (isError) {
    return <Errors />;
  }
  return (
    <React.Fragment>
      <Header
        language={props.language}
        switchLanguage={props.switchLanguage}
      />
      <HeaderTitle
        language={props.language}
        label={getSelectKey(data, 'label', props.language, 'default')}
        idPage="Project"
        id={data.id}
      />
      <div id="Informations">
        <Informations
          language={props.language}
          data={data}
          id={props.match.params.id}
        />
      </div>
      <div id="Financial">
        <Financial
          language={props.language}
          data={data}
          id={props.match.params.id}
        />
      </div>
      <div id="Programs">
        <Programs
          language={props.language}
          data={data}
          id={props.match.params.id}
        />
      </div>
      <div id="Description">
        <Description
          language={props.language}
          data={data.description}
          id={props.match.params.id}
        />
      </div>
      <div id="Participants">
        <Participants
          language={props.language}
          data={data.participants}
          id={props.match.params.id}
        />
      </div>
      <div id="Productions">
        <Productions
          language={props.language}
          data={data.publications}
          id={props.match.params.id}
        />
      </div>
      <div id="Similars">
        <Similars
          language={props.language}
          data={data}
        />
      </div>
      <Footer language={props.language} />
    </React.Fragment>
  );
};

export default Project;

Project.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};
