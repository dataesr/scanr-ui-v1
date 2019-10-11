import React from 'react';
import PropTypes from 'prop-types';


import getSelectKey from '../../../../../Utils/getSelectKey';

import SubmitBox from '../../../../Shared/SubmitBox/SubmitBox';

import classes from './Oa.scss';

/**
 * OaLink component
 * Url : .
 * Description : Carte avec logo open access et couleur associé au type d'open access
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

// eslint-disable-next-line
const OaLink = (props) => {
  return (
    <div className={classes.OaLink}>
      {(props.modifyMode) ? <SubmitBox language={props.language} masterKey={props.masterKey} label={getSelectKey(props.allData, 'label', props.language, 'fr')} /> : null}
      Lien OA avec test si PDF
    </div>
  );
};

export default OaLink;

OaLink.propTypes = {
  language: PropTypes.string.isRequired,
  masterKey: PropTypes.string, // Utilisée pour le mode modifier/enrichir
  modifyMode: PropTypes.bool,
  allData: PropTypes.object.isRequired,
};
