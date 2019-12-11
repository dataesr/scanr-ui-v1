import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';

import SectionTitle from '../../../Shared/SectionTitle';
import ButtonWithModal from '../../../../Shared/Ui/Buttons/ButtonWithModal';
import PersonCard from '../../../../Search/SearchResults/ResultCards/PersonCard';
import classes from './CoAuthors.scss';
import messagesFr from '../../translations/fr.json';
import messagesEn from '../../translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};
/**
 * CoAuthors
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const CountCard = coAuthorsCount => (
  <li className={`p-3 mb-2 d-flex flex-column ${classes.CountCard} ${classes.Card} ${classes.OneFourth}`}>
    {coAuthorsCount}
    <FormattedHTMLMessage id="Person.coAuthors.title" defaultMessage="Person.coAuthors.title" />
  </li>
);
const SeeMoreCard = (coAuthorsList, coAuthorsHtlm) => (
  <li className={`p-3 mb-2 d-flex flex-column ${classes.SeeMoreCard} ${classes.Card} ${classes.OneFourth}`}>
    <p className={classes.SeeMore}>
      {coAuthorsList.length - 6}
      <FormattedHTMLMessage id="Person.more" defaultMessage="Person.more" />
    </p>
    <ButtonWithModal
      logo="fas fa-expand"
      title={<FormattedHTMLMessage id="Person.coAuthors.all" defaultMessage="Person.coAuthors.all" />}
      buttonLabel={<FormattedHTMLMessage id="Person.seeAll" defaultMessage="Person.seeAll" />}
      dataHtml={coAuthorsHtlm}
    />
  </li>
);

const CoAuthors = (props) => {
  const bgUrl = './img/poudre-persons_fond_gris.jpg';
  const sectionStyle = {
    backgroundImage: `url(${bgUrl})`,
  };
  if (props.data) {
    const coAuthorsList = props.data.map(coAuthors => (
      <li key={coAuthors.id} className={classes.OneFourth}>
        <PersonCard
          language={props.language}
          data={coAuthors}
          small
          onlyExisting
        />
      </li>
    ));
    const coAuthorsListModal = (
      <ul className={`${classes.noListStyle} d-flex flex-column justify-content-between align-content-stretch p-0 m-0`}>
        {
          props.data.map(coAuthors => (
            <li key={coAuthors.id} className={classes.OneFourth}>
              <PersonCard
                language={props.language}
                data={coAuthors}
                small
                onlyExisting
              />
            </li>
          ))
        }
      </ul>
    );
    if (coAuthorsList.length < 7) {
      while (coAuthorsList.length < 7) {
        coAuthorsList.push(<li key={coAuthorsList.length} className={classes.OneFourth} />);
      }
    }
    return (
      <section className={`container-fluid ${classes.CoAuthors}`} style={sectionStyle}>
        <IntlProvider locale={props.language} messages={messages[props.language]}>
          <div className="container">
            <SectionTitle
              icon="fa-folder-open"
              lexicon="PersonCollab"
              objectType="persons"
              language={props.language}
              id={props.id}
              title={messages[props.language]['Person.coAuthors.title']}
            />
            <ul className={`${classes.noListStyle} d-flex flex-wrap justify-content-between align-content-stretch p-0 m-0`}>
              {CountCard(props.data.length)}
              {(coAuthorsList.length > 7) ? coAuthorsList.slice(-6) : coAuthorsList}
              {(coAuthorsList.length > 7) ? SeeMoreCard(coAuthorsList, coAuthorsListModal) : null}
            </ul>
          </div>
        </IntlProvider>
      </section>
    );
  }
  return (
    <section className={`container-fluid ${classes.CoAuthors}`} style={sectionStyle}>
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <div className="container">
          <SectionTitle
            icon="fa-open"
            objectType="structures"
            language={props.language}
            id={props.id}
            title={messages[props.language]['Person.coAuthors.title']}
          />
          <div className="row">
            <div className={`d-flex pl-4 pr-4 ${classes.noDataOnSection}`}>
              <FormattedHTMLMessage id="Person.coAuthors.noCoAuthors" defaultMessage="Person.coAuthors.noCoAuthors" />
            </div>
          </div>
        </div>
      </IntlProvider>
    </section>
  );
};

export default CoAuthors;

CoAuthors.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.array,
  id: PropTypes.string.isRequired,
};
