import React, { useState } from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import moment from 'moment';
import PropTypes from 'prop-types';
import Carto from '../Components/Carto';
import SimpleCard from '../../../../Shared/Ui/SimpleCard/SimpleCard';
import LogoCardWithButton from '../../../../Shared/Ui/LogoCardWithButton/LogoCardWithButton';
import classes from './Depots.scss';
import countries from '../countries.json';
import patentType from './patentType.json';


/**
 * Patent
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const PatentsApplications = (props) => {
  const patents = props.data;

  const [selected, setSelected] = useState((patents.length) ? patents[0] : {});

  const content = patents.sort((a, b) => a.applicationDate - b.applicationDate).map((item, i) => {
    let first = false;
    if (i > 0) {
      first = (props.data[i - 1].applicationDate !== item.applicationDate);
    }
    let select = '';
    if (item.id === selected.id) {
      select = classes.Selected;
    }
    return (
      <React.Fragment key={item.id}>
        {(i === 0 || first) ? <div className={classes.TitleYear}>{moment(props.data[i].applicationDate).format('L')}</div> : null}
        <div
          className={`${classes.Item} ${select}`}
          onClick={() => setSelected(item)}
          onKeyPress={() => setSelected(item)}
          role="button"
          tabIndex={0}
        >
          <p className={classes.Title}>
            {countries[props.language][item.office]}
          </p>
          <div className={`d-flex align-items-center justify-content-end ${classes.Type}`}>
            <p className="m-0">
              {(item.isPriority) ? <FormattedHTMLMessage id="Patent.Depots.priority" /> : null}
              {(item.label === 'priority' && (item.applicationDate)) ? ' - ' : null}
              {(item.grantedDate) && (<FormattedHTMLMessage id="Patent.Depots.delivered" />)}
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  });

  return (
    <React.Fragment>
      {
        (props.viewMode === 'graph')
          ? <Carto data={patents} language={props.language} />
          : (
            <React.Fragment>
              <div className="row">
                <div className="col-lg-5">
                  <div className={classes.ListOfProductions}>
                    {(content.length > 0) ? content : null}
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="row">
                    <div className={`col-md-12 ${classes.CardContainer}`}>
                      <LogoCardWithButton
                        url="/img/logos/logo-oeb.svg"
                        targetUrl={selected.links[0].url}
                        link={<FormattedHTMLMessage id="link_patent" />}
                        cssClass="Height100"
                      />
                    </div>
                    <div className={`col-md-6 ${classes.CardContainer}`}>
                      <SimpleCard
                        language={props.language}
                        logo="fas fa-fingerprint"
                        title={<FormattedHTMLMessage id="Patent.Depots.id" />}
                        label={selected.id}
                        tooltip=""
                      />
                    </div>
                    <div className={`col-md-6 ${classes.CardContainer}`}>
                      <SimpleCard
                        language={props.language}
                        logo="fas fa-fingerprint"
                        title={<FormattedHTMLMessage id="Patent.Depots.publicationNumber" />}
                        label={(selected.office).concat(selected.publicationNumber)}
                        tooltip=""
                      />
                    </div>
                    <div className={`col-md-6 ${classes.CardContainer}`}>
                      <SimpleCard
                        language={props.language}
                        logo="fas fa-calendar-day"
                        title={<FormattedHTMLMessage id="Patent.Depots.date" />}
                        label={moment(selected.applicationDate).format('L')}
                        tooltip=""
                      />
                    </div>
                    <div className={`col-md-6 ${classes.CardContainer}`}>
                      <SimpleCard
                        language={props.language}
                        logo="fas fa-calendar-day"
                        title={<FormattedHTMLMessage id="Patent.Depots.publicationDate" />}
                        label={moment(selected.publicationDate).format('L')}
                        tooltip=""
                      />
                    </div>
                    {
                      (selected.grantedDate) && (
                        <div className={`col-md-6 ${classes.CardContainer}`}>
                          <SimpleCard
                            language={props.language}
                            logo="fas fa-calendar-check"
                            title={<FormattedHTMLMessage id="Patent.Depots.granted" />}
                            label={<FormattedHTMLMessage id="Patent.Depots.grantedDate" values={{ date: moment(selected.grantedDate).format('L') }} />}
                            tooltip=""
                          />
                        </div>
                      )
                    }
                    <div className={`col-md-6 ${classes.CardContainer}`}>
                      <SimpleCard
                        language={props.language}
                        logo="fas fa-flag"
                        title={<FormattedHTMLMessage id="Patent.Depots.country" />}
                        label={countries[props.language][selected.office]}
                        tooltip=""
                      />
                    </div>
                    <div className={`col-md-6 ${classes.CardContainer}`}>
                      <SimpleCard
                        language={props.language}
                        logo="fas fa-lightbulb"
                        title={<FormattedHTMLMessage id="Patent.Depots.type" />}
                        label={patentType[props.language][selected.ipType]}
                        tooltip=""
                      />
                    </div>
                    <div className={`col-md-6 ${classes.CardContainer}`}>
                      <SimpleCard
                        language={props.language}
                        logo="fas fa-clipboard-list"
                        title={<FormattedHTMLMessage id="Patent.Depots.isPriority" />}
                        label={(selected.isPriority) ? (<i className={`fas fa-calendar-check fa-3x ${classes.Success}`} />) : (<i className={`fas fa-calendar-times fa-3x ${classes.Danger}`} />)}
                        tooltip=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )
      }
    </React.Fragment>
  );
};

export default PatentsApplications;

PatentsApplications.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  viewMode: PropTypes.string.isRequired,
};
