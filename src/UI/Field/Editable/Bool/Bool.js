import React from 'react';
import PropTypes from 'prop-types';

import classes from '../../Field.scss';

const boolArray = [
  {
    value: true,
    name: 'oui',
  },
  {
    value: false,
    name: 'non',
  },
];

const bool = (props) => {
  let content = <span className="tag is-info">{props.fieldValue === true ? 'oui' : 'non'}</span>;
  if (props.editMode) {
    content = (
      <div className={`select is-rounded is-small ${classes.Status}`}>
        <select
          id={props.id}
          value={props.fieldValue || 'empty'}
          onChange={props.onChange}
        >
          {boolArray.map(boolObject => <option key={boolObject.value} value={boolObject.value}>{bool.name}</option>)}
        </select>
      </div>);
  }

  return content;
};

export default bool;

bool.propTypes = {
  editMode: PropTypes.bool,
  fieldValue: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

bool.defaultProps = {
  fieldValue: 'oui',
  editMode: false,
};
