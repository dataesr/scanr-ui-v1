import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';

import ButtonWithModal from '../../../../Shared/Ui/Buttons/ButtonWithModal';
import PersonCard from '../../../../Search/Results/ResultCards/PersonCard';
import classes from './CoAuthors.scss';

/**
 * CoAuthors
 * Url : /person/:id
 * Description : A Section that present all coAuthors of the person.
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
      <FormattedHTMLMessage id="Person.coAuthors.more" defaultMessage="Person.coAuthors.more" />
    </p>
    <ButtonWithModal
      logo="fas fa-expand"
      title={<FormattedHTMLMessage id="Person.coAuthors.all" />}
      buttonLabel={<FormattedHTMLMessage id="Person.Global.seeAll" />}
      dataHtml={coAuthorsHtlm}
    />
  </li>
);

const CoAuthors = (props) => {
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
      <ul className={`${classes.noListStyle} d-flex flex-wrap justify-content-between align-content-stretch p-0 m-0`}>
        {CountCard(props.data.length)}
        {(coAuthorsList.length > 7) ? coAuthorsList.slice(-6) : coAuthorsList}
        {(coAuthorsList.length > 7) ? SeeMoreCard(coAuthorsList, coAuthorsListModal) : null}
      </ul>
    );
  }
  return (
    <div className="row">
      <div className={`d-flex pl-4 pr-4 ${classes.noDataOnSection}`}>
        <FormattedHTMLMessage id="Person.coAuthors.noCoAuthors" defaultMessage="Person.coAuthors.noCoAuthors" />
      </div>
    </div>
  );
};

export default CoAuthors;

CoAuthors.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.array,
};
