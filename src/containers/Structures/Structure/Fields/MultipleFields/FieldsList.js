import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../../UI/Button/Button';
import FieldModeDispatcher from '../FieldModeDispatcher/FieldModeDispatcher';
import FieldAddMode from './FieldAddMode';

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
          {content.map(field => (
            <FieldModeDispatcher
              key={field.id}
              allowDelete={this.props.content.length > 0}
              delete={this.props.delete}
              edit={this.props.edit}
              fullEdition
              id={field.id}
              fieldValue={field.fieldValue}
              readOnly={false}
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
