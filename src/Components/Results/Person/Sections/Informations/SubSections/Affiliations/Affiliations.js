import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import moment from 'moment';

import SubmitBox from '../../../../../../Shared/SubmitBox/SubmitBox';
import LeafletMap from '../../../../../../Shared/GraphComponents/Graphs/LeafletMap';
import getSelectKey from '../../../../../../../Utils/getSelectKey';

import classes from './Affiliations.scss';

import messagesFr from '../../../../translations/fr.json';
import messagesEn from '../../../../translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

/**
 * Affiliations
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Affiliations = (props) => {
  if (props.data) {
    const mapdata = [];
    props.data.forEach((aff) => {
      try {
        const dataElement = {
          id: aff.structure.id,
          position: [aff.structure.address[0].gps.lat, aff.structure.address[0].gps.lon],
          infos: [getSelectKey(aff.structure, 'label', props.language, 'default')],
        };
        mapdata.push(dataElement);
      } catch (error) {
        // eslint-disable-no-empty
      }
    });
    const mapStyle = {
      height: '32.5vh',
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '10px',
      borderBottom: '5px solid #ffd138',
    };
    const testAffs = {};
    const affYears = props.data.map((aff) => {
      const endDate = moment(aff.endDate).format('YYYY');
      return endDate;
    });
    affYears.forEach((year) => {
      testAffs[year] = [];
    });
    props.data.forEach((aff) => {
      const affiliation = { ...aff };
      affiliation.endDate = moment(aff.endDate).format('YYYY');
      affiliation.startDate = moment(aff.startDate).format('YYYY');
      testAffs[affiliation.endDate].push(affiliation);
    });
    const orderedYears = Object.keys(testAffs).sort((a, b) => b - a);

    return (
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <React.Fragment>
          {(props.modifyMode) ? <SubmitBox language={props.language} masterKey={props.masterKey} label={getSelectKey(props.allData, 'label', props.language, 'fr')} /> : null}
          <section className="container-fluid">
            <div className="row">
              <div className={`col-12 ${classes.CardContainer}`}>
                <div className={classes.SubSectionTitle}>
                  <FormattedHTMLMessage id="Person.informations.affiliation.title" defaultMessage="Person.informations.affiliation.title" />
                </div>
                <div className="w-100">
                  <LeafletMap
                    filename="carto"
                    data={mapdata}
                    language={props.language}
                    style={mapStyle}
                  />
                </div>
                <div className={`w-100 ${classes.AffiliationsList}`}>
                  {
                    orderedYears.map(year => (
                      <div className="d-flex">
                        <div className={`pl-2 pt-4 ${classes.AffiliationYears}`}>
                          {year}
                        </div>
                        <div className={`${classes.vl}`} />
                        <div className={`d-flex flex-column pt-3 pb-3 w-100 ${classes.AffiliationItem}`}>
                          {
                            testAffs[year].map(struct => (
                              <div key={JSON.stringify(struct)} className="d-flex pl-2 pr-2 pb-2 align-items-center">
                                <div className="d-flex flex-column mr-auto">
                                  <p className={`m-0 ${classes.AffiliationTitle}`}>
                                    {getSelectKey(struct.structure, 'label', props.language, 'default')}
                                  </p>
                                  <p className={`m-0 ${classes.AffiliationYears}`}>
                                    <FormattedHTMLMessage id="Person.informations.affiliation.foundIn" defaultMessage="Person.informations.affiliation.foundIn" />
                                    {`${struct.sources.length} productions`}
                                  </p>
                                </div>
                                <a href={`/entite/${struct.structure.id}`} className={`align-self-start ml-3 mr-3 btn ${classes.btn_scanrBlue}`}>
                                  <i className="fas fa-arrow-right" aria-hidden="true" />
                                </a>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      </IntlProvider>
    );
  }
  return null;
};

export default Affiliations;

Affiliations.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.array,
  masterKey: PropTypes.string, // Utilisée pour le mode modifier/enrichir
  modifyMode: PropTypes.bool,
  allData: PropTypes.object.isRequired,
};
