import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TagsInput from 'react-tagsinput';
import axios from '../../../axios';

// Composants UI
import { ERREUR_PATCH } from '../../../config/config';
import ErrorMessage from '../../../UI/Messages/ErrorMessage';
import classes from './TagField.scss';

class TagField extends Component {
  state = {
    errorMessage: null,
    tags: this.props.data,
  };

  handleChange = (tags) => {
    this.setState({ tags, errorMessage: null });

    // Enregistrement des modifications
    this.axiosCall(tags);
  }

  axiosCall = (data) => {
    const dataObject = {
      [this.props.schemaName]: data,
    };
    const url = `structures/${this.props.structureId}`;
    axios.patch(url, dataObject)
      .then(
        (response) => {
          if (response.status === 200) {
            this.setState({
              errorMessage: null,
              tags: data,
            });
            this.props.getStructure();
          }
        },
      )
      .catch(() => this.setState({ errorMessage: ERREUR_PATCH }));
  };

  render() {
    return (
      <Fragment>
        <div className={classes.TextTitleInline}>
          {this.props.title}
        </div>
        <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
        <TagsInput
          inputProps={{ placeholder: this.props.infoMessage }}
          onChange={this.handleChange}
          value={this.state.tags || []}
        />
      </Fragment>
    );
  }
}

export default TagField;

TagField.propTypes = {
  data: PropTypes.array,
  getStructure: PropTypes.func.isRequired,
  infoMessage: PropTypes.string.isRequired,
  schemaName: PropTypes.string.isRequired,
  structureId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
