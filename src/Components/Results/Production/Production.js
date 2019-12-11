import React from 'react';
import PropTypes from 'prop-types';
import useGetData from '../../../Hooks/useGetData';
import useScrollY from '../../../Hooks/UseScrollY';
import Loader from '../../Shared/LoadingSpinners/RouterSpinner';
import Errors from '../../Shared/Errors/Errors';
import { API_PUBLICATIONS_END_POINT } from '../../../config/config';

import ScanRMeta from '../../Shared/MetaTags/ScanRMeta';
import getSelectKey from '../../../Utils/getSelectKey';
import HeaderTitle from '../Shared/HeaderTitle/HeaderTitle';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';

import Publication from './Publication/Publication';
import Patent from './Patent/Patent';
import Thesis from './Thesis/Thesis';

import styles from '../../../style.scss';
/**
 * Production
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Production = (props) => {
  const renderContent = (prop) => {
    const properties = {
      language: prop.language,
      data: prop.data,
      id: prop.match.params.id,
    };
    switch (prop.data.productionType) {
      case 'patent': return <Patent {...properties} />;
      case 'thesis': return <Thesis {...properties} />;
      case 'publication': return <Publication {...properties} />;
      // For now, default is patent. Raise errors after data are fixed ?
      default: return <Patent {...properties} />;
    }
  };

  const scrollY = useScrollY();
  const { data, isLoading, isError } = useGetData(API_PUBLICATIONS_END_POINT, props.match.params.id);

  if (isLoading) {
    return <Loader color={styles.productionsColor} />;
  }
  if (isError) {
    return <Errors />;
  }
  return (
    <React.Fragment>
      <ScanRMeta
        title={getSelectKey(data, 'title', props.language, 'fr')}
        href2="./recherche/publications?query="
        href2Title={data.productionType || 'patent'}
        href3={`./publication/${props.match.params.id}`}
      />
      <Header />
      <HeaderTitle
        language={props.language}
        label={getSelectKey(data, 'title', props.language, 'fr')}
        idPage={data.productionType || 'patent'}
        id={props.match.params.id}
        isFull={scrollY === 0}
      />
      {renderContent({ ...props, data })}
      <Footer />
    </React.Fragment>
  );
};

export default Production;

Production.propTypes = {
  language: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
};
