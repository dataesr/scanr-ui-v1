import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';

import SectionTitle from '../../../../Shared/Results/SectionTitle/SectionTitle';
import ButtonToPage from '../../../../Shared/Ui/Buttons/ButtonToPage';
import ButtonWithModal from '../../../../Shared/Ui/Buttons/ButtonWithModal';
import SubmitBox from '../../../../Shared/SubmitBox/SubmitBox';

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
const SeeMoreCard = coAuthorsList => (
  <li className={`p-3 mb-2 d-flex flex-column ${classes.SeeMoreCard} ${classes.Card} ${classes.OneFourth}`}>
    <p>
      {coAuthorsList.length - 6}
      de plus
    </p>
    <ButtonWithModal
      logo=""
      title="hello"
      buttonLabel="world"
      dataHtml={coAuthorsList}
    />
  </li>
);

const CoAuthors = (props) => {
  const bgUrl = './img/poudre-projects_fond_gris.jpg';
  const sectionStyle = {
    backgroundImage: `url(${bgUrl})`,
  };
  if (props.data) {
    const coAuthorsList = props.data.map(coAuthors => (
      <li key={coAuthors.id} className={`p-3 mb-2 d-flex flex-column ${classes.PersonCard} ${classes.Card} ${classes.OneFourth}`}>

        <div className="mb-auto">{coAuthors.fullName}</div>
        <ButtonToPage
          className={`${classes.Component_dark} ml-5 mr-5`}
          url={`/person/${coAuthors.id}`}
        >
          {messages[props.language]['Person.authorsLink']}
        </ButtonToPage>
      </li>
    ));
    return (
      <section className={`container-fluid ${classes.CoAuthors}`} style={sectionStyle}>
        <IntlProvider locale={props.language} messages={messages[props.language]}>
          <div className="container">
            <SectionTitle
              icon="fas fa-id-card"
              modifyModeHandle={props.modifyModeHandle}
              modifyModeKey="coAuthors"
              modifyMode={props.modifyMode}
            >
              <FormattedHTMLMessage id="Person.coAuthors.title" defaultMessage="Person.coAuthors.title" />
            </SectionTitle>
            {
              (props.modifyMode)
                ? (
                  <SubmitBox
                    language={props.language}
                    masterKey="Person/title"
                    label="empty"
                    emptySection
                    autoLaunch={props.modifyMode}
                    modifyModeHandle={props.modifyModeHandle}
                  />
                )
                : null
            }
            <ul className="d-flex flex-wrap justify-content-between align-content-stretch p-0 m-0">
              {CountCard(props.data.length)}
              {(coAuthorsList.length > 6) ? coAuthorsList.slice(-6) : coAuthorsList}
              {(coAuthorsList.length > 6) ? SeeMoreCard(coAuthorsList) : null}
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
            icon="fas fa-id-card"
            modifyModeHandle={props.modifyModeHandle}
            modifyModeKey="participants"
            modifyMode={props.modifyMode}
          >
            <FormattedHTMLMessage id="Person.coAuthors.title" defaultMessage="Person.coAuthors.title" />
          </SectionTitle>
          {
            (props.modifyMode)
              ? (
                <SubmitBox
                  language={props.language}
                  masterKey="Person/coAuthors"
                  label="empty"
                  emptySection
                  autoLaunch={props.modifyMode}
                  modifyModeHandle={props.modifyModeHandle}
                />
              )
              : null
          }
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
  modifyModeHandle: PropTypes.func.isRequired,
  modifyMode: PropTypes.bool.isRequired,
};
