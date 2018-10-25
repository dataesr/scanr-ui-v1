import React from 'react';
import PropTypes from 'prop-types';

import TagField from '../../../../Fields/TagField/TagField';

const Themes = props => (
  <div className="columns is-marginless">
    <div className="column">
      <TagField
        data={props.keywordsFr}
        infoMessage="Ajouter un mot clé"
        getStructure={props.getStructure}
        schemaName="keywords_fr"
        structureId={props.structureId}
        title="Mots clés français"
      />
    </div>
    <div className="column">
      <TagField
        data={props.keywordsEn}
        infoMessage="Ajouter un mot clé"
        getStructure={props.getStructure}
        schemaName="keywords_en"
        structureId={props.structureId}
        title="Mots clés anglais"
      />
    </div>
  </div>
);

export default Themes;

Themes.propTypes = {
  keywordsEn: PropTypes.array.isRequired,
  keywordsFr: PropTypes.array.isRequired,
  structureId: PropTypes.string.isRequired,
  getStructure: PropTypes.func.isRequired,
};
