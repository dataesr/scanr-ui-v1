import React from 'react';
import PropTypes from 'prop-types';

import classes from './StatusTagMini.scss';

const statusTagMini = (props) => {
  let content = '';
  let color = 'undefined_color';

  switch (props.status) {
    case 'old':
      color = 'old_color';
      content = <i className={`fas fa-times-circle ${classes[color]}`} />;
      break;
    case 'active':
      color = 'active_color';
      content = <i className={`fas fa-check-circle ${classes[color]}`} />;
      break;
    case 'invalid':
      color = 'invalid_color';
      content = <i className={`fas fa-times-circle ${classes[color]}`} />;
      break;
    default:
      content = <i className={`fas fa-times-circle ${classes[color]}`} />;
  }

  return (
    <div>
      {content}
    </div>
  );
};

export default statusTagMini;

statusTagMini.propTypes = {
  status: PropTypes.string.isRequired,
};
