import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import useGetData from '../../../Hooks/useGetData';
import useScrollY from '../../../Hooks/useScrollY';
import { API_PUBLICATIONS_END_POINT } from '../../../config/config';
import Errors from '../../Shared/Errors/Errors';
import Loader from '../../Shared/LoadingSpinners/RouterSpinner';

import getSelectKey from '../../../Utils/getSelectKey';
import ScanRMeta from '../../Shared/MetaTags/ScanRMeta';
import HeaderTitle from '../Shared/HeaderTitle/HeaderTitle';

import { GlobalContext } from '../../../GlobalContext';
import Patent from './Patent/Patent';
import Publication from './Publication/Publication';
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
function renderProductionTypePage(language, data, id) {
  if (data.productionType === 'patent') {
    return <Patent language={language} data={data} id={id} />;
  }
  if (data.id.indexOf('nnt') !== -1) {
    return <Thesis language={language} data={data} id={id} />;
  }
  return <Publication language={language} data={data} id={id} />;
}

export default function Production({ match }) {
  const { language } = useContext(GlobalContext);
  const { id } = match.params;
  const scrollY = useScrollY();
  const { data, isLoading, isError } = useGetData(API_PUBLICATIONS_END_POINT, id);
  if (isLoading) return <Loader color={styles.productionColor} />;
  if (isError) return <Errors error={500} />;
  return (
    <React.Fragment>
      <ScanRMeta
        title={getSelectKey(data, 'title', language, 'fr')}
        href2="./recherche/publications?query="
        href2Title={data.productionType}
        href3={`./publication/${id}`}
      />
      <HeaderTitle
        language={language}
        label={getSelectKey(data, 'title', language, 'fr')}
        idPage={data.productionType}
        id={id}
        isFull={scrollY === 0}
      />
      {renderProductionTypePage(language, data, id)}
    </React.Fragment>
  );
}

Production.propTypes = {
  match: PropTypes.object.isRequired,
};
