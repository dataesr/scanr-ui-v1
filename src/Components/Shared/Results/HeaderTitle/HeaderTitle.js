import React, { useState } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import MetaTags from 'react-meta-tags';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './HeaderTitle.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const HeaderTitle = (props) => {
  const [selected, setSelected] = useState();

  if (selected) {
    document.getElementById(selected).scrollIntoView(true);
    window.scrollBy({ top: -120, behavior: 'smooth' });
  }
  const list = [];
  const href1 = './recherche/all?query=';
  let href2 = '';
  let href3 = '';
  let pageType = '';
  switch (props.idPage) {
    case 'Entity':
      href2 = './recherche/structures?query=';
      href3 = './entite/'.concat(props.id);
      pageType = 'Structures';
      list.push('Portrait');
      list.push('Network');
      list.push('Team');
      list.push('Projects');
      list.push('Productions');
      list.push('Ecosystem');
      list.push('Awards');
      list.push('SimilarEntities');
      list.push('LastEntityFocus');
      break;
    case 'Person':
      href2 = './recherche/persons?query=';
      href3 = './person/'.concat(props.id);
      pageType = 'Personnes';
      list.push('Informations');
      list.push('Production');
      list.push('CoAuthors');
      break;
    case 'Project':
      href2 = './recherche/projects?query=';
      href3 = './project/'.concat(props.id);
      pageType = 'Projets';
      list.push('Informations');
      list.push('Financial');
      list.push('Programs');
      list.push('Participants');
      list.push('Productions');
      break;
    case 'Thesis':
      href2 = './recherche/publications?query=';
      href3 = './publication/'.concat(props.id);
      pageType = 'Thèses';
      list.push('Thesis');
      list.push('AccessType');
      list.push('Authors');
      list.push('Affiliations');
      list.push('SimilarProductions');
      break;
    case 'Publication':
      href2 = './recherche/publications?query=';
      href3 = './publication/'.concat((props.id).split('/').join('%25252f'));
      pageType = 'Publications';
      list.push('Publication');
      list.push('AccessType');
      list.push('Authors');
      list.push('Affiliations');
      list.push('SimilarProductions');
      break;
    default:
      break;
  }
  const pageTitle = 'scanR | '.concat(props.label);
  const pageDescription = "scanR est un outil d'aide à l'exploration, au suivi et à la caractérisation des activités de recherche et d'innovation des acteurs français (publics et privés) de la recherche";
  const pageImage = '../../svg/logo-scanr-blue.svg';

  const metaTags = (
    <MetaTags>
      <title>{pageTitle}</title>
      <meta id="meta-description" name="description" content={pageDescription} />
      <meta id="og-title" property="og:title" content={pageTitle} />
      <meta id="og-image" property="og:image" content={pageImage} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      <ol itemScope itemType="http://schema.org/BreadcrumbList">
        <li
          itemProp="itemListElement"
          itemScope
          itemType="http://schema.org/ListItem"
        >
          <a itemProp="item" href={href1}>
            <span itemProp="name">Recherche</span>
          </a>
          <meta itemProp="position" content="1" />
        </li>
        <li
          itemProp="itemListElement"
          itemScope
          itemType="http://schema.org/ListItem"
        >
          <a itemProp="item" href={href2}>
            <span itemProp="name">{pageType}</span>
          </a>
          <meta itemProp="position" content="2" />
        </li>
        <li
          itemProp="itemListElement"
          itemScope
          itemType="http://schema.org/ListItem"
        >
          <a itemProp="item" href={href3}>
            <span itemProp="name">{pageTitle}</span>
          </a>
          <meta itemProp="position" content="3" />
        </li>
      </ol>
    </MetaTags>
  );
  // si mini
  if (!props.isFull) {
    return (
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <section className={classes.HeaderTitle} style={{ position: 'fixed', zIndex: 1002, width: '100%' }}>
          {metaTags}
          <div className="container">
            <div className="row">
              <div className="col-md-9">
                <div className={classes.Title}>
                  {props.label}
                </div>
              </div>
              <div className={`col pr-0 ${classes.ColToDelete}`}>
                <div className={`form-group ${classes.NavBox}`}>
                  <select
                    id="headerTitleSelect"
                    className="form-control"
                    onChange={e => setSelected(e.target.value)}
                    value={selected}
                  >
                    {
                      list.map(item => (
                        <option value={item} key={item}>{messages[props.language][`${props.idPage}.${item}`]}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>
      </IntlProvider>
    );
  }

  // sinon full
  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section className={classes.HeaderTitle}>
        {metaTags}
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className={classes['breadcrumb-item']}>
                    <a href="/">{messages[props.language].Home}</a>
                  </li>
                  <li className={classes['breadcrumb-item']}>
                    <a href="/recherche/all">{messages[props.language].Search}</a>
                  </li>
                  <li className={`${classes['breadcrumb-item']} ${classes.ItemActive}`}>{messages[props.language][props.idPage]}</li>
                </ol>
              </nav>
              <div className={classes.Title}>
                {props.label}
              </div>
            </div>
            <div className={`col pr-0 ${classes.ColToDelete}`}>
              <div className={`form-group ${classes.NavBox}`}>
                {/* eslint-disable-next-line */}
                <label htmlFor="headerTitleSelect">
                  <FormattedHTMLMessage id="HeaderTitle.label1" />
                  <select
                    id="headerTitleSelect"
                    className="form-control"
                    onChange={e => setSelected(e.target.value)}
                    value={selected}
                  >
                    {
                      list.map(item => (
                        <option value={item} key={item}>{messages[props.language][`${props.idPage}.${item}`]}</option>
                      ))
                    }
                  </select>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
    </IntlProvider>
  );
};

export default HeaderTitle;

HeaderTitle.defaultProps = {
  isFull: true,
};

HeaderTitle.propTypes = {
  language: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  idPage: PropTypes.string.isRequired,
  isFull: PropTypes.bool,
};
