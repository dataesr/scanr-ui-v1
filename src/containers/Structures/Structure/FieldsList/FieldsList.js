import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../UI/Button/Button';
import FieldDispatcher from './Field/FieldDispatcher';
import FieldAddMode from './Field/FieldAddMode';

class FieldsList extends Component {
  state = {
    addMode: false,
    showAll: false,
  };

  toggleAddMode = (bool) => {
    this.setState({ addMode: bool });
  }

  toggleAllFields = () => {
    this.setState(prevState => ({ showAll: !prevState.showAll }));
  }


  render() {
    let { content } = this.props;
    if (this.state.showAll) {
      content = content.filter(item => item.status === 'main');
    }
    let addField = null;
    if (this.state.addMode) {
      addField = <FieldAddMode add={this.props.add} cancel={() => this.toggleAddMode(false)} />;
    }
    return (
      <div className="columns">
        <div className="column is-narrow is-one-quarter">
          <Button onClick={this.toggleAllFields}>
            {this.state.showAll ? <i className="fas fa-eye-slash" /> : <i className="fas fa-eye" />}
          </Button>
          <Button onClick={() => this.toggleAddMode(true)}>
            <i className="fas fa-plus" />
          </Button>
          <span className="has-text-weight-semibold">{`${this.props.label} :`}</span>
        </div>
        <div className="column">
          {content.map(field => (
            <FieldDispatcher
              key={field.id}
              allowDelete={this.props.content.length > 0}
              delete={this.props.delete}
              fieldValue={field.fieldValue}
              id={field.id}
              edit={this.props.edit}
              source={field.source}
              status={field.status}
            />
          ))}
          {addField}
        </div>

      </div>
    );
  }
}

export default FieldsList;

FieldsList.propTypes = {
  add: PropTypes.func.isRequired,
  content: PropTypes.array.isRequired,
  delete: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
