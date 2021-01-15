import React, { Fragment } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import useOpenCitations from '../../../../../../Hooks/useOpenCitations';
import useCrossRef from '../../../../../../Hooks/useCrossRef';
import SectionLoader from '../../../../../Shared/LoadingSpinners/GraphSpinner';
import Errors from '../../../../../Shared/Errors/Errors';
import SectionTitle from '../../../../Shared/SectionTitle';
import CountCardWithModal, { CountCardModalItem } from '../../../../../Shared/Ui/CountCardWithModal/CountCardWithModal';
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

function CrossRefCard({ item }) {
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
            {(item.authors && item.authors.length < 3) && item.authors.join(', ')}
            {(item.authors && item.authors.length >= 3) && (
              <Fragment>
                {`${item.authors.length && item.authors[0]} `}
                <FormattedHTMLMessage id="Publication.authors" values={{ count: item.num_authors }} />
              </Fragment>
            )}
          </p>
        </li>
        <li className="d-flex">
          <div className={classes.Icons}>
            <i aria-hidden="true" className="fas fa-calendar" />
          </div>
          <p className="m-0">
            {item.date}
          </p>
        </li>
        <li className="d-flex">
          <div className={classes.Icons}>
            <i aria-hidden="true" className="fas fa-folder-open" />
          </div>
          <p className="m-0">
            {item.journal}
          </p>
        </li>
      </ul>
      <a href={`https://doi.org/${item.doi}`} className="ml-auto my-1">
        <FormattedHTMLMessage id="Publication.seeMore" />
      </a>
    </article>
  );
}
CrossRefCard.propTypes = {
  item: PropTypes.object.isRequired,
};

function CrossRefList({
  ids,
  lang,
  maxItems,
  direction,
}) {
  const { data, isLoading, isError } = useCrossRef(ids);
  if (isLoading) return <SectionLoader />;
  if (isError) return <Errors error={500} />;
  if (data.length) {
    const publis = data.slice(0, maxItems);
    const rest = data.slice(maxItems);
    const title = rest && <FormattedHTMLMessage id="Publication.authors" values={{ count: ids.length - maxItems }} />;
    const others = rest && <FormattedHTMLMessage id="Publication.list" />;
    return (
      <div className="row">
        {publis.map(item => (
          <div className={`col-md-4 ${classes.CardContainer}`}>
            <CrossRefCard key={item.doi} item={item} lang={lang} />
          </div>
        ))}
        {
          rest && (
            <div className={`col-md-4 ${classes.CardContainer}`}>
              <CountCardWithModal
                title={title}
                buttonLabel={others}
                modalTitle={<FormattedHTMLMessage id={`Publication.${direction}.others`} />}
              >
                {
                  rest.map(item => (
                    <CountCardModalItem key={item.doi}>
                      <CrossRefCard item={item} lang={lang} />
                    </CountCardModalItem>
                  ))
                }
              </CountCardWithModal>
            </div>
          )
        }
      </div>
    );
  }
  return null;
}

CrossRefList.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  lang: PropTypes.oneOf(['fr', 'en']).isRequired,
  maxItems: PropTypes.number,
  direction: PropTypes.string.isRequired,
};
CrossRefList.defaultProps = {
  maxItems: 5,
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
              title={<FormattedHTMLMessage id={`Publication.${direction}`} values={{ count: data.length }} />}
            />
            <CrossRefList ids={data.map(obj => obj[citDir])} lang={lang} direction={direction} />
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
