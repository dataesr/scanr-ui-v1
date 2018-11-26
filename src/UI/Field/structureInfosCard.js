import React from 'react';
import PropTypes from 'prop-types';

import classes from './Field.scss';

const personInfosCard = (props) => {
  const mainWebsite = props.websites && props.websites.find(website => website.status === 'main');
  return (
    <div className={`${classes.StructureInfosCard} card`}>
      <div className="content">
        <div className="columns is-marginless">
          <div className={`column is-4 ${classes.Id}`}>
            {props.id}
          </div>
          <div className={`column is-4 ${classes.Level}`}>
            {props.level}
          </div>
          <div className={`column is-4 ${classes.Nature}`}>
            {props.nature}
          </div>
        </div>
        <div className="columns is-marginless">
          <div className={`column ${classes.Url}`}>
            <a href={`http://${mainWebsite.url}`} target="_blank" rel="noopener noreferrer">
              <span className="fas fa-mouse-pointer" />
              <br />
              {mainWebsite.url}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default personInfosCard;

personInfosCard.propTypes = {
  id: PropTypes.string,
  level: PropTypes.string,
  nature: PropTypes.string,
  websites: PropTypes.array,
};
