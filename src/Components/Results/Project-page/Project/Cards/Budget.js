import React from 'react';
import PropTypes from 'prop-types';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const BudgetCard = (props) => {
  const options = {
    title: {
      text: 'My chart',
    },
    series: [{
      data: props.data,
    }],
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
}

export default BudgetCard;

BudgetCard.propTypes = {
  language: PropTypes.string.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
  tooltip: PropTypes.string,
  masterKey: PropTypes.string, // Utilisée pour le mode modifier/enrichir
  modifyMode: PropTypes.bool,
  data: PropTypes.object.isRequired,
};
