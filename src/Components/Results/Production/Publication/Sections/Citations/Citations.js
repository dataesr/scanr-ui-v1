import React, { Fragment } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import useOpenCitations from '../../../../../../Hooks/useOpenCitations';
import useCrossRef from '../../../../../../Hooks/useCrossRef';
import SectionLoader from '../../../../../Shared/LoadingSpinners/GraphSpinner';
import Errors from '../../../../../Shared/Errors/Errors';
import SectionTitle from '../../../../Shared/SectionTitle';
// import getSelectedKey from '../../../../../../Utils/getSelectKey';
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './Citations.scss';
/**
 * Citations
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const messages = { fr: messagesFr, en: messagesEn };

const CrossRefList = ({ ids, language }) => {
  const { data, isLoading, isError } = useCrossRef(ids);
  if (isLoading) return <SectionLoader />;
  if (isError) return <Errors error={500} />;
  if (data.length) {
    return (
      <div className="row">
        {
          data.slice(0, 6).map(item => (
            <IntlProvider locale={language} messages={messages[language]}>
              <div key={item.DOI} className={`col-md-4 ${classes.CardContainer}`}>
                <article className={`d-flex flex-column ${classes.ResultCard} ${classes.CardWhite}`}>
                  <h3 className={`mb-auto pb-2 ${classes.CardTitle}`}>
                    {(item.title && item.title.length) && item.title[0]}
                  </h3>
                  <ul className="m-0 p-0">
                    <li className="d-flex">
                      <div className={classes.Icons}>
                        <i aria-hidden="true" className="fas fa-users" />
                      </div>
                      <p className="m-0">
                        {
                          (item.author && item.author.length < 3)
                            ? item.author.map(auth => `${auth.given} ${auth.family}`)
                            : (
                              <Fragment>
                                {`${item.author[0].given} ${item.author[0].family} `}
                                <FormattedHTMLMessage id="Publication.authors" values={{ count: item.author.length }} />
                              </Fragment>
                            )
                        }

                      </p>
                    </li>
                    <li className="d-flex">
                      <div className={classes.Icons}>
                        <i aria-hidden="true" className="fas fa-calendar" />
                      </div>
                      <p className="m-0">
                        {item.issued && item.issued['date-parts'][0][0]}
                      </p>
                    </li>
                    <li className="d-flex">
                      <div className={classes.Icons}>
                        <i aria-hidden="true" className="fas fa-folder-open" />
                      </div>
                      <p className="m-0">
                        {item['container-title'][0]}
                      </p>
                    </li>
                  </ul>
                  <a href={`https://doi.org/${item.DOI}`} className="ml-auto my-1">
                    <FormattedHTMLMessage id="Publication.seeMore" />
                  </a>
                </article>
              </div>
            </IntlProvider>
          ))
        }
      </div>
    );
  }
  return null;
};

CrossRefList.propTypes = {
  ids: PropTypes.array.isRequired,
  language: PropTypes.string.isRequired,
};

const Citations = (props) => {
  const id = props.id.replace(new RegExp('%252f', 'g'), '/').slice(3);
  const { data: citations, isLoading: isLoadingCits, isError: isErrorCits } = useOpenCitations('citations', id);
  const { data: references, isLoading: isLoadingRefs, isError: isErrorRefs } = useOpenCitations('references', id);
  if (isLoadingRefs || isLoadingCits) return <SectionLoader />;
  if (isErrorRefs || isErrorCits) return <Errors error={500} />;
  const refs = (references.length)
    ? (
      <section id="References" className="py-3">
        <div className="container">
          <SectionTitle
            icon="fa-folder-open"
            lexicon="PublicationSimilar"
            language={props.language}
            title={<FormattedHTMLMessage id="Publication.references" values={{ count: references.length }} />}
          />
          <CrossRefList ids={references.map(ref => ref.cited)} language={props.language} />
        </div>
      </section>
    )
    : null;
  const cits = (citations.length)
    ? (
      <section id="Citations" className="py-3">
        <div className="container">
          <SectionTitle
            icon="fa-folder-open"
            lexicon="PublicationSimilar"
            language={props.language}
            title={<FormattedHTMLMessage id="Publication.citations" values={{ count: citations.length }} />}
          />
          <CrossRefList ids={citations.map(ref => ref.citing)} language={props.language} />
        </div>
      </section>
    )
    : null;
  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <Fragment>
        {cits}
        {refs}
      </Fragment>
    </IntlProvider>
  );
};
export default Citations;

Citations.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
