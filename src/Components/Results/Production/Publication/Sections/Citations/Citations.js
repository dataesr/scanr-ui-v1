import React, { Fragment } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import useOpenCitations from '../../../../../../Hooks/useOpenCitations';
import SectionLoader from '../../../../../Shared/LoadingSpinners/GraphSpinner';
import Errors from '../../../../../Shared/Errors/Errors';
import SectionTitle from '../../../../Shared/SectionTitle';

import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';


/**
 * Citations
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const messages = { fr: messagesFr, en: messagesEn };

const OpenCitationList = ({ ids }) => {
  const { data, isLoading, isError } = useOpenCitations(ids);
  if (isLoading) return <SectionLoader />;
  if (isError) return <Errors error={500} />;
  const pick = (...args) => o => args.reduce((a, e) => ({ ...a, [e]: o[e] }), {});
  if (data.length) {
    return (
      <div>
        {
          data.slice(0, 9).map(item => (
            <div><pre>{JSON.stringify(pick('author', 'year', 'doi')(item), null, 2)}</pre></div>
          ))
        }
      </div>
    );
  }
  return null;
};

OpenCitationList.propTypes = {
  ids: PropTypes.array.isRequired,
};

const Citations = (props) => {
  const id = props.id.replace(new RegExp('%252f', 'g'), '/').slice(3);
  const { data, isLoading, isError } = useOpenCitations(id);
  if (isLoading) return <SectionLoader />;
  if (isError) return <Errors error={500} />;
  if (data.length) {
    return (
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <Fragment>
          <section id="Citations" className="py-3">
            <div className="container">
              <SectionTitle
                icon="fa-folder-open"
                lexicon="PublicationSimilar"
                language={props.language}
                title={<FormattedHTMLMessage id="Publication.citations" values={{ count: data[0].citation_count }} />}
              />
              {data[0].citation && <OpenCitationList ids={data[0].citation} />}
            </div>
          </section>
          <section id="References" className="py-3">
            <div className="container">
              <SectionTitle
                icon="fa-folder-open"
                lexicon="PublicationSimilar"
                language={props.language}
                title={<FormattedHTMLMessage id="Publication.references" values={{ count: data[0].reference.split('; ').length }} />}
              />
              {data[0].reference && <OpenCitationList ids={data[0].reference} />}
            </div>
          </section>
        </Fragment>
      </IntlProvider>
    );
  }
  return null;
};
export default Citations;

Citations.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
