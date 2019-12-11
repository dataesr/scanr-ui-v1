import React from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import PersonCard from '../../../../Shared/Ui/PersonCard/PersonCard';
import EntityCard from '../../../../Shared/Ui/EntityCard/EntityCard';
import SectionTitle from '../../../Shared/SectionTitle';
import CardsTitle from '../../../../Shared/Ui/CardsTitle/CardsTitle';
import CounterCard from '../../../../Shared/Ui/CounterCard/CounterCard';
import CounterListCard from '../../../../Shared/Ui/CounterListCard/CounterListCard';

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
    const [label, country] = auth.fullName.split('__');
    return { label, country: countries[props.language][country] };
  });

  const nbInventorsToShow = 4;

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section className={`container-fluid ${classes.AuthorsSection}`} style={sectionStyleAuthors} id="Authors">
        <div className="container">
          <SectionTitle
            icon="fa-user-friends"
            lexicon="PatentParticipant"
            objectType="publications"
            language={props.language}
            id={props.id}
            title={messages[props.language]['Patents.inventors.title']}
          />
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className={`col ${classes.NoSpace}`}>
                  <CardsTitle title={messages[props.language]['Patents.inventors.inventor']} />
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
                          label={messages[props.language]['Patents.inventors.inventor']}
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
                          color="Default"
                        />
                      </div>
                    ) : null
                }
              </div>

            </div>
            <div className="col-md-6">
              <div className="row">
                <div className={`col ${classes.NoSpace}`}>
                  <CardsTitle title={messages[props.language]['Patents.inventors.applicant']} />
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
                          label={messages[props.language]['Patents.inventors.applicant']}
                          color="Entity"
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
                          color="Default"
                          isEntity
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

export default PatentParticipants;

PatentParticipants.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  // affiliations: PropTypes.array,
};
