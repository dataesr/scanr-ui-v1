import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import Card from '../../../../../UI/Field/Card';
import LinkCard from '../../../../../UI/Field/LinkCard';
import WordCloud from '../../../../../UI/Field/WordCloud';

import classes from './Resume.scss';

const Resume = (props) => {
  const mainWebsite = props.websites && props.websites.find(website => website.status === 'main');
  let words = props.keywords_fr || [];
  words = words.concat(props.keywords_en, props.rnsr_domains, props.rnsr_themes);
  return (
    <Fragment>
      <div className={classes.Dates}>
        Ouvert depuis le &nbsp;
        {moment(props.start_date).format('LL')}
        {props.end_date && ` et fermé depuis le ${moment(props.end_date).format('LL')}`}
      </div>
      <div className="columns">
        <div className="column">
          {props.logo && <img src={props.logo} alt="" />}
          <Card
            iconCssClass="fas fa-fingerprint"
            title="Rnsr ID"
          >
            {props.id}
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
          {mainWebsite && (
            <LinkCard
              url={mainWebsite.url}
              iconCssClass="fas fa-mouse-pointer"
            />)}
        </div>
      </div>
      <div className="columns">
        {props.keywords_fr && (
          <WordCloud
            words={words}
          />)}
      </div>
    </Fragment>
  );
};


export default Resume;

Resume.propTypes = {
  id: PropTypes.string,
  end_date: PropTypes.string,
  keywords_fr: PropTypes.array,
  keywords_en: PropTypes.array,
  level: PropTypes.string,
  nature: PropTypes.string,
  start_date: PropTypes.string,
  logo: PropTypes.string,
  rnsr_domains: PropTypes.array,
  rnsr_themes: PropTypes.array,
  websites: PropTypes.array,
};
