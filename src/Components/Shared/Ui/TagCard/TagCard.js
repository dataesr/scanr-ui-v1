import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

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
  const htmlList = props.tagList.map((tag) => {
    let encodedTag = tag;
    if (!tag.href) {
      encodedTag = encodeURIComponent(tag.trim());
    }
    const href = tag.href || `/recherche/all?query=%22${encodedTag}%22&view=list`;

    return (
      <li className={`pb-1 pt-1 pl-2 pr-2 mr-1 mb-1 ${classes.Tag} ${classes.Li}`} key={tag}>
        <ButtonToSearch href={href}>
          {tag.tag || tag }
        </ButtonToSearch>
      </li>
    );
  });

  const tooltip = (props.tooltip) ? (
    <Fragment>
      <span className={classes.Tooltip_i_top_right} data-tip={props.tooltip}>i</span>
      <ReactTooltip html />
    </Fragment>
  ) : null;
  return (
    <div className={`pb-3 ${classes.TagCard}`}>
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
  logo: PropTypes.string,
  title: PropTypes.any,
  labelListButton: PropTypes.string,
  maxElements: PropTypes.number,
  tagList: PropTypes.array,
  tooltip: PropTypes.string,
};
