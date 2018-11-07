import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import Card from '../../../../../UI/Field/Card';
import LinkCard from '../../../../../UI/Field/LinkCard';
import WordCloud from '../../../../../UI/Field/WordCloud';

import classes from './Resume.scss';

const Resume = props => (
  <Fragment>
    <div className={classes.Dates}>
      Ouvert depuis le &nbsp;
      {moment(props.start_date).format('LL')}
      {props.end_date && ` et fermé depuis le ${moment(props.end_date).format('LL')}`}
    </div>
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
          url={props.urlWebsite}
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
  </Fragment>
);

export default Resume;

Resume.propTypes = {
  esrId: PropTypes.string,
  end_date: PropTypes.string,
  keywords_fr: PropTypes.array,
  keywords_en: PropTypes.array,
  level: PropTypes.string.isRequired,
  nature: PropTypes.string.isRequired,
  start_date: PropTypes.string,
  urlLogo: PropTypes.string,
  urlWebsite: PropTypes.string,
};
