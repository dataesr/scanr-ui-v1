import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';

import RoleCard from '../../../../Components/RoleCard';
import LexiconModal from '../../../../../../Shared/Lexicon/LexiconModal/LexiconModal';

import classes from './Roles.scss';


/**
 * Roles
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Roles = (props) => {
  if (props.data.roles) {
    return (
      <section className="container-fluid">
        <div className="row">
          <div className={`col-12 ${classes.CardContainer}`}>
            <div className={classes.SubSectionTitle}>
              <FormattedHTMLMessage id="Person.Informations.Roles.title" />
              &nbsp;
              <LexiconModal target="PersonRole">
                <i className="fa fa-info-circle" />
              </LexiconModal>
            </div>
            <div className="container-fluid">
              <div className="row">
                {
                  props.data.roles.map(role => (
                    <div className={`col-md-6 col-sm-12 ${classes.CardContainer}`} key={role}>
                      <RoleCard
                        logo="fas fa-user"
                        data={role}
                      />
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return null;
};

export default Roles;

Roles.propTypes = {
  data: PropTypes.object,
};
