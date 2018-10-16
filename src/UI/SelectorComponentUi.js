import React from 'react';
import PropTypes from 'prop-types';

// Import de tous les composants à rendre
import InputDate from './Field/Editable/InputDate/InputDate';
import Input from './Field/Editable/Input/Input';
import Status from './Field/Editable/Status/Status';

const SelectorComponentUi = (props) => {
  let component = null;
  switch (props.componentType) {
    case 'InputDate':
      component = (
        <InputDate
          editMode={props.isEditable ? props.editMode : false}
          canBeNull={props.canBeNull}
          fieldValue={props.data}
          onChange={props.onChange}
        />
      );
      break;
    case 'Input':
      component = (
        <Input
          editMode={props.isEditable ? props.editMode : false}
          canBeNull={props.canBeNull}
          fieldValue={props.data}
          onChange={props.onChange}
        />
      );
      break;
    case 'Status':
      component = (
        <Status
          editMode={props.isEditable ? props.editMode : false}
          canBeNull={props.canBeNull}
          fieldValue={props.data}
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
