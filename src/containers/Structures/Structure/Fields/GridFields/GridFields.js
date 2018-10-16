import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../../../hoc/Aux';
import Button from '../../../../../UI/Button/Button';
import SelectorComponentUi from '../../../../../UI/SelectorComponentUi';

import classes from './GridFields.scss';

class GridFields extends Component {
  state = {
    editMode: false,
    newRow: null,
  }

  namesEditModeHandler = () => {
    this.setState({ editMode: !this.state.editMode });// A REVOIR !
  }

  namesNewHandler = () => {
    // Ajout d'une ligne vide
    let emptyRow = {};
    for (let i = 0; i < this.props.description.length; i++) {
      emptyRow[this.props.description[i]] = null;
    }
    this.setState({ newRow: emptyRow });
  }

  createLine(row, forceEditable) {
    const tD = this.props.description.map((field) => {
      if (field.isShown) {
        return (
          <td>
            <SelectorComponentUi
              componentType={field.componentType}
              isEditable={field.isEditable}
              editMode={forceEditable ? true : this.state.editMode}
              canBeNull={field.canBeNull}
              data={row[field.key]}
            />
          </td>
        );
      }
      return null;
    });
    return <tr>{tD}</tr>;
  }

  render() {
    // Parcours de la description
    // Récupération des libellés d'entete pour le tHead
    const tH = this.props.description.map((field) => {
      if (field.isShown) {
        return <th key={field.key}>{field.displayLabel}</th>;
      }
      return null;
    });
    const tHead = <thead>{tH}</thead>;

    // Pour chaque ligne de l'objet de données,
    const tBody = this.props.data.map(row => (
      this.createLine(row, false)
    ));

    // Ajout de la nouvelle ligne si le bouton a été cliqué
    let newRow = null;
    if (this.state.newRow) {
      newRow = this.createLine(this.state.newRow, true);
    }

    return (
      <Aux className={classes.GridFields}>
        <div>
          <div className={classes.TextTitleInline}>{this.props.title}</div>
          <Button onClick={this.namesEditModeHandler}>
            {this.state.editMode ? <i className="fas fa-undo-alt" /> : <i className="fas fa-pen" />}
          </Button>
          <Button onClick={this.namesNewHandler}>
            <i className="fas fa-plus" />
          </Button>
        </div>
        <table className="table is-striped is-narrow is-hoverable is-fullwidth">
          {tHead}
          {newRow}
          {tBody}
        </table>
      </Aux>
    );
  }
}

export default GridFields;

GridFields.propTypes = {
  description: PropTypes.array,
  data: PropTypes.object,
};
