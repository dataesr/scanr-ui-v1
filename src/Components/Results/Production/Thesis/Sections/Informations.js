import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';
import moment from 'moment';

import SummaryCard from '../../Shared/SummaryCard/SummaryCard';
import SimpleCard from '../../../../Shared/Ui/SimpleCard/SimpleCard';
import SimpleCardWithButton from '../../../../Shared/Ui/SimpleCardWithButton/SimpleCardWithButton';
import TagCard from '../../../../Shared/Ui/TagCard/TagCard';
import LogoCard from '../../../../Shared/Ui/LogoCard/LogoCard';
import YoutubeCard from '../../../../Shared/Ui/YoutubeCard/YoutubeCard';
import PrizeCard from '../../../../Shared/Ui/PrizeCard/PrizeCard';
import PersonCard from '../../../../Shared/Ui/PersonCard/PersonCard';

import getSelectKey from '../../../../../Utils/getSelectKey';

import classes from '../Thesis.scss';

/**
 * Publication Informations
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Informations = (props) => {
  const getAuthor = role => (
    props.data.authors.find(person => person.role === role)
  );
  const id = (props.data.id.substring(0, 5) === 'these') ? props.data.id.substring(5) : props.data.id;

  const theseLink = 'http://www.theses.fr/'.concat({ id }.id);

  const publicationDate = moment(props.data.publicationDate).format('L');

  let swHeritageLink = null;
  if (props.data.links && props.data.links.length > 0) {
    const swL = props.data.links.find(el => el.type === 'software_heritage');
    if (swL) {
      swHeritageLink = swL.url;
    }
  }

  let youtubeUrl = null;
  if (props.data.links && props.data.links.length > 0) {
    for (let i = 0; i < props.data.links.length; i += 1) {
      if (props.data.links[i].type.toLowerCase() === 'youtube') {
        youtubeUrl = props.data.links[i].url;
      }
    }
  }

  const newAwards = [];
  if (props.data.awards) {
    props.data.awards.forEach((element) => {
      let labelToUse = element.label;
      if (element.description) {
        labelToUse = element.label.concat(' (', element.description).concat(')');
      }
      newAwards.push({
        label: labelToUse,
        date: element.date,
      });
    });
  }

  const summary = (props.language === 'fr') ? getSelectKey(props.data, 'summary', props.language, 'default') : getSelectKey(props.data, 'alternativeSummary', props.language, 'default');

  return (
    <div className="row">
      <div className="col-lg">
        <div className="row">
          <div className={`col-12 ${classes.CardContainer}`}>
            <SimpleCard
              language={props.language}
              logo="fas fa-id-card"
              title={<FormattedHTMLMessage id="Thesis.Identity.title" />}
              label={getSelectKey(props.data, 'title', props.language, 'default')}
              tooltip=""
            />
          </div>
        </div>
        <div className="row">
          <div className={`col-md-6 ${classes.CardContainer}`}>
            <SimpleCardWithButton
              language={props.language}
              logo="fas fa-id-card"
              title={<FormattedHTMLMessage id="Thesis.Identity.id" />}
              label={id}
              tooltip=""
              url={theseLink}
              link="link_these"
            />
          </div>
          <div className={`col-md-6 ${classes.CardContainer}`}>
            <SimpleCard
              language={props.language}
              logo="fas fa-calendar-day"
              title={<FormattedHTMLMessage id="Thesis.Identity.publicationDate" />}
              label={publicationDate}
              tooltip=""
            />
          </div>
          <div className={`col-md-6 ${classes.CardContainer}`}>
            { /* eslint-disable */ }
            <PersonCard
              data={getAuthor('author')}
              showTitle={false}
              language={props.language}
              role="author"
            />
          { /* eslint-enable */ }
          </div>
          {
          (swHeritageLink) ? (
            <div className={`col-md-6 ${classes.CardContainer}`}>
              <LogoCard
                url="./img/swh-logo.jpg"
                language={props.language}
                cssClass="Height150"
              />
            </div>
          ) : null
          }
        </div>
        <div className="row">
          { (youtubeUrl) ? (
            <div className={`col-md-12 ${classes.CardContainer}`} style={{ height: '500px' }}>
              <YoutubeCard url={youtubeUrl} autoHeight />
            </div>
          ) : null }
        </div>
        <div className="row">
          {
            newAwards.map(award => (
              <div className={`col-md-6 col-sm-12 ${classes.CardContainer}`}>
                <PrizeCard
                  date={award.date}
                  language={props.language}
                  label={award.label}
                  icon="prize"
                  color={classes.personColor}
                />
              </div>
            ))
          }
        </div>
      </div>
      <div className="col-lg">
        <div className="row">
          {
            (summary) ? (
              <div className={`col-12 ${classes.CardContainer}`}>
                <SummaryCard
                  language={props.language}
                  title={<FormattedHTMLMessage id="Thesis.Identity.summary" />}
                  text={summary}
                  tooltip=""
                />
              </div>
            ) : null
          }
          {
            (props.data.keywords.default.length > 0) ? (
              <div className={`col-12 ${classes.CardContainer}`}>
                <TagCard
                  language={props.language}
                  logo="fas fa-clipboard-list"
                  title={<FormattedHTMLMessage id="Thesis.Identity.tags" />}
                  labelListButton="Autres"
                  tagList={props.data.keywords.default}
                  tooltip=""
                />
              </div>
            ) : null
          }
        </div>
      </div>
    </div>

  );
};


export default Informations;

Informations.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
