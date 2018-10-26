import React from 'react';
import PropTypes from 'prop-types';

import {
  SOCIAL_MEDIAS_ARRAY,
  FACEBOOK,
  LINKEDIN,
  TWITTER,
  VIADEO,
  YOUTUBE,
  FACEBOOK_ICON,
  LINKEDIN_ICON,
  TWITTER_ICON,
  VIADEO_ICON,
  YOUTUBE_ICON,
}
  from '../../../../config/config';

const SocialMedias = (props) => {
  let icon = '';
  switch (props.fieldValue) {
    case FACEBOOK:
      icon = FACEBOOK_ICON;
      break;
    case LINKEDIN:
      icon = LINKEDIN_ICON;
      break;
    case TWITTER:
      icon = TWITTER_ICON;
      break;
    case VIADEO:
      icon = VIADEO_ICON;
      break;
    case YOUTUBE:
      icon = YOUTUBE_ICON;
      break;
    default:
      icon = 'NA';
  }
  let content = (
    <p onClick={props.onClick}>
      {icon}
    </p>
  );

  if (props.editMode) {
    let inputColor = null;
    if (!props.canBeNull) {
      inputColor = props.fieldValue && props.fieldValue !== 'empty' ? 'is-primary' : 'is-danger';
    }
    content = (
      <div className={`select is-rounded ${inputColor}`}>
        <select
          id="social_media"
          value={props.fieldValue || 'empty'}
          onChange={props.onChange}
        >
          <option value="empty">- Empty -</option>
          {SOCIAL_MEDIAS_ARRAY.map(socialMedia => <option key={socialMedia} value={socialMedia}>{socialMedia}</option>)}
        </select>
      </div>);
  }

  return content;
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
