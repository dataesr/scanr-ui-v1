import React from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import SectionTitle from '../../../Shared/SectionTitle';
import SummaryCard from '../../Shared/SummaryCard/SummaryCard';
import SimpleCard from '../../../../Shared/Ui/SimpleCard/SimpleCard';
import SimpleCardWithButton from '../../../../Shared/Ui/SimpleCardWithButton/SimpleCardWithButton';
import TagCard from '../../../../Shared/Ui/TagCard/TagCard';
import Background from '../../../../Shared/images/poudre-bleu_Fgris-B.jpg';

import classes from '../Patents.scss';

import getSelectKey from '../../../../../Utils/getSelectKey';

/* Gestion des langues */
import messagesFr from '../translations/fr.json';
import messagesEn from '../translations/en.json';

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
const PatentIdentity = (props) => {
  if (!props.data) {
    return <div>null</div>;
  }
  const sectionStyle = {
    backgroundImage: `url(${Background})`,
  };
  // const sectionStyleAffiliations = {
  //   backgroundImage: `url(${BackgroundAffiliations})`,
  // };
  // const sectionStyleSimilarProductions = {
  //   backgroundImage: `url(${BackgroundSimilarProductions})`,
  // };
  const id = props.data.id;
  const publicationDate = moment(props.data.publicationDate).format('L');
  const submissionDate = moment(props.data.submissionDate).format('L');
  const summary = getSelectKey(props.data, 'summary', props.language, 'default');
  const patentLink = 'https://worldwide.espacenet.com/'.concat({ id }.id);
  const keywords = props.data.domains.filter(dom => dom.level === 'classe').map(el => el.label.default);


  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section className={`container-fluid ${classes.Thesis}`} style={sectionStyle} id="Thesis">
        <div className="container">
          <SectionTitle
            icon="fa-id-card"
            objectType="productions"
            language={props.language}
            id={props.id}
            title={messages[props.language]['Patent.title']}
          />
          <div className="row">
            <div className="col-lg">
              <div className="row">
                <div className={`col-12 ${classes.CardContainer}`}>
                  <SimpleCard
                    language={props.language}
                    logo="fas fa-id-card"
                    title={messages[props.language]['Patent.patent.title']}
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
                    title={messages[props.language]['Patent.patent.id']}
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
                    title={messages[props.language]['Patent.patent.submissionDate']}
                    label={submissionDate}
                    tooltip=""
                  />
                </div>
                <div className={`col-md-6 ${classes.CardContainer}`}>
                  <SimpleCard
                    language={props.language}
                    logo="fas fa-calendar-day"
                    title={messages[props.language]['Patent.patent.publicationDate']}
                    label={publicationDate}
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
                        title={messages[props.language]['Patent.summary.title']}
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
                        title={messages[props.language]['Patent.patent.tags']}
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
        </div>
      </section>
    </IntlProvider>
  );
};

export default PatentIdentity;

PatentIdentity.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
