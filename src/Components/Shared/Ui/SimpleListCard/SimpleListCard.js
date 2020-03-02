import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import DictionaryData from '../../DictionaryData/DictionaryData';
import ButtonWithModal from '../Buttons/ButtonWithModal';

import classes from './SimpleListCard.scss';

/**
 * SimpleListCard component
 * Url : .
 * Description : Carte avec logo, titre, label, tooltip et bouton qui ouvre une modale affichant une liste d'items
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const logoFunction = logo => (
  (logo) ? <div className={classes.Logo}><i className={logo} aria-hidden="true" /></div> : null
);

const titleFunction = title => (
  (title) ? <h3 className={classes.Title}>{title}</h3> : null
);

const labelFunction = label => (
  (label) ? <p className={classes.Label}>{label}</p> : null
);

const multipleLabelsFunction = labels => (
  labels.map(label => (labelFunction(label)))
);

const additionalListFunction = (allProps) => {
  if (allProps.list && allProps.list.length === 0) { return null; }

  const getContent = (type, id) => {
    let content = '';
    let url = '';
    switch (type.toLowerCase()) {
      case 'wikidata':
        url = `https://www.wikidata.org/wiki/${id}`;
        break;

      case 'preferred wikidata':
        url = `https://www.wikidata.org/wiki/${id}`;
        break;

      case 'siret':
        url = `https://www.sirene.fr/sirene/public/recherche?recherche.sirenSiret=${id}&recherche.raisonSociale=&recherche.adresse=&recherche.commune=&__checkbox_recherche.excludeClosed=true&recherche.captcha=`;
        break;

      case 'siren':
        url = `https://entreprise.data.gouv.fr/etablissement/${id}`;
        break;

      case 'opencorporates':
        url = `https://opencorporates.com/companies/${id}`;
        break;

      case 'rna':
        url = `https://entreprise.data.gouv.fr/etablissement/${id}`;
        break;

      case 'isin_abr':
        url = `http://www.isni.org/${id}`;
        break;

      case 'isni':
        url = `http://www.isni.org/${id}`;
        break;

      case 'ror':
        url = `https://ror.org/${id}`;
        break;

      case 'idref':
        url = `https://www.idref.fr/${id.replace('idref', '')}`;
        break;

      case 'grid':
        url = `https://www.grid.ac/institutes/${id}`;
        break;

      case 'rnsr':
        url = `https://appliweb.dgri.education.fr/rnsr/PresenteStruct.jsp?numNatStruct=${id}&PUBLIC=OK`;
        break;

      default:
        content = id;
    }
    if (!content) {
      content = (
        <a href={url} target="blank">
          {id}
          <i className="pl-2 fas fa-external-link-alt" />
        </a>
      );
    }
    return <span className={classes.Value}>{content}</span>;
  };

  const items = allProps.list.map(item => (
    <li key={item.type} className="list-group-item">
      <div className="d-flex flew-row">
        <div>
          <span className={classes.Key}>
            <DictionaryData id={item.type} />
          </span>
        </div>
        <div className="ml-auto">
          {getContent(item.type, item.id)}
        </div>
      </div>
    </li>
  ));
  const itemsHtml = <ul className="list-group list-group-flush">{items}</ul>;
  return (
    <ButtonWithModal
      logo={allProps.logo}
      title={allProps.title}
      buttonLabel={allProps.labelListButton}
      dataHtml={itemsHtml}
    />
  );
};

const SimpleListCard = (props) => {
  const tooltip = (props.tooltip) ? (
    <Fragment>
      <span className={classes.Tooltip_i_top_right} data-tip={props.tooltip}>i</span>
      <ReactTooltip html />
    </Fragment>
  ) : null;

  if (props.multipleLabels && props.multipleLabels.length === 1 && props.multipleLabels[0] && props.multipleLabels[0].indexOf('dataesr') >= 0) {
    return null;
  }

  return (
    <div className={classes.SimpleListCard}>
      {logoFunction(props.logo)}
      {titleFunction(props.title)}
      {(props.label) ? labelFunction(props.label) : null }
      {(props.multipleLabels) ? multipleLabelsFunction(props.multipleLabels) : null}
      {tooltip}
      {additionalListFunction(props)}
    </div>
  );
};


export default SimpleListCard;

SimpleListCard.propTypes = {
  label: PropTypes.string,
  multipleLabels: PropTypes.array,
  logo: PropTypes.string,
  title: PropTypes.string,
  tooltip: PropTypes.string,
};
