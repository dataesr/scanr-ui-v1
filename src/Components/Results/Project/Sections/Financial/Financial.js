import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';

import EmptySection from '../../../Shared/EmptySection/EmptySection';
import SimpleCard from '../../../../Shared/Ui/SimpleCard/SimpleCard';

// import BudgetCard from '../../Components/Budget';
import classes from './Financial.scss';

/**
 * Financial
 * Url : .
 * Informations : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Financial = (props) => {
  if (!props.data.budgetTotal && !props.data.budgetFinanced) return <EmptySection />;
  return (
    <div className="row">
      {
        (props.data.budgetTotal)
          ? (
            <div className={`col-3 ${classes.CardContainer}`}>
              <SimpleCard
                language={props.language}
                logo="fas fa-euro-sign"
                title={<FormattedHTMLMessage id="Project.Financial.total" />}
                label={Math.round(props.data.budgetTotal).toLocaleString(props.language)}
              />
            </div>
          )
          : null
      }
      {
        (props.data.budgetFinanced)
          ? (
            <div className={`col-3 ${classes.CardContainer}`}>
              <SimpleCard
                language={props.language}
                logo="fas fa-euro-sign"
                title={<FormattedHTMLMessage id="Project.Financial.financed" />}
                label={props.data.budgetFinanced.toLocaleString(props.language)}
              />
            </div>
          )
          : null
      }
    </div>
  );
};

export default Financial;

Financial.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
};

// Graph ratio for budget
// {
//   (props.data.budgetTotal && props.data.budgetFinanced)
//     ? (
//       <div className={classes.noSpace25}>
//         <BudgetCard
//           language={props.language}
//           title={<FormattedHTMLMessage id="Project.Financial.money" />}
//           tooltip=""
//           logo="fas fa-money-check-alt"
//           financed={props.data.budgetFinanced}
//           total={props.data.budgetTotal}
//         />
//       </div>
//     )
//     : null
// }
