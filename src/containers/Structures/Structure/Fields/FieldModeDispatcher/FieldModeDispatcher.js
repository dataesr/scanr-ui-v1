import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FieldReadMode from './FieldMode/FieldReadMode';
import FieldEditMode from './FieldMode/FieldEditMode';

class FieldModeDispatcher extends Component {
  state = {
    editMode: false,
  };

  toggleEditMode = (bool) => {
    this.setState({ editMode: bool });
  }


  render() {
    let field = (
      <FieldReadMode
        editButton={() => this.toggleEditMode(true)}
        fieldValue={this.props.fieldValue}
        source={this.props.source}
        status={this.props.status}
        readOnly={this.props.readOnly}
      />);
    if (this.state.editMode) {
      field = (
        <FieldEditMode
          allowDelete={this.props.allowDelete}
          cancel={() => this.toggleEditMode(false)}
          delete={this.props.delete}
          fieldValue={this.props.fieldValue}
          fullEdition={this.props.fullEdition}
          id={this.props.id}
          edit={this.props.edit}
          source={this.props.source}
          status={this.props.status}
        />);
    }
    return field;
  }
}

export default FieldModeDispatcher;

FieldModeDispatcher.propTypes = {
  allowDelete: PropTypes.bool,
  delete: PropTypes.func,
  edit: PropTypes.func.isRequired,
  fieldValue: PropTypes.string.isRequired,
  fullEdition: PropTypes.bool.isRequired,
  id: PropTypes.number,
  readOnly: PropTypes.bool.isRequired,
  source: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
