import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';
import moment from 'moment';
import SummaryCard from '../../Shared/SummaryCard/SummaryCard';
import SimpleCard from '../../../../Shared/Ui/SimpleCard/SimpleCard';
import SimpleCardWithButton from '../../../../Shared/Ui/SimpleCardWithButton/SimpleCardWithButton';
import TagCard from '../../../../Shared/Ui/TagCard/TagCard';

import classes from '../Patents.scss';

import getSelectKey from '../../../../../Utils/getSelectKey';

/**
 * Patent
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const PatentIdentity = (props) => {
  const id = props.data.id;
  const publicationDate = moment(props.data.publicationDate).format('L');
  const submissionDate = moment(props.data.submissionDate).format('L');
  const summary = getSelectKey(props.data, 'summary', props.language, 'default');
  const patentLink = 'https://worldwide.espacenet.com/patent/search?q='.concat({ id }.id);
  const keywords = props.data.domains.filter(dom => dom.level === 'classe').map(el => el.label.default);
  const isInternational = (props.data.certifications.filter(cert => cert.label === 'international'));
  const isOEB = (props.data.certifications.filter(cert => cert.label === 'oeb'));
  const grantedInfo = (props.data.certifications.filter(cert => cert.label === 'granted'))
    ? props.data.certifications.filter(cert => cert.label === 'granted')
    : null;

  return (
    <div className="row">
      <div className="col-lg">
        <div className="row">
          <div className={`col-12 ${classes.CardContainer}`}>
            <SimpleCard
              language={props.language}
              logo="fas fa-id-card"
              title={<FormattedHTMLMessage id="Patent.Identity.title" />}
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
              title={<FormattedHTMLMessage id="Patent.Identity.identifier" />}
              label={id}
              tooltip=""
              url={patentLink}
              link="link_patent"
            />
          </div>
          <div className={`col-md-6 ${classes.CardContainer}`}>
            <SimpleCard
              language={props.language}
              logo="fas fa-calendar-day"
              title={<FormattedHTMLMessage id="Patent.Identity.submissionDate" />}
              label={submissionDate}
              tooltip=""
            />
          </div>
          <div className={`col-md-6 ${classes.CardContainer}`}>
            <SimpleCard
              language={props.language}
              logo="fas fa-calendar-day"
              title={<FormattedHTMLMessage id="Patent.Identity.publicationDate" />}
              label={(publicationDate)}
              tooltip=""
            />
          </div>
          {
            (grantedInfo)
              ? (
                <div className={`col-md-6 ${classes.CardContainer}`}>
                  <SimpleCard
                    language={props.language}
                    logo="fas fa-calendar-day"
                    title={<FormattedHTMLMessage id="Patent.Identity.depots.granted" />}
                    label={moment(grantedInfo.date).format('L')}
                    tooltip=""
                  />
                </div>
              )
              : null
          }
          <div className={`col-md-6 ${classes.CardContainer}`}>
            <SimpleCard
              language={props.language}
              logo="fas fa-clipboard-list"
              title={<FormattedHTMLMessage id="Patent.Identity.depots.oeb" />}
              label={(isOEB) ? (<i className={`fas fa-check-circle fa-3x ${classes.Success}`} />) : (<i className={`fas fa-times-circle fa-3x ${classes.Danger}`} />)}
              tooltip=""
            />
          </div>
          <div className={`col-md-6 ${classes.CardContainer}`}>
            <SimpleCard
              language={props.language}
              logo="fas fa-clipboard-list"
              title={<FormattedHTMLMessage id="Patent.Identity.depots.international" />}
              label={(isInternational) ? (<i className={`fas fa-check-circle fa-3x ${classes.Success}`} />) : (<i className={`fas fa-times-circle fa-3x ${classes.Danger}`} />)}
              tooltip=""
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
                  title={<FormattedHTMLMessage id="Patent.Identity.summary" />}
                  text={summary}
                  tooltip=""
                />
              </div>
            ) : null
          }
          {
            (keywords.length > 0) ? (
              <div className={`col-12 ${classes.CardContainer}`}>
                <TagCard
                  language={props.language}
                  logo="fas fa-clipboard-list"
                  title={<FormattedHTMLMessage id="Patent.Identity.tags" />}
                  tagStyle={{ backgroundColor: '#3778bb', color: 'white' }}
                  labelListButton="Autres"
                  tagList={keywords}
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

export default PatentIdentity;

PatentIdentity.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
