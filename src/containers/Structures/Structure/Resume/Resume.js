import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../../../UI/Field/Card';
import LinkCard from '../../../../UI/Field/LinkCard';

const Resume = props => (
  <div className="columns">
    <div className="column">
      {props.urlLogo ? <img src={props.urlLogo} alt="" /> : null}

      <Card
        iconCssClass="fas fa-fingerprint"
        title="Rnsr ID"
      >
        {props.esrId}
      </Card>

    </div>
    <div className="column">
      {props.level ? (
        <Card
          iconCssClass=""
          title="Type entité"
        >
          {props.level}
        </Card>) : null }
      {props.nature ? (
        <Card
          iconCssClass=""
          title="Type supervision"
        >
          {props.nature}
        </Card>) : null }

    </div>
    <div className="column">
      <LinkCard
        url="http://www.google.com"
        iconCssClass="fas fa-mouse-pointer"
      />
    </div>
  </div>
);

export default Resume;

Resume.propTypes = {
  urlLogo: PropTypes.string,
  esrId: PropTypes.string,
  urlWebsite: PropTypes.string,
  level: PropTypes.string,
  nature: PropTypes.string,
};
