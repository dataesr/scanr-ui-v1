import React from 'react';
import PropTypes from 'prop-types';

// Import de tous les composants à rendre
import InputDate from './Editable/InputDate/InputDate';
import Input from './Editable/Input/Input';
import Status from './Editable/Status/Status';

const SelectorComponentUi = (props) => {
  let component = null;
  switch (props.componentType) {
    case 'InputDate':
      component = (
        <InputDate
          isEditable={props.isEditable}
          editMode={props.editMode}
          canBeNull={props.canBeNull}
          data={props.data}
          onChange={props.onChange}
        />
      );
      break;
    case 'Input':
      component = (
        <Input
          isEditable={props.isEditable}
          editMode={props.editMode}
          canBeNull={props.canBeNull}
          data={props.data}
          onChange={props.onChange}
        />
      );
      break;
    case 'Status':
      component = (
        <Status
          isEditable={props.isEditable}
          editMode={props.editMode}
          canBeNull={props.canBeNull}
          data={props.data}
          onChange={props.onChange}
        />
      );
      break;
    default:
      component = <span>Component not found</span>;
  }
  return (component);
};

export default SelectorComponentUi;

SelectorComponentUi.propTypes = {
  componentType: PropTypes.string,
  isEditable: PropTypes.boolean,
  editMode: PropTypes.boolean,
  canBeNull: PropTypes.boolean,
  data: PropTypes.string,
  onChange: PropTypes.func,
};
