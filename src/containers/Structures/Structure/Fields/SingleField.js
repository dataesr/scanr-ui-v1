import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../UI/Button/Button';

import FieldReadMode from './FieldMode/FieldReadMode';
import FieldEditMode from './FieldMode/FieldEditMode';

class SingleField extends Component {
  state = {
    fieldValue: this.props.fieldValue,
    editMode: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.fieldValue !== this.props.fieldValue) {
      this.setState({ editMode: false, fieldValue: this.props.fieldValue });
    }
  }

  toggleEditMode = () => {
    this.setState({ editMode: true });
  }

  onChangeHandler = (event) => {
    this.setState({ fieldValue: event.target.value });
  }

  onBlurHandler = (event) => {
    if (!event.relatedTarget || event.relatedTarget.id !== 'save') {
      this.setState({ editMode: false });
    }
  }

  buttonHandler = (value) => {
    this.props.edit(value);
  }


  render() {
    let field = (
      <div className="column">
        <FieldReadMode
          fieldValue={this.state.fieldValue}
          source={this.state.source}
          onClick={this.props.readOnly ? null : this.toggleEditMode}
        />
      </div>);
    let button = null;
    if (this.state.editMode) {
      field = (
        <div className="column">
          <div className="columns">
            <FieldEditMode
              allowDelete={!this.props.readOnly}
              deleteButton={() => this.buttonHandler(null)}
              fieldValue={this.state.fieldValue}
              fullEdition={false}
              onChange={this.onChangeHandler}
              onBlur={this.onBlurHandler}
            />
          </div>
        </div>);
      button = (
        <div className="column is-narrow has-text-right">
          <Button id="save" onClick={() => this.buttonHandler(this.state.fieldValue)}>
            <i className="fas fa-save" />
          </Button>
        </div>);
    }

    return (
      <div className="columns">
        <div className="column is-narrow is-one-fifth has-text-right">
          <span className="has-text-weight-semibold">{`${this.props.label} :`}</span>
        </div>
        <div className="columns">
          {field}
          {button}
        </div>
      </div>
    );
  }
}

SingleField.propTypes = {
  edit: PropTypes.func,
  fieldValue: PropTypes.string,
  label: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
};

export default SingleField;
