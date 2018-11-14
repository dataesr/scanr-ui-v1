import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from '../../../../../axios';

class LeaderField extends Component {
  state = {
    person: null,
  }

  componentDidMount() {
    const embedded = { id_person: 1 };
    const url = `rnsr_leaders/${this.props.fieldValue}?embedded=${JSON.stringify(embedded)}`;
    axios.get(url)
      .then((response) => {
        let person = `${response.firstname} ${response.lastname}`;
        if (typeof response.id_person === 'object') {
          person = `${response.id_person.first_name} ${response.id_person.last_name}`;
        }
        this.setState({ person });
      });
  }

  render() {
    return (
      <div>
        {this.state.person}
      </div>
    )
  }
}

export default LeaderField;

LeaderField.propTypes = {
  fieldValue: PropTypes.string,
}
