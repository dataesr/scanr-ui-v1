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

function parseCrossRef(items) {
  return items.map((item) => {
    const obj = {};
    obj.doi = item.DOI;
    if (item.title.length) {
      obj.title = item.title[0];
    }
    if (item.issued && item.issued['date-parts'].length && item.issued['date-parts'][0].length) {
      obj.date = item.issued['date-parts'][0][0];
    }
    if (item['container-title'] && item['container-title'].length) {
      obj.journal = item['container-title'][0];
    }
    if (item.author && item.author.length) {
      obj.num_authors = item.author.length;
      obj.authors = item.author.map(
        auth => `${(auth.given) ? `${auth.given} ` : ''}${(auth.family) ? auth.family : ''}`,
      );
    }
    return obj;
  });
}

function CrossRefList({ ids, language }) {
  const { data, isLoading, isError } = useCrossRef(ids);
  if (isLoading) return <SectionLoader />;
  if (isError) return <Errors error={500} />;
  if (data.length) {
    const publis = parseCrossRef(data);
    return (
      <div className="row">
        {
          publis.slice(0, 6).map(item => (
            <IntlProvider locale={language} messages={messages[language]}>
              <div key={item.DOI} className={`col-md-4 ${classes.CardContainer}`}>
                <article className={`d-flex flex-column ${classes.ResultCard} ${classes.CardWhite}`}>
                  <h3 className={`mb-auto pb-2 ${classes.CardTitle}`}>
                    {item.title || <FormattedHTMLMessage id="Publication.unknown" />}
                  </h3>
                  <ul className="m-0 p-0">
                    <li className="d-flex">
                      <div className={classes.Icons}>
                        <i aria-hidden="true" className="fas fa-users" />
                      </div>
                      <p className="m-0">
                        {
                          (item.num_authors && item.num_authors < 3)
                            ? item.authors.join(', ')
                            : (
                              <Fragment>
                                {`${item.authors[0]} `}
                                <FormattedHTMLMessage id="Publication.authors" values={{ count: item.num_authors }} />
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
                        {item.date || <FormattedHTMLMessage id="Publication.unknown" />}
                      </p>
                    </li>
                    <li className="d-flex">
                      <div className={classes.Icons}>
                        <i aria-hidden="true" className="fas fa-folder-open" />
                      </div>
                      <p className="m-0">
                        {item.journal || <FormattedHTMLMessage id="Publication.unknown" />}
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
}

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
