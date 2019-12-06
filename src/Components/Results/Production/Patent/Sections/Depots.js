import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import moment from 'moment';
import PropTypes from 'prop-types';
import SectionTitleViewMode from '../../../Shared/SectionTitle';
import Carto from '../Components/Map';
import SimpleCard from '../../../../Shared/Ui/SimpleCard/SimpleCard';
import SimpleCardWithButton from '../../../../Shared/Ui/SimpleCardWithButton/SimpleCardWithButton';
import classes from './Depots.scss';
/* Gestion des langues */
import messagesFr from '../translations/fr.json';
import messagesEn from '../translations/en.json';
import countries from '../countries.json';
import patentType from './patentType.json';


const messages = {
  fr: messagesFr,
  en: messagesEn,
};


/**
 * Patent
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const PatentsApplications = (props) => {
  if (!props.data) {
    return <div>null</div>;
  }

  const patents = [];
  props.data.forEach((patent) => {
    const [country, type] = patent.type.split('__');
    const newPatent = { ...patent, country, type };
    patents.push(newPatent);
  });

  const [viewMode, setViewMode] = useState('list');
  const [selected, setSelected] = useState((patents.length) ? patents[0] : {});


  const content = patents.map((item, i) => {
    let first = false;
    if (i > 0) {
      first = (moment(props.data[i - 1].url).format('DD-MM-YYYY') !== moment(item.url).format('DD-MM-YYYY'));
    }
    let select = '';
    if (item.id === selected.id) {
      select = classes.Selected;
    }
    return (
      <React.Fragment key={item.id}>
        {
          (i === 0 || first)
            ? (
              <div className={classes.TitleYear}>
                {
                  moment(item.url).format('DD-MM-YYYY')
                }
              </div>
            )
            : null
        }
        <div
          className={`${classes.Item} ${select}`}
          onClick={() => setSelected(item)}
          onKeyPress={() => setSelected(item)}
          role="button"
          tabIndex={0}
        >
          <p className={classes.Title}>
            {item.id}
          </p>
          <div className={`d-flex align-items-center justify-content-end ${classes.Type}`}>
            <p className="m-0">
              {countries[props.language][item.country]}
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  });

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section className={`container-fluid ${classes.DepotSection}`} id="Authors">
        <div className="container">
          <SectionTitleViewMode
            icon="fa-folder-open"
            objectType="productions"
            language={props.language}
            id={props.id}
            title={messages[props.language]['Patent.depots.title']}
            viewModeClickHandler={view => setViewMode(view)}
            viewMode={viewMode}
          />
          <hr />
          {
            (viewMode === 'graph')
              ? <Carto />
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
                        <div className={`col-md-6 ${classes.CardContainer}`}>
                          <SimpleCardWithButton
                            language={props.language}
                            logo="fas fa-id-card"
                            title={messages[props.language]['Patent.patent.id']}
                            label={selected.id}
                            tooltip=""
                            url={'https://worldwide.espacenet.com/patent/search?q='.concat(selected.id)}
                            link="link_patent"
                          />
                        </div>
                        <div className={`col-md-6 ${classes.CardContainer}`}>
                          <SimpleCard
                            language={props.language}
                            logo="fas fa-calendar-day"
                            title={messages[props.language]['Patent.depots.date']}
                            label={moment(selected.url).format('DD-MM-YYYY')}
                            tooltip=""
                          />
                        </div>
                        <div className={`col-md-6 ${classes.CardContainer}`}>
                          <SimpleCard
                            language={props.language}
                            logo="fas fa-calendar-day"
                            title={messages[props.language]['Patent.depots.country']}
                            label={countries[props.language][selected.country]}
                            tooltip=""
                          />
                        </div>
                        <div className={`col-md-6 ${classes.CardContainer}`}>
                          <SimpleCard
                            language={props.language}
                            logo="fas fa-clipboard-list"
                            title={messages[props.language]['Patent.depots.type']}
                            label={patentType[props.language][selected.type]}
                            tooltip=""
                          />
                        </div>
                        <div className={`col-md-6 ${classes.CardContainer}`}>
                          <SimpleCard
                            language={props.language}
                            logo="fas fa-clipboard-list"
                            title={messages[props.language]['Patent.depots.isPriority']}
                            label={(selected.label === 'priority') ? (<i className={`fas fa-check-circle fa-3x ${classes.Success}`} />) : (<i className={`fas fa-times-circle fa-3x ${classes.Danger}`} />)}
                            tooltip=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )
          }
        </div>
      </section>
    </IntlProvider>
  );
};

export default PatentsApplications;

PatentsApplications.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};
