import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import classes from './Field.scss';

const personInfosCard = (props) => {
  const gender = (props.gender === 'F') ? <i className="fas fa-female" /> : <i className="fas fa-male" />;

  return (
    <div className={`${classes.PersonInfosCard} card`}>
      <div className="content">
        <div className="columns is-marginless">
          <div className={`column ${classes.Gender}`}>
            {gender}
          </div>
          <div className={`column ${classes.Age}`}>
            <div className={classes.Number}>{props.age}</div>
            ans
          </div>
          <div className={`column ${classes.Idref}`}>
            <a href={props.id_idref} target="_blank" rel="noopener noreferrer">
              <span className="fas fa-mouse-pointer" />
              <br />
              IdRef
            </a>
          </div>
        </div>
        {
        (props.orcid_creation_date) ? (
          <div className="columns is-marginless">
            <div className={`column is-8 ${classes.OrcidDate}`}>
              Date de création Orcid
              <div className={classes.Date}>
                {moment(props.orcid_creation_date).format('LL')}
              </div>
            </div>
            <div className={`column ${classes.Orcid}`}>
              <a href={props.id_orcid} target="_blank" rel="noopener noreferrer">
                <span className="fas fa-mouse-pointer" />
                <br />
                ORCId
              </a>
            </div>
          </div>)
          : null
        }

      </div>
    </div>
  );
};

export default personInfosCard;

personInfosCard.propTypes = {
  age: PropTypes.string,
  gender: PropTypes.string,
  id_idref: PropTypes.string,
  id_orcid: PropTypes.string,
  orcid_creation_date: PropTypes.string,
};
