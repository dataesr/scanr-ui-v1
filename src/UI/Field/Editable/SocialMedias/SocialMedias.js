import React from 'react';
import PropTypes from 'prop-types';

import {
  SOCIAL_MEDIAS_ARRAY,
  FACEBOOK_ICON,
  LINKEDIN_ICON,
  TWITTER_ICON,
  VIADEO_ICON,
  YOUTUBE_ICON
}
  from '../../../../config/config';

import classes from '../../Field.css';

const SocialMedias = (props) => {
  let statusMode = (
    <span onClick={props.onClick}>
      {props.fieldValue
        ? props.fieldValue
        : 'NA'}
    </span>);
  if (props.editMode) {
    let inputColor = null;
    if (!props.canBeNull) {
      inputColor = props.fieldValue && props.fieldValue !== 'empty' ? 'is-primary' : 'is-danger';
    }
    statusMode = (
      <div className={`select is-rounded ${inputColor}`}>
        <select
          id="status"
          value={props.fieldValue || 'empty'}
          onChange={props.onChange}
        >
          <option value="empty">- Empty -</option>
          {SOCIAL_MEDIAS_ARRAY.map(status => <option key={status} value={status}>{status}</option>)}
        </select>
      </div>);
  }

  return statusMode;
};

export default SocialMedias;

SocialMedias.propTypes = {
  editMode: PropTypes.bool,
  fieldValue: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  size: PropTypes.string,
};

SocialMedias.defaultProps = {
  fieldValue: 'empty',
  editMode: false,
};
