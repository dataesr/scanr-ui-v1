import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from '../../../../../axios';

class LeaderField extends Component {
  state = {
    person: null,
  }

  componentDidMount() {
    const embedded = { id_persons: 1 };
    const url = `rnsr-leaders/${this.props.fieldValue}?embedded=${JSON.stringify(embedded)}`;
    axios.get(url)
      .then((response) => {
        let person = `${response.data.firstname} ${response.data.lastname}`;
        if (typeof response.data.id_person === 'object') {
          person = `${response.data.id_person.first_name} ${response.data.id_person.last_name}`;
        }
        this.setState({ person });
      });
  }

  render() {
    return (
      <div>
        {this.state.person}
      </div>);
  }
}

export default LeaderField;

LeaderField.propTypes = {
  fieldValue: PropTypes.string,
};
