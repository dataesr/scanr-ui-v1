import React from 'react';
import PropTypes from 'prop-types';
import { GridLoader } from 'react-spinners';
import styles from '../../../style.scss';
import classes from './Spinners.scss';

const RouterSpinner = (props) => {
  const style = {
    height: '100vh',
    width: '100vw',
    zIndex: 10000,
    backgroundColor: '#00000030',
    position: 'absolute',
  };
  let isVisible = '';
  if (!props.visible) {
    isVisible = 'hidden';
  }
  return (
    <div className={`d-flex justify-content-center align-items-center ${classes[isVisible]}`} style={style}>
      <GridLoader
        color={props.color ? props.color : styles.scanrblueColor}
        loading
      />
    </div>
  );
};


export default RouterSpinner;

RouterSpinner.propTypes = {
  color: PropTypes.string,
  visible: PropTypes.bool.isRequired,
};
