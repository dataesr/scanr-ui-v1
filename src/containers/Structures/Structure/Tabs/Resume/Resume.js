import React from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../../../hoc/Aux';
import Card from '../../../../../UI/Field/Card';
import LinkCard from '../../../../../UI/Field/LinkCard';
import WordCloud from '../../../../../UI/Field/WordCloud';

const Resume = props => (
  <Aux>
    <div className="columns">
      <div className="column">
        {props.urlLogo && <img src={props.urlLogo} alt="" />}
        <Card
          iconCssClass="fas fa-fingerprint"
          title="Rnsr ID"
        >
          {props.esrId}
        </Card>
      </div>
      <div className="column">
        {props.level && (
          <Card
            iconCssClass=""
            title="Type entité"
          >
            {props.level}
          </Card>)}
        {props.nature && (
          <Card
            iconCssClass=""
            title="Type supervision"
          >
            {props.nature}
          </Card>)}
      </div>
      <div className="column">
        <LinkCard
          url="http://www.google.com"
          iconCssClass="fas fa-mouse-pointer"
        />
      </div>
    </div>
    <div className="columns">
      {props.keywords_fr && (
        <WordCloud
          words={props.keywords_fr.concat(props.keywords_en)}
        />)}
    </div>
  </Aux>
);

export default Resume;

Resume.propTypes = {
  esrId: PropTypes.string,
  keywords_fr: PropTypes.array,
  keywords_en: PropTypes.array,
  level: PropTypes.string,
  nature: PropTypes.string,
  urlLogo: PropTypes.string,
};
