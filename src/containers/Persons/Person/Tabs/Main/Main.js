import React from 'react';
import PropTypes from 'prop-types';

// Descriptions
import AliasDescription from '../../../../../config/descriptions/person/alias';
import IdExternalDescription from '../../../../../config/descriptions/person/idExternalDescription';
import LinksDescription from '../../../../../config/descriptions/person/linksDescription';
import PersonDescriptions from '../../../../../config/descriptions/person/personDescriptions';

// Composants UI
import PersonInfosCard from '../../../../../UI/Field/personInfosCard';
import FilterListFields from '../../../../Fields/FilterListFields/FilterListFields';
import GridFields from '../../../../Fields/GridFields/GridFields';

import age from '../../../../../Utils/age';

const Main = props => (
  <div className="columns is-multiline is-marginless">
    <div className="column is-4">
      <GridFields
        data={props.alias}
        description={AliasDescription}
        refreshFunction={props.getPerson}
        infoMessage="Aucun alias actif"
        newField="Ajouter un nouvel alias"
        schemaName="alias"
        url={props.url}
        title="Alias"
      />
    </div>
    <div className="column is-4">
      <GridFields
        data={props.id_external}
        description={IdExternalDescription}
        refreshFunction={props.getPerson}
        infoMessage="Aucun id"
        newField="Ajouter un nouvel ID"
        schemaName="id_external"
        url={props.url}
        title="ID externes"
      />
    </div>
    <div className="column is-4">
      <PersonInfosCard
        age={age(props.birth_date, props.death_date || null)}
        gender={props.gender}
        id_idref={props.id_idref}
        id_orcid={props.id_orcid}
        orcid_creation_date={props.orcid_creation_date}
      />
    </div>
    <div className="column is-12">
      <GridFields
        data={props.person_descriptions}
        description={PersonDescriptions}
        refreshFunction={props.getPerson}
        infoMessage="Aucune description"
        newField="Ajouter une nouvelle description"
        schemaName="person_descriptions"
        url={props.url}
        title="Descriptions"
      />
    </div>
    {
    (props.emails) && (
      <div className="column is-6">
        <FilterListFields
          data={props.emails}
          title="Emails"
          showFilter={false}
        />
      </div>
    )
  }

    <div className="column is-6">
      <GridFields
        data={props.links}
        description={LinksDescription}
        refreshFunction={props.getPerson}
        infoMessage="Aucun lien actif"
        newField="Ajouter un nouveau lien"
        schemaName="links"
        url={props.url}
        title="Liens"
      />
    </div>
  </div>
);

export default Main;

Main.propTypes = {
  getPerson: PropTypes.func,
  alias: PropTypes.array,
  birth_date: PropTypes.string,
  death_date: PropTypes.string,
  emails: PropTypes.array,
  links: PropTypes.array,
  gender: PropTypes.string,
  id_external: PropTypes.array,
  id_idref: PropTypes.string,
  id_orcid: PropTypes.string,
  orcid_creation_date: PropTypes.string,
  person_descriptions: PropTypes.array,
  url: PropTypes.string,
};
