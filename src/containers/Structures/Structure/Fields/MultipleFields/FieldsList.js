import React, { Component } from 'react';
import PropTypes from 'prop-types';

import mainValidation from '../../../../../Utils/mainValidation';
import Button from '../../../../../UI/Button/Button';
import ErrorMessage from '../../../../../UI/Messages/ErrorMessage';

import FieldReadMode from '../FieldMode/FieldReadMode';
import FieldEditMode from '../FieldMode/FieldEditMode';
import FieldAddMode from './FieldAddMode';

class FieldsList extends Component {
  state = {
    addMode: false,
    content: this.props.content,
    editMode: false,
    mainError: '',
    showAll: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content) {
      this.setState({
        addMode: false,
        editMode: false,
        content: this.props.content,
      });
    }
  }

  toggleEditMode = () => {
    this.setState({ editMode: true, showAll: true, mainError: '' });
  }

  toggleAddMode = (bool) => {
    this.setState({ addMode: bool, mainError: '' });
  }

  toggleAllFields = () => {
    this.setState(prevState => ({ showAll: !prevState.showAll }));
  }

  onChangeHandler = (event, id) => {
    event.persist();
    this.setState((prevState) => {
      const now = new Date();
      const content = [...prevState.content];
      const index = content.findIndex(item => item.id === id);
      const itemToUpdate = { ...content[index] };
      itemToUpdate[event.target.id] = event.target.value;
      itemToUpdate.source = 'user';
      itemToUpdate.created_at = now.toISOString();
      content[index] = itemToUpdate;
      return { content };
    });
  }

  onBlurHandler = (event) => {
    if (!event.relatedTarget || !(event.relatedTarget.id === 'save'
      || event.relatedTarget.id === 'status' || event.relatedTarget.id === 'fieldValue')) {
      this.setState({ editMode: false, addMode: false });
    }
  }

  editButtonHandler = () => {
    if (mainValidation(this.state.content)) {
      this.props.save(this.state.content);
    } else {
      this.setState({ mainError: "Un et un seul champ doit avoir le statut 'main'" });
    }
  }

  addButtonHandler = (item) => {
    const updatedContent = this.state.content.concat([item]);
    if (mainValidation(updatedContent)) {
      this.props.save(updatedContent);
    } else {
      this.setState({ mainError: "Un et un seul champ doit avoir le statut 'main'" });
    }
  }


  render() {
    let { content } = this.state;
    if (!this.state.showAll) {
      content = content.filter(item => item.status !== 'old');
    }
    let addField = null;
    if (this.state.addMode) {
      addField = (
        <FieldAddMode
          add={this.addButtonHandler}
          mainError={this.state.mainError}
          onBlur={this.onBlurHandler}
        />);
    }
    let fields = content.map(field => (
      <div key={field.id} className="columns">
        <FieldReadMode
          fieldValue={field.fieldValue}
          onClick={this.toggleEditMode}
          source={field.source}
          status={field.status}
        />
      </div>));

    let saveButton = null;
    if (this.state.editMode) {
      saveButton = (
        <div className="column is-narrow has-text-right">
          <ErrorMessage>
            {this.state.mainError}
          </ErrorMessage>
          <Button id="save" onClick={this.editButtonHandler}>
            <i className="fas fa-save" />
          </Button>
        </div>);
      fields = content.map(field => (
        <div key={field.id} className="columns">
          <FieldEditMode
            allowDelete={this.props.content.length > 1}
            deleteButton={() => this.props.delete(field.id)}
            fieldValue={field.fieldValue}
            fullEdition
            onChange={event => this.onChangeHandler(event, field.id)}
            onBlur={this.onBlurHandler}
            status={field.status}
          />
        </div>));
    }

    return (
      <div className="columns">
        <div className="column has-text-right is-narrow is-one-fifth">
          <span className="has-text-weight-semibold">{`${this.props.label} :`}</span>
          <div className="column">
            <Button onClick={this.toggleAllFields}>
              {this.state.showAll ? <i className="fas fa-eye-slash" /> : <i className="fas fa-eye" />}
            </Button>
            <Button onClick={() => this.toggleAddMode(true)}>
              <i className="fas fa-plus" />
            </Button>
          </div>
        </div>
        <div className="column">
          <div className="column">
            {fields}
          </div>
          {saveButton}
          {addField}
        </div>
      </div>
    );
  }
}

export default FieldsList;

FieldsList.propTypes = {
  save: PropTypes.func.isRequired,
  content: PropTypes.array.isRequired,
  delete: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
