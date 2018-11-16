import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from '../../Field.scss';

class Select extends Component {
  state = {
    showInput: false,
  }

  onChange = (event) => {
    if (event.target.value === 'new') {
      this.setState({ showInput: true });
    } else {
      this.props.onChange(event);
    }
  }

  render() {
    let selectMode = (
      <span className={classes.Text} onClick={this.props.onClick} role="presentation">
        {this.props.fieldValue}
      </span>);
    if (this.props.editMode) {
      let inputColor = null;
      if (!this.props.canBeNull) {
        inputColor = this.props.fieldValue ? 'is-primary' : 'is-danger';
      }
      selectMode = (
        <div className={`select is-rounded is-small ${inputColor}`}>
          <select
            id={this.props.id}
            value={this.props.fieldValue || ''}
            onChange={this.onChange}
          >
            <option>- Choisir -</option>
            {this.props.typesList.map(type => (
              <option key={type} value={type}>{type}</option>))}
            <option value="new">Ajouter un nouveau type...</option>
          </select>
        </div>);
      if (this.state.showInput) {
        selectMode = (
          <input
            id={this.props.id}
            className={`input is-rounded is-small ${inputColor} ${classes.BoxSizing}`}
            onChange={this.props.onChange}
            value={this.props.fieldValue || ''}
            type="text"
          />);
      }
    }
    return selectMode;
  }
}

export default Select;

Select.propTypes = {
  canBeNull: PropTypes.bool,
  editMode: PropTypes.bool,
  fieldValue: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  typesList: PropTypes.array,
};

Select.defaultProps = {
  editMode: false,
};
