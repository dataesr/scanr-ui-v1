import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import SubmitBox from '../../SubmitBox/SubmitBox';
import ButtonWithModal from '../Buttons/ButtonWithModal';
import ButtonToSearch from '../Buttons/ButtonToSearch';

import classes from './TagCard.scss';

/**
 * TagCard component
 * Url : .
 * Description : Carte avec logo, titre, label et tooltip
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

const TagCard = (props) => {
  const logo = (props.logo) ? <div className={classes.Logo}><i className={props.logo} aria-hidden="true" /></div> : null;
  const title = (props.title) ? <h3 className={classes.Title}>{props.title}</h3> : null;
  const labelListButton = props.labelListButton;
  const htmlList = props.tagList.map(tag => (
    <li className={`pb-1 pt-1 pl-2 pr-2 mr-1 mb-1 ${classes.Tag}`} style={props.tagStyle} key={tag}>
      <ButtonToSearch href={`/recherche/all?query=${tag}`}>
        {tag}
      </ButtonToSearch>
    </li>
  ));

  const tooltip = (props.tooltip) ? (
    <Fragment>
      <span className={classes.Tooltip_i_top_right} data-tip={props.tooltip}>i</span>
      <ReactTooltip html />
    </Fragment>
  ) : null;
  return (
    <div className={`pb-3 ${classes.TagCard}`}>
      {(props.modifyMode) ? <SubmitBox language={props.language} masterKey={props.masterKey} label={props.allData.fullName} /> : null}
      {logo}
      {title}
      <ul className={`d-flex flex-wrap p-3 ${classes.MyUL}`}>
        {
          (props.tagList.length > props.maxElements)
            ? htmlList.slice(-props.maxElements)
            : htmlList
        }
      </ul>
      {
        (props.tagList.length > props.maxElements)
          ? (
            <ButtonWithModal
              logo={props.logo}
              title={props.title}
              buttonLabel={labelListButton}
              dataHtml={htmlList}
            />
          )
          : null
      }
      {tooltip}
    </div>
  );
};

export default TagCard;

TagCard.defaultProps = {
  maxElements: 12,
};

TagCard.propTypes = {
  language: PropTypes.string,
  logo: PropTypes.string,
  title: PropTypes.string,
  tagStyle: PropTypes.object,
  labelListButton: PropTypes.string,
  maxElements: PropTypes.number,
  tagList: PropTypes.array,
  tooltip: PropTypes.string,
  masterKey: PropTypes.string, // Utilisée pour le mode modifier/enrichir
  modifyMode: PropTypes.bool,
  allData: PropTypes.object.isRequired,
};
