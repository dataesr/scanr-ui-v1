import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import moment from 'moment';

import LeafletMap from '../../../../../../Shared/GraphComponents/Graphs/LeafletMap';
import getSelectKey from '../../../../../../../Utils/getSelectKey';
import CardsTitle from '../../../../../../Shared/Ui/CardsTitle/CardsTitle';

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
  // ADD ROLES in AFFILIATIONS!
  // const addRoles = props.roles.map((role) => {
  //
  // })
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
    /*
    const affYears = props.data.map((aff) => {
      const endDate = moment(aff.endDate).format('YYYY');
      return endDate;
    });
    affYears.forEach((year) => {
      testAffs[year] = [];
    });
    */
    props.data.forEach((aff) => {
      const affiliation = { ...aff };
      affiliation.endDate = moment(aff.endDate).format('YYYY');
      affiliation.startDate = moment(aff.startDate).format('YYYY');
      if (affiliation.sources.length === 1) {
        affiliation.subLabel = affiliation.sources.length.toString().concat(' ', 'production');
      } else {
        affiliation.subLabel = affiliation.sources.length.toString().concat(' ', 'productions');
      }
      const key = affiliation.startDate.concat('-', affiliation.endDate);
      if (!(key in testAffs)) {
        testAffs[key] = [];
      }
      testAffs[key].push(affiliation);
    });
    if (props.data.roles) {
      props.data.roles.forEach((role) => {
        const affiliation = {};
        affiliation.startDate = moment(role.startDate).format('YYYY');
        if (role.endDate) {
          affiliation.endDate = moment(role.endDate).format('YYYY');
        } else {
          affiliation.endDate = '\n...';
        }
        affiliation.sources = [];
        affiliation.subLabel = role.role;
        const structure = {};
        structure.id = role.description.split('__idstructure__')[1];
        structure.label = { default: role.description.split('__idstructure__')[0] };
        affiliation.structure = structure;
        const key = affiliation.startDate.concat('-', affiliation.endDate);
        if (!(key in testAffs)) {
          testAffs[key] = [];
        }
        testAffs[key].push(affiliation);
      });
    }
    const orderedYears = Object.keys(testAffs).sort((a, b) => b.replace('-', '') - a.replace('-', ''));
    return (
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <React.Fragment>
          <section className="container-fluid">
            <div className="row">
              <div className={`col ${classes.NoSpace}`}>
                <CardsTitle title={messages[props.language]['Person.informations.affiliation.title']} />
              </div>
            </div>
            <div className="row">
              <div className={`col-12 ${classes.CardContainer}`}>
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
                      <div className="d-flex" key={year}>
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
                                    {`${struct.subLabel}`}
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
  data: PropTypes.object,
};
