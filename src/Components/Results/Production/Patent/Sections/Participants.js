import React from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import CounterCard from '../../../../Shared/Ui/CounterCard/CounterCard';
import SectionTitle from '../../../Shared/SectionTitle';
import BackgroundAuthors from '../../../../Shared/images/poudre-orange-Fbleu-BR.jpg';
import classes from '../Patents.scss';

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

  const inventors = props.data.filter(auth => auth.role === 'inventeur');
  const deposants = props.data.filter(auth => auth.role === 'deposant');

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
            {
              (inventors && inventors.length > 0)
                ? (
                  <div className={`col-md-3 ${classes.CardContainer}`}>
                    <CounterCard
                      counter={inventors.length}
                      title=""
                      label={messages[props.language]['Patents.inventors.inventor']}
                      color="Persons"
                    />
                  </div>
                ) : null
            }
            {
              (deposants && deposants.length > 0)
                ? (
                  <div className={`col-md-3 ${classes.CardContainer}`}>
                    <CounterCard
                      counter={deposants.length}
                      title=""
                      label={messages[props.language]['Patents.inventors.applicant']}
                      color="Persons"
                    />
                  </div>
                ) : null
            }
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
};
