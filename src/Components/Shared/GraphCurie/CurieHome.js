import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import GraphCurie from './GraphCurie';

const CurieHome = props => (
  <Container>
    <Row>
      <Col>
        <GraphCurie
          graphType="aboutCountry"
          countryCode="USA"
          language={props.language}
        />
      </Col>
    </Row>
  </Container>
);

export default CurieHome;

CurieHome.propTypes = {
  language: PropTypes.string.isRequired,
  // switchLanguage: PropTypes.func.isRequired,
};
