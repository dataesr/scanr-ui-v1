import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import useSearchAPI from '../../../../../../../Hooks/useSearchAPI';
import { API_STRUCTURES_SEARCH_END_POINT } from '../../../../../../../config/config';
import RoleCard from '../../../../Components/RoleCard';
import LexiconModal from '../../../../../../Shared/Lexicon/LexiconModal/LexiconModal';
import request from './request';
import classes from './Roles.scss';
import Errors from '../../../../../../Shared/Errors/Errors';
import Loader from '../../../../../../Shared/LoadingSpinners/RouterSpinner';
import styles from '../../../../../../../style.scss';

/**
 * Roles
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Roles = ({ language }) => {
  const { id } = useParams();
  const { data, isLoading, isError } = useSearchAPI(API_STRUCTURES_SEARCH_END_POINT, request(id));
  if (isLoading) return <Loader color={styles.personColor} />;
  if (isError) return <Errors error={500} />;
  const roles = data.results.map(s => ({
    id: s.value.id,
    label: s.value.label.default,
    role: s.value.leaders.filter(l => (l.person && l.person.id === id)).reduce((p, n) => {
      if (!p.fromDate || n.fromDate > p.fromDate) { return n; }
      return p;
    }, {}),
  }));
  if (data.total) {
    return (
      <section className="container-fluid">
        <div className="row">
          <div className={`col-12 ${classes.CardContainer}`}>
            <div className={classes.SubSectionTitle}>
              <FormattedHTMLMessage id="Person.Informations.Roles.title" />
              &nbsp;
              <LexiconModal language={language} target="PersonRole">
                <i className={`fa fa-info-circle ${classes.fs_small}`} />
              </LexiconModal>
            </div>
            <div className="container-fluid">
              <div className="row">
                {
                  roles.map(role => (
                    <div className={`col-md-6 col-sm-12 ${classes.CardContainer}`} key={`${role.role}-${role.description}`}>
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
  language: PropTypes.string,
};
