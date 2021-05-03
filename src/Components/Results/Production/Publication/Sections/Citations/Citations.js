import React, { Fragment } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import useOpenCitations from '../../../../../../Hooks/useOpenCitations';
import useUnpaywall from '../../../../../../Hooks/useUnpaywall';
import SectionLoader from '../../../../../Shared/LoadingSpinners/GraphSpinner';
import Errors from '../../../../../Shared/Errors/Errors';
import SectionTitle from '../../../../Shared/SectionTitle';
import CountCardWithModal, { CountCardModalItem } from '../../../../../Shared/Ui/CountCardWithModal/CountCardWithModal';
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

function UnpaywallCard({ item }) {
  const authors = item.z_authors && item.z_authors.map(
    auth => `${(auth.given) ? `${auth.given} ` : ''}${(auth.family) ? auth.family : ''}`,
  );
  return (
    <article key={item.doi} className={`d-flex flex-column ${classes.ResultCard} ${classes.CardWhite}`}>
      <h3 className={`mb-auto pb-2 ${classes.CardTitle}`}>
        {item.title || <FormattedHTMLMessage id="Publication.unknown" />}
      </h3>
      <ul className="m-0 p-0">
        <li className="d-flex">
          <div className={classes.Icons}>
            <i aria-hidden="true" className="fas fa-users" />
          </div>
          <p className="m-0">
            {(authors && authors.length < 3) && authors.join(', ')}
            {(authors && authors.length >= 3) && (
              <Fragment>
                {`${authors.length && authors[0]} `}
                <FormattedHTMLMessage id="Publication.authors" values={{ count: authors.length }} />
              </Fragment>
            )}
          </p>
        </li>
        <li className="d-flex">
          <div className={classes.Icons}>
            <i aria-hidden="true" className="fas fa-calendar" />
          </div>
          <p className="m-0">
            {item.published_date}
          </p>
        </li>
        <li className="d-flex">
          <div className={classes.Icons}>
            <i aria-hidden="true" className="fas fa-folder-open" />
          </div>
          <p className="m-0">
            {item.journal_name}
          </p>
        </li>
      </ul>
      <div className="d-flex justify-content-between mt-3 mb-1">
        {
          item.is_oa ? (
            <a
              className="d-flex align-items-center"
              href={item.best_oa_location.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="mr-2"
                src="./img/oa/oa_open.svg"
                alt=""
                aria-hidden
                style={{ maxHeight: '20px' }}
              />
              <FormattedHTMLMessage id="Publication.accessOpen" />
            </a>
          )
            : (
              <p className="m-0 d-flex align-items-center">
                <img
                  className="mr-2"
                  src="./img/oa/oa_close.svg"
                  alt=""
                  aria-hidden
                  style={{ maxHeight: '20px' }}
                />
                <FormattedHTMLMessage id="Publication.accessClose" />
              </p>
            )
        }
        <a href={`https://doi.org/${item.doi}`} target="_blank" rel="noopener noreferrer">
          <FormattedHTMLMessage id="Publication.seeMore" />
        </a>
      </div>
    </article>
  );
}
UnpaywallCard.propTypes = {
  item: PropTypes.object.isRequired,
};

function UnpaywallList({
  ids,
  lang,
  maxItems,
  direction,
}) {
  const { data, isLoading } = useUnpaywall(ids);
  const publicationCount = (ids.length - maxItems >= 0) ? ids.length - maxItems : 0;
  if (isLoading) return <SectionLoader />;
  if (data.length) {
    const publis = data.slice(0, maxItems);
    const rest = data.slice(maxItems);
    const title = rest && <FormattedHTMLMessage id="Publication.reste" values={{ count: publicationCount }} />;
    const others = rest && <FormattedHTMLMessage id="Publication.list" />;
    return (
      <div className="row">
        {publis.map(item => (
          <div key={item.doi} className={`col-md-4 ${classes.CardContainer}`}>
            <UnpaywallCard item={item} lang={lang} />
          </div>
        ))}
        {
          (rest.length)
            ? (
              <div className={`col-md-4 ${classes.CardContainer}`}>
                <CountCardWithModal
                  title={title}
                  buttonLabel={others}
                  modalTitle={<FormattedHTMLMessage id={`Publication.${direction}.others`} />}
                >
                  {
                    rest.map(item => (
                      <CountCardModalItem key={item.doi}>
                        <UnpaywallCard item={item} lang={lang} />
                      </CountCardModalItem>
                    ))
                  }
                </CountCardWithModal>
              </div>
            )
            : null
        }
      </div>
    );
  }
  return null;
}

UnpaywallList.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  lang: PropTypes.oneOf(['fr', 'en']).isRequired,
  maxItems: PropTypes.number,
  direction: PropTypes.string.isRequired,
};
UnpaywallList.defaultProps = {
  maxItems: 5,
};

export default function Citations({ id: inputID, language: lang, direction }) {
  if (inputID.slice(0, 3) !== 'doi') return null;
  const citDir = (direction === 'references') ? 'cited' : 'citing';
  const id = inputID.replace(new RegExp('%252f', 'g'), '/').slice(3);
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
              title={<FormattedHTMLMessage id={`Publication.${direction}`} values={{ count: data.length }} />}
            />
            <UnpaywallList ids={data.map(obj => obj[citDir])} lang={lang} direction={direction} />
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
