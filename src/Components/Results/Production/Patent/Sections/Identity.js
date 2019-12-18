import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';
import moment from 'moment';
import SummaryCard from '../../Shared/SummaryCard/SummaryCard';
import SimpleCard from '../../../../Shared/Ui/SimpleCard/SimpleCard';
import TagCard from '../../../../Shared/Ui/TagCard/TagCard';
import CounterCard from '../../../../Shared/Ui/CounterCard/CounterCard';
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
  const publicationDate = moment(props.data.publicationDate).format('L');
  const submissionDate = moment(props.data.submissionDate).format('L');
  const summary = getSelectKey(props.data, 'summary', props.language, 'default');
  let keywords = [];
  if (props.data.domains) {
    keywords = props.data.domains.filter(dom => dom.level === 'ss_classe').map(el => (
      { tag: `${el.label.default} (${el.code})`, href: `/recherche/publications?filters=%7B"domains.code"%3A%7B"type"%3A"MultiValueSearchFilter"%2C"op"%3A"any"%2C"values"%3A%5B"${el.code}"%5D%7D%2C"productionType"%3A%7B"type"%3A"MultiValueSearchFilter"%2C"op"%3A"all"%2C"values"%3A%5B"patent"%5D%7D%7D` }
    ));
  }
  let isInternational = null;
  let isOEB = null;
  let grantedInfo = null;
  if (props.data.certifications) {
    isInternational = (props.data.certifications.filter(cert => cert.label === 'international'));
    isOEB = (props.data.certifications.filter(cert => cert.label === 'oeb'));
    grantedInfo = (props.data.certifications.filter(cert => cert.label === 'granted'))
      ? props.data.certifications.filter(cert => cert.label === 'granted')
      : null;
  }

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
        </div>
        {
          (grantedInfo.length)
            ? (
              <div className="row">
                <div className={`col-12 ${classes.CardContainer}`}>
                  <SimpleCard
                    language={props.language}
                    logo="fas fa-id-card"
                    title={<FormattedHTMLMessage id="Patent.Identity.depots.granted" />}
                    label={<FormattedHTMLMessage id="Patent.Identity.depots.grantedDate" values={{ date: moment(grantedInfo[0].date).format('L') }} />}
                    tooltip=""
                  />
                </div>
              </div>
            )
            : null
        }
        <div className="row">
          <div className={`col-md-6 ${classes.CardContainer}`}>
            <CounterCard
              counter={props.data.links.length}
              title=""
              color="Productions"
              language={props.language}
              label={<FormattedHTMLMessage id="Patent.Identity.depots.number" values={{ count: props.data.links.length }} />}
              className={classes.PersonCardHeight}
            />
          </div>
          <div className={`col-md-6 ${classes.CardContainer}`}>
            <SimpleCard
              language={props.language}
              logo="fas fa-clipboard-list"
              title={<FormattedHTMLMessage id="Patent.Identity.depots.oeb" />}
              label={(isOEB.length) ? (<i className={`fas fa-check-circle fa-3x ${classes.Success}`} />) : (<i className={`fas fa-times-circle fa-3x ${classes.Danger}`} />)}
              tooltip=""
            />
          </div>
          <div className={`col-md-6 ${classes.CardContainer}`}>
            <SimpleCard
              language={props.language}
              logo="fas fa-clipboard-list"
              title={<FormattedHTMLMessage id="Patent.Identity.depots.international" />}
              label={(isInternational.length) ? (<i className={`fas fa-check-circle fa-3x ${classes.Success}`} />) : (<i className={`fas fa-times-circle fa-3x ${classes.Danger}`} />)}
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
                  labelListButton="Autres"
                  tagList={keywords}
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
  data: PropTypes.object.isRequired,
};


// {
//   (grantedInfo.length)
//     ? (
//       <div className={`col-md-6 ${classes.CardContainer}`}>
//         <SimpleCard
//           language={props.language}
//           logo="fas fa-calendar-day"
//           title={<FormattedHTMLMessage id="Patent.Identity.depots.granted" />}
//           label={moment(grantedInfo[0].date).format('L')}
//           tooltip=""
//         />
//       </div>
//     )
//     : null
// }
