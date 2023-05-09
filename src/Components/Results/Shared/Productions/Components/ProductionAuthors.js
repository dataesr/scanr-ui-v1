import PropTypes from 'prop-types';
import React from 'react';

/* Intl */
import { FormattedHTMLMessage, IntlProvider } from 'react-intl';
import transformAuthors from '../../../../../config/transformAuthors';
import messagesEn from './translations/en.json';
import messagesFr from './translations/fr.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const verifyRole = (author: Object, roles: Array) => {
  if (!author.rolePatent && !author.role) {
    return false;
  }
  return roles.includes(author.role ? author.role : author.rolePatent[0].role);
};

const ProductionAuthors = (props) => {
  const { production: productionItem, language, maxAuthors } = props;

  const getInventors = (prod) => {
    if (!prod.authors || prod.authors.length === 0) {
      return { inventeurs: null, deposants: null };
    }
    let inventeurs = prod.authors.filter(auth => verifyRole(auth, ['__inventeur', 'inv'])).map((auth) => {
      const [fullName, country] = auth.fullName.split('__');
      return { fullName, country };
    });
    inventeurs = [...new Set(inventeurs.map(i => JSON.stringify(i)))].length;

    let depos = prod.authors.filter(deposant => verifyRole(deposant, ['__deposant', 'dep'])).map((deposant) => {
      const label = deposant.fullName.split('__')[0];
      return { label, id: (deposant.affiliations && deposant.affiliations.length) && deposant.affiliations[0].structure };
    });
    depos = [...new Set(depos.map(i => JSON.stringify(i)))].map(i => JSON.parse(i));
    let deposants = 0;
    const ids = [];
    depos.forEach((deposant) => {
      if (deposant.id) {
        ids.push(deposant.id);
        if (ids.filter(iden => iden === deposant.id).length < 2) {
          deposants += 1;
        }
      } else {
        deposants += 1;
      }
    });
    return (
      <React.Fragment>
        <FormattedHTMLMessage id="inventor" values={{ count: inventeurs }} />
        ,&nbsp;
        <FormattedHTMLMessage id="deposant" values={{ count: deposants }} />
      </React.Fragment>
    );
  };

  const getAuthors = (production) => {
    let authors = [];
    if (production.productionType === 'publication') {
      authors = production.authors.map(el => transformAuthors(el)).map((author) => {
        if (author.person) {
          return <a href={`person/${author.person.id}`} key={JSON.stringify(author)}>{author.fullName}</a>;
        }
        return <span key={JSON.stringify(author)}>{author.fullName}</span>;
      });
    } else if (production.productionType === 'thesis') {
      authors = production.authors
        .filter(author => author.role === 'author')
        .map((author) => {
          if (author.person) {
            return <a key={JSON.stringify(author)} href={`person/${author.person.id}`}>{author.fullName}</a>;
          }
          return <span key={JSON.stringify(author)}>{author.fullName}</span>;
        });
    } else {
      return [getInventors(production)];
    }
    return authors;
  };
  const diff = productionItem.authors.length - maxAuthors;
  const others = diff > 0 ? <FormattedHTMLMessage id="more_authors" values={{ count: diff }} /> : '';
  const authors = getAuthors(productionItem).slice(0, maxAuthors);

  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <p className="m-0">
        {
      authors.reduce((prev, curr) => [prev, ', ', curr])
    }
        {' '}
        {productionItem.productionType === 'publication' && others}
      </p>
    </IntlProvider>
  );
};

export default ProductionAuthors;

ProductionAuthors.defaultProps = {
  maxAuthors: 2,
};
ProductionAuthors.propTypes = {
  language: PropTypes.string.isRequired,
  maxAuthors: PropTypes.number,
  production: PropTypes.object.isRequired,
};
