import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col,
} from 'react-bootstrap';
import classes from './GraphHeader.scss';

const GraphHeader = props => (
  <div>
    <Row>
      <Col style={{ backgroundColor: '#093e6c' }}>
        <div style={{ float: 'left' }}>
          <p style={{ color: '#6d99c0' }}>Connaître le pays</p>
          <p style={{ fontSize: '1.7em', color: 'white' }}>Graphiques</p>
        </div>
        <div style={{ float: 'right', color: 'white' }}>
          <p>12 indicateurs</p>
          <p>Disponibes</p>
        </div>
      </Col>
      <Col style={{ backgroundColor: '#ffb200' }} className={classes.arrowRight}>
        <select onChange={props.handleIndic} value={props.value}>
          <option value="pib">Produit intérieur brut</option>
          <option value="pop">Population</option>
        </select>
      </Col>
    </Row>
  </div>
  // <div>
  //   <div>Salut les amis !</div>
  //   <div className={classes.arrowUp} />
  //   <div className={classes.arrowDown} />
  //   <div className={classes.arrowLeft} />
  //   <div className={classes.arrowRight} />
  // </div>
);

export default GraphHeader;

GraphHeader.propTypes = {
  handleIndic: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  // language: PropTypes.string.isRequired,
  // switchLanguage: PropTypes.func.isRequired,
};
