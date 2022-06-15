import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';

import TagCard from '../../../../../../Shared/Ui/TagCard/TagCard';
import CardsTitle from '../../../../../../Shared/Ui/CardsTitle/CardsTitle';
import { API_PUBLICATIONS_SEARCH_END_POINT } from '../../../../../../../config/config';
import useSearchAPI from '../../../../../../../Hooks/useSearchAPI';
import SectionLoader from '../../../../../../Shared/LoadingSpinners/GraphSpinner';
import Errors from '../../../../../../Shared/Errors/Errors';
import EmptySection from '../../../../../Shared/EmptySection/EmptySection';

import classes from './Domains.scss';

/**
 * Affiliations
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

const wordFreq = (words) => {
  // var words = string.replace(/[.]/g, '').split(/\s/);
  const words2 = [];
  words.forEach((w) => {
    const wordsSplit = w.split('/');
    wordsSplit.forEach((ws) => {
      let x = ws.replace(/\[.*/, '');
      x = x.trim();
      words2.push(x);
    });
  });
  const freqMap = {};
  words2.forEach((w) => {
    if (!freqMap[w]) {
      freqMap[w] = 0;
    }
    freqMap[w] += 1;
  });
  const items = Object.keys(freqMap).map(key => [key, freqMap[key]]);
  items.sort((a, b) => b[1] - a[1]);
  return items;
};

const getDataAuthor = (d, id) => {
  const productions = [];
  if (d.length > 0) {
    d.forEach((prod, i) => {
      prod.value.authors.forEach((author) => {
        if (author.role === 'author' && author.person && author.person.id === id) {
          productions.push(d[i].value);
        }
      });
    });
  }
  return productions;
};

const Domains = (props) => {
  if (props.data) {
    const request = {
      pageSize: 1000,
      sourceFields: ['title', 'domains', 'keywords', 'authors'],
      filters: {
        productionType: {
          type: 'MultiValueSearchFilter',
          op: 'any',
          values: ['thesis', 'publication'],
        },
        'authors.person.id': {
          type: 'MultiValueSearchFilter',
          op: 'all',
          values: [props.data.id],
        },
      },
    };
    const { data, isLoading, isError } = useSearchAPI(API_PUBLICATIONS_SEARCH_END_POINT, request);
    if (isLoading) return <SectionLoader />;
    if (isError) return <Errors error={500} />;
    if (!data) return <EmptySection />;

    const productions = getDataAuthor(data.results, props.data.id);
    let allTags = [];
    productions.forEach((prod) => {
      if (prod.domains && prod.domains !== undefined) {
        prod.domains.forEach((dom) => {
          if (!['macro_level_barometre', 'dewey'].includes(dom.type)) {
            if (props.language in dom.label) {
              allTags.push(dom.label[props.language]);
            } else if ('default' in dom.label) {
              allTags.push(dom.label.default);
            }
          }
        });
      }
      let kw = [];
      if (prod.keywords && prod.keywords !== undefined) {
        if (props.language in prod.keywords) {
          kw = prod.keywords[props.language];
        } else if ('default' in prod.keywords) {
          kw = prod.keywords.default;
        }
      }
      allTags = allTags.concat(kw);
    });
    const tags = wordFreq(allTags);
    const tagList = tags.map(dom => dom[0]);
    return (
      <div className="container-fluid">
        <div className="row">
          <div className={`col ${classes.NoSpace}`}>
            <CardsTitle
              title={<FormattedHTMLMessage id="Person.Informations.Domains.title" />}
              lexicon="PersonThematics"
              language={props.language}
            />
          </div>
        </div>
        <div className="row">
          <div className={`col-md ${classes.CardContainer}`}>
            <TagCard
              logo="fas fa-flask"
              title={<FormattedHTMLMessage id="Person.Informations.Domains.domainCard" />}
              tagList={tagList}
              language={props.language}
              labelListButton="Tous les domaines"
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default Domains;

Domains.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
};
