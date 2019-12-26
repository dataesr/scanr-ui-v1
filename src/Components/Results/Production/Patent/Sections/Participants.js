import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import PersonCard from '../../../../Shared/Ui/PersonCard/PersonCard';
import EntityCard from '../../../../Shared/Ui/DeposantCard/DeposantCard';
import CardsTitle from '../../../../Shared/Ui/CardsTitle/CardsTitle';
import CounterCard from '../../../../Shared/Ui/CounterCard/CounterCard';
import CounterListCard from '../../../../Shared/Ui/CounterListCard/CounterListCard';

import classes from '../Patents.scss';
import countries from '../countries.json';

/**
 * Patent
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const PatentParticipants = (props) => {
  const inventors = props.data.filter(auth => auth.role.indexOf('__inventeur') >= 0).map((auth) => {
    const [fullName, country] = auth.fullName.split('__');
    return { fullName, country: countries[props.language][country] };
  });
  const deposants = props.data.filter(auth => auth.role.indexOf('__deposant') >= 0).map((auth) => {
    const [label, country] = auth.fullName.split('__');
    return { label, country: countries[props.language][country] };
  });

  const nbInventorsToShow = 4;

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="row">
          <div className={`col ${classes.NoSpace}`}>
            <CardsTitle title={<FormattedHTMLMessage id="Patents.Participants.inventor" />} />
          </div>
        </div>

        <div className="row">
          {
            (inventors.length > 1)
              ? (
                <div className={`col-md-6 ${classes.CardContainer}`}>
                  <CounterCard
                    counter={inventors.length}
                    title=""
                    label={<FormattedHTMLMessage id="Patents.Participants.inventor" />}
                    color="Persons"
                  />
                </div>
              ) : null
          }
          {
            inventors.map((inventor, index) => {
              if (index < nbInventorsToShow) {
                return (
                  <div className={`col-md-6 ${classes.CardContainer}`}>
                    <PersonCard
                      data={inventor}
                      showTitle={false}
                      className={classes.BGLightGrey}
                    />
                  </div>
                );
              }
              return null;
            })
          }
          {
            (inventors.length > nbInventorsToShow)
              ? (
                <div className={`col-md-6 ${classes.CardContainer}`}>
                  <CounterListCard
                    language={props.language}
                    data={inventors}
                    objectType="author"
                    limit={nbInventorsToShow}
                    roleKey="inventor"
                    labelKey="other-inventors"
                    modalTitleKey="inventors-modal-title"
                    color="MiddleGrey"
                  />
                </div>
              ) : null
          }
        </div>

      </div>
      <div className="col-md-6">
        <div className="row">
          <div className={`col ${classes.NoSpace}`}>
            <CardsTitle title={<FormattedHTMLMessage id="Patents.Participants.applicant" />} />
          </div>
        </div>
        <div className="row">
          {
            (deposants.length > 1)
              ? (
                <div className={`col-md-6 ${classes.CardContainer}`}>
                  <CounterCard
                    counter={deposants.length}
                    title=""
                    label={<FormattedHTMLMessage id="Patents.Participants.applicant" />}
                    color="ScanRBlue"
                  />
                </div>
              ) : null
          }
          {
            deposants.map((dep, index) => {
              if (index < nbInventorsToShow) {
                return (
                  <div className={`col-md-6 ${classes.CardContainer}`}>
                    <EntityCard
                      data={dep}
                      showTitle={false}
                      className={classes.BGLightGrey}
                    />
                  </div>
                );
              }
              return null;
            })
          }
          {
            (deposants.length > nbInventorsToShow)
              ? (
                <div className={`col-md-6 ${classes.CardContainer}`}>
                  <CounterListCard
                    language={props.language}
                    data={deposants}
                    objectType="author"
                    limit={nbInventorsToShow}
                    roleKey="applicant"
                    labelKey="other-applicants"
                    modalTitleKey="applicants-modal-title"
                    color="MiddleGrey"
                    isEntity
                  />
                </div>
              ) : null
          }
        </div>
      </div>
    </div>
  );
};

export default PatentParticipants;

PatentParticipants.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  // affiliations: PropTypes.array,
};
