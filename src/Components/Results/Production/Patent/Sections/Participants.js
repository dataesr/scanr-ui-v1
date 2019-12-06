import React from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import CounterCard from '../../../../Shared/Ui/CounterCard/CounterCard';
import PersonCard from '../../../../Shared/Ui/PersonCard/PersonCard';
import SectionTitle from '../../../Shared/SectionTitle';
import BackgroundAuthors from '../../../../Shared/images/poudre-orange-Fbleu-BR.jpg';
import classes from '../Patents.scss';
import countries from '../countries.json';

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
const PatentParticipants = (props) => {
  if (!props.data) {
    return <div>null</div>;
  }
  const sectionStyleAuthors = {
    backgroundImage: `url(${BackgroundAuthors})`,
  };

  const inventors = props.data.filter(auth => auth.role === 'inventeur').map((auth) => {
    const [fullName, country] = auth.fullName.split('__');
    return { fullName, country: countries[props.language][country] };
  });
  const deposants = props.data.filter(auth => auth.role === 'deposant').map((auth) => {
    const [fullName, country] = auth.fullName.split('__');
    return { fullName, country: countries[props.language][country] };
  });
  const nbDeposants = deposants.length;
  const nonIdentifiedDeposants = deposants.filter(dep => (!dep.affiliations || dep.affiliations.length === 0))


  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section className={`container-fluid ${classes.AuthorsSection}`} style={sectionStyleAuthors} id="Authors">
        <div className="container">
          <SectionTitle
            icon="fa-open-folder"
            objectType="publications"
            language={props.language}
            id={props.id}
            title={messages[props.language]['Patents.inventors.title']}
          />
          <div className="row">
            <div className={`col-md-6 ${classes.CardContainer}`}>
              <div className="container">
                <div className={`row ${classes.GridHeader}`}>
                  {messages[props.language]['Patents.inventors.inventor']}
                </div>
                <div className="row">
                  {
                    (inventors && inventors.length > 0)
                      ? inventors.map(inventor => (
                        <div className={`col-md-6 ${classes.CardContainer}`}>
                          <PersonCard
                            data={inventor}
                            showTitle={false}
                          />
                        </div>
                      ))
                      : null
                  }
                </div>
              </div>
            </div>
            <div className={`col-md-6 ${classes.CardContainer}`}>
              <div className="container">
                <div className={`row ${classes.GridHeader}`}>
                  {messages[props.language]['Patents.inventors.applicant']}
                </div>
                <div className="row">
                  {
                    (deposants && deposants.length > 0)
                      ? deposants.map(dep => (
                        <div className={`col-md-6 ${classes.CardContainer}`}>
                          <PersonCard
                            data={dep}
                            showTitle={false}
                          />
                        </div>
                      ))
                      : null
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </IntlProvider>
  );
};

export default PatentParticipants;

PatentParticipants.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  affiliations: PropTypes.array,
};
