import React from 'react';
import PropTypes from 'prop-types';

// Descriptions
import NameDescription from '../../../../../config/descriptions/structure/names';

// Composants UI
import Aux from '../../../../../hoc/Aux';
import GridFields from '../../../../Fields/GridFields/GridFields';
import TagField from '../../../../Fields/TagField/TagField';

import classes from './Main.scss';

const Main = props => (
  <Aux>
    <GridFields
      data={props.names}
      description={NameDescription}
      getStructure={props.getStructure}
      infoMessage="Aucun libellé actif"
      label="libellé"
      schemaName="names"
      structureId={props.structureId}
      title="Liste des libellés"
    />

    <TagField
      data={props.alias}
      infoMessage="Ajouter un alias"
      getStructure={props.getStructure}
      schemaName="alias"
      structureId={props.structureId}
      title="Liste des Alias"
    />

    <TagField
      data={props.codeNumbers}
      infoMessage="Ajouter un code"
      getStructure={props.getStructure}
      schemaName="code_numbers"
      structureId={props.structureId}
      title="Liste des Codes"
    />

    <div className={classes.TextTitleInline}>
      Mots clés
    </div>
    <div className="columns">
      <div className="column">
        <TagField
          data={props.keywordsFr}
          infoMessage="Ajouter un mot clé"
          getStructure={props.getStructure}
          schemaName="keywords_fr"
          structureId={props.structureId}
          title="Français"
        />
      </div>
      <div className="column">
        <TagField
          data={props.keywordsEn}
          infoMessage="Ajouter un mot clé"
          getStructure={props.getStructure}
          schemaName="keywords_en"
          structureId={props.structureId}
          title="Anglais"
        />
      </div>
    </div>
  </Aux>
);

export default Main;

Main.propTypes = {
  names: PropTypes.array.isRequired,
  alias: PropTypes.array.isRequired,
  codeNumbers: PropTypes.array.isRequired,
  keywordsEn: PropTypes.array.isRequired,
  keywordsFr: PropTypes.array.isRequired,
  structureId: PropTypes.string.isRequired,
  getStructure: PropTypes.func.isRequired,
};
