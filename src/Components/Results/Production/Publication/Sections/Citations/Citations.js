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

function parseCrossRef(item) {
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
}

function CrossRefCard({ item }) {
  return (
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
  );
}
CrossRefCard.propTypes = {
  item: PropTypes.object.isRequired,
};

function CrossRefList({ ids, lang, maxItems }) {
  const { data, isLoading, isError } = useCrossRef(ids);
  if (isLoading) return <SectionLoader />;
  if (isError) return <Errors error={500} />;
  if (data.length) {
    const publis = data.slice(0, maxItems).map(item => parseCrossRef(item));
    return (
      <div className="row">
        {publis.map(item => (<CrossRefCard key={item.doi} item={item} lang={lang} />))}
      </div>
    );
  }
  return null;
}

CrossRefList.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  lang: PropTypes.oneOf(['fr', 'en']).isRequired,
  maxItems: PropTypes.number,
};
CrossRefList.defaultProps = {
  maxItems: 6,
};

export default function Citations({ id: inputId, language: lang, direction }) {
  const citDir = (direction === 'references') ? 'cited' : 'citing';
  const id = inputId.replace(new RegExp('%252f', 'g'), '/').slice(3);
  const { data, isLoading, isError } = useOpenCitations(direction, id);
  if (isLoading) return <SectionLoader />;
  if (isError) return <Errors error={500} />;
  if (data.length) {
    return (
      <IntlProvider locale={lang} messages={messages[lang]}>
        <section id={direction} className="py-3">
          <div className="container">
            <SectionTitle
              icon="fa-folder-open"
              lexicon="PublicationSimilar"
              language={lang}
              title={<FormattedHTMLMessage id="Publication.references" values={{ count: data.length }} />}
            />
            <CrossRefList ids={data.map(obj => obj[citDir])} lang={lang} />
          </div>
        </section>
      </IntlProvider>
    );
  }
  return null;
}

Citations.propTypes = {
  language: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
