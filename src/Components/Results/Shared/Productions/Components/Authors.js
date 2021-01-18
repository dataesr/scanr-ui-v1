import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

const Authors = (props) => {
  const { production: productionItem, language } = props;

  const getInventors = (prod) => {
    if (!prod.authors || prod.authors.length === 0) {
      return { inventeurs: null, deposants: null };
    }
    let inventeurs = prod.authors.filter(auth => auth.role.indexOf('__inventeur') >= 0).map((auth) => {
      const [fullName, country] = auth.fullName.split('__');
      return { fullName, country };
    });
    inventeurs = [...new Set(inventeurs.map(i => JSON.stringify(i)))].length;

    let depos = prod.authors.filter(deposant => deposant.role.indexOf('__deposant') >= 0).map((deposant) => {
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
  const maxAuthors = 2;
  const getAuthors = (production) => {
    let authors = [];
    if (production.productionType === 'publication') {
      authors = production.authors.map((author) => {
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
  let others = '';
  const diff = productionItem.authors.length - maxAuthors;
  if (diff === 1) {
    others = `${(language === 'fr') ? 'et ' : 'and '} 1 ${(language === 'fr') ? 'autre auteur' : 'more author'}`;
  } else if (diff > 1) {
    others = `${(language === 'fr') ? 'et ' : 'and '} ${diff} ${(language === 'fr') ? 'autres auteurs' : 'more authors'}`;
  }
  const authors = getAuthors(productionItem).slice(0, maxAuthors);

  return (
    <p className="m-0">
      {
      authors.reduce((prev, curr) => [prev, ', ', curr])
    }
      {' '}
      {productionItem.productionType === 'publication' && others}
    </p>
  );
};

export default Authors;

Authors.propTypes = {
  language: PropTypes.string.isRequired,
  production: PropTypes.object.isRequired,
};
