import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';
import moment from 'moment';

import SummaryCard from '../../Shared/SummaryCard/SummaryCard';
import SimpleCard from '../../../../Shared/Ui/SimpleCard/SimpleCard';
import SimpleCardWithButton from '../../../../Shared/Ui/SimpleCardWithButton/SimpleCardWithButton';
import SourceCard from '../SubComponents/SourceCard';
import LogoCard from '../../../../Shared/Ui/LogoCard/LogoCard';

import getSelectKey from '../../../../../Utils/getSelectKey';
import getExternalInfos from '../../../../../Utils/helpers';

import classes from '../Publication.scss';

/**
 * Publication Informations
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

const Informations = (props) => {
  const { id } = props.data;
  let publicationDate = moment(props.data.publicationDate).format('L');
  if (publicationDate.slice(0, 5) === '01/01') {
    publicationDate = publicationDate.slice(6, 10);
  }
  const summary = getSelectKey(props.data, 'summary', props.language, 'default') || getSelectKey(props.data, 'alternativeSummary', props.language, 'default');

  let swHeritageLink = null;
  if (props.data.links && props.data.links.length > 0) {
    const swL = props.data.links.find(el => el.type === 'software_heritage');
    if (swL) {
      swHeritageLink = swL.url;
    }
  }
  return (
    <div className="row">
      <div className="col-lg">
        <div className="row">
          <div className={`col-12 ${classes.CardContainer}`}>
            <SimpleCard
              language={props.language}
              logo="fas fa-id-card"
              title={<FormattedHTMLMessage id="Publication.publication.title" />}
              label={getSelectKey(props.data, 'title', props.language, 'default')}
              tooltip=""
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <div className="row">
              <div className={`col-md-12 ${classes.CardContainer}`}>
                <SimpleCardWithButton
                  language={props.language}
                  logo="fas fa-fingerprint"
                  title={getExternalInfos(id).name}
                  label={id}
                  url={getExternalInfos(id).link}
                  link="link_publication"
                  tooltip=""
                />
              </div>
              <div className={`col-md-12 ${classes.CardContainer}`}>
                <SimpleCard
                  language={props.language}
                  logo="fas fa-calendar-day"
                  title={<FormattedHTMLMessage id="Publication.publication.publicationDate" />}
                  label={publicationDate}
                  tooltip=""
                />
              </div>
            </div>
          </div>
          <div className={`col-md-7 ${classes.CardContainer}`}>
            <SourceCard
              language={props.language}
              data={props.data.source}
            />
          </div>
        </div>
      </div>

      <div className="col-lg">
        <div className="row">
          {
            (summary) ? (
              <div className={`col-12 ${classes.CardContainer}`}>
                <SummaryCard
                  language={props.language}
                  title={<FormattedHTMLMessage id="Publication.summary.title" />}
                  text={summary}
                  tooltip=""
                />
              </div>
            ) : null
          }
          <div className={`col-md-6 ${classes.CardContainer}`}>
            <SimpleCard
              language={props.language}
              logo="fas fa-bookmark"
              title={<FormattedHTMLMessage id="Publication.publication.type" />}
              label={<FormattedHTMLMessage id={`Publication.publication.type.${props.data.type}`} />}
              tooltip=""
            />
          </div>
          {
          (swHeritageLink) ? (
            <div className={`col-md-6 ${classes.CardContainer}`}>
              <LogoCard
                url="./img/swh-logo.jpg"
                cssClass="Height150"
                targetUrl={swHeritageLink}
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
