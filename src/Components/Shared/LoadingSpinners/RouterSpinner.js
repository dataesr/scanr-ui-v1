import React from 'react';
import PropTypes from 'prop-types';
import { GridLoader } from 'react-spinners';
import styles from '../../../style.scss';


const style = {
  height: '100vh',
  width: '100vw',
};

const RouterSpinner = props => (
  <div className="d-flex justify-content-center align-items-center" style={style}>
    <GridLoader
      color={props.color ? props.color : styles.scanrblueColor}
      loading
    />
  </div>
);

export default RouterSpinner;

RouterSpinner.propTypes = {
  color: PropTypes.string,
};
