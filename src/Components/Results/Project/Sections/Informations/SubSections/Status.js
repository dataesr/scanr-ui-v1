import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import moment from 'moment';
import 'moment/locale/fr';


import SimpleCard from '../../../../../Shared/Ui/SimpleCard/SimpleCard2';
import PileCard from '../../../Components/PileCard';

import classes from './SubSectionsStyles.scss';

import messagesFr from '../../../translations/fr.json';
import messagesEn from '../../../translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};
/**
 * Informations
 * Url : .
 * Informations : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

const Status = (props) => {
  moment.locale(props.language);
  let calculatedEndDate;
  if (props.data.startDate && props.data.duration) {
    const dt = new Date(props.data.startDate);
    dt.setMonth(dt.getMonth() + props.data.duration);
    calculatedEndDate = dt;
  }
  const statusEndDate = (props.data.endDate) ? new Date(props.data.endDate) : calculatedEndDate;
  const status = (statusEndDate > Date.now()) ? 'running' : 'over';
  const startDate = moment(props.data.startDate).format('LL');
  const endDate = (props.data.endDate) ? moment(props.data.endDate).format('LL') : moment(calculatedEndDate).format('LL');
  let percents = 100;
  if (status && status === 'running') {
    percents = Math.round(
      ((Date.now() - new Date(props.data.startDate)) * 100 / (new Date(statusEndDate) - new Date(props.data.startDate))),
    );
  }
  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section className={`p-0 ${classes.W50}`}>
        <div className={classes.SubSectionTitle}>
          <FormattedHTMLMessage
            id="Project.informations.status.title"
            defaultMessage="Project.informations.status.title"
          >
            {
              txt => (
                <h3 className={classes.Title}>
                  {txt}
                </h3>
              )
            }
          </FormattedHTMLMessage>
        </div>
        <div className="d-flex flex-wrap">
          <div className={classes.W50}>
            {
              (startDate)
                ? (
                  <SimpleCard
                    language={props.language}
                    logo="fas fa-qrcode"
                    title={messages[props.language]['Project.informations.startDate']}
                    label={startDate}
                    tooltip=""
                  />
                )
                : null
            }
          </div>
          <div className={classes.W50}>
            {
              (endDate)
                ? (
                  <SimpleCard
                    language={props.language}
                    logo="fas fa-qrcode"
                    title={messages[props.language]['Project.informations.endDate']}
                    label={endDate}
                    tooltip=""
                  />
                )
                : null
            }
          </div>
          <div className={classes.W50}>
            {
              (percents)
                ? (
                  <PileCard
                    language={props.language}
                    percents={percents}
                  />
                )
                : null
            }
          </div>
        </div>
      </section>
    </IntlProvider>
  );
};

export default Status;

Status.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
};
