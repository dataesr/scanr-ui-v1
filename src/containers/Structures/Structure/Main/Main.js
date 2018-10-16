import React from 'react';
import PropTypes from 'prop-types';

// Descriptions
import NameDescription from '../../../../config/descriptions/structure/names';

// Composants UI
import Aux from '../../../../hoc/Aux';
import GridFields from '../Fields/GridFields/GridFields';

const Main = props => (
  <Aux>
    <GridFields
      description={NameDescription}
      data={props.names}
      title="Liste des libellés"
    />
  </Aux>
);

export default Main;

Main.propTypes = {
  names: PropTypes.array.isRequired,
};
