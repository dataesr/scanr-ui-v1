import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import PanelsDescription from '../../../../../config/descriptions/structure/panels';
import TagField from '../../../../Fields/TagField/TagField';
import GridFields from '../../../../Fields/GridFields/GridFields';

const themes = props => (
  <Fragment>
    <div className="columns is-marginless">
      <div className="column">
        <TagField
          data={props.keywordsFr}
          infoMessage="Ajouter un mot clé"
          getStructure={props.getStructure}
          schemaName="keywords_fr"
          structureId={props.id}
          title="Mots clés français"
        />
      </div>
      <div className="column">
        <TagField
          data={props.keywordsEn}
          infoMessage="Ajouter un mot clé"
          getStructure={props.getStructure}
          schemaName="keywords_en"
          structureId={props.id}
          title="Mots clés anglais"
        />
      </div>
    </div>
    <div className="columns is-marginless">
      <div className="column is-full">
        <GridFields
          data={props.panels}
          description={PanelsDescription}
          refreshFunction={props.getStructure}
          infoMessage="Aucun panel actif"
          label="panel"
          schemaName="panels"
          url={props.url}
          title="Panels"
        />
      </div>
    </div>
  </Fragment>);

export default themes;

themes.propTypes = {
  getStructure: PropTypes.func,
  id: PropTypes.string,
  keywordsEn: PropTypes.array,
  keywordsFr: PropTypes.array,
  panels: PropTypes.array,
  url: PropTypes.string,
};
