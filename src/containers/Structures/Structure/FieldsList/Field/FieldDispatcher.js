import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FieldReadMode from './FieldReadMode';
import FieldEditMode from './FieldEditMode';

class FieldDispatcher extends Component {
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
      />);
    if (this.state.editMode) {
      field = (
        <FieldEditMode
          allowDelete={this.props.allowDelete}
          cancel={() => this.toggleEditMode(false)}
          delete={this.props.delete}
          fieldValue={this.props.fieldValue}
          edit={this.props.edit}
          source={this.props.source}
          status={this.props.status}
        />);
    }
    return field;
  }
}

export default FieldDispatcher;

FieldDispatcher.propTypes = {
  allowDelete: PropTypes.bool.isRequired,
  delete: PropTypes.func.isRequired,
  fieldValue: PropTypes.string.isRequired,
  edit: PropTypes.func.isRequired,
  source: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
