import React from 'react';
import PropTypes from 'prop-types';
import ReactPiwik from 'react-piwik';

import classes from '../../GraphComponents.scss';

/* Gestion des langues */
import messagesFr from '../translations/fr.json';
import messagesEn from '../translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

/**
 * ShareComponent
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const ShareComponent = (props) => {
  const exportChartPdf = () => {
    ReactPiwik.push(['trackEvent', 'Download', 'PDF_'.concat(props.filename)]);
    props.chart.current.chart.exportChart({
      type: 'application/pdf',
    });
  };

  const exportChartPng = () => {
    ReactPiwik.push(['trackEvent', 'Download', 'PNG_'.concat(props.filename)]);
    props.chart.current.chart.exportChart({
      type: 'image/png',
    });
  };

  const exportChartCsv = () => {
    ReactPiwik.push(['trackEvent', 'Download', 'CSV_'.concat(props.filename)]);
    props.chart.current.chart.downloadCSV();
  };

  return (
    <div className={classes.ShareComponent}>
      <div className={`d-flex flex-wrap pl-4 pr-4 p-3 ${classes.ShareComponent}`}>
        <div className="mr-auto d-flex align-items-center">
          <div className="pr-1 d-flex align-items-center">
            <span className={`pr-2 ${classes.ShareTexts}`}>
              {messages[props.language].share}
            </span>
            <button type="button" className={classes.Button}>
              <i className="fas fa-share-alt-square" />
            </button>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div className={`pr-2 ${classes.ShareTexts}`}>
            {messages[props.language].download}
          </div>
          <div className="pr-1 d-flex align-items-center">
            <button type="button" onClick={exportChartPdf} className={classes.Button}>
              <i className="fas fa-file-pdf" title="export PDF" />
            </button>
          </div>
          <div className="pr-1 d-flex align-items-center">
            <button type="button" onClick={exportChartPng} className={classes.Button}>
              <i className="fas fa-image" title="export PNG" />
            </button>
          </div>
          <div className="pr-1 d-flex align-items-center">
            <button type="button" onClick={exportChartCsv} className={classes.Button}>
              <i className="fas fa-table" title="export CSV" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareComponent;

ShareComponent.propTypes = {
  language: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
  chart: PropTypes.object.isRequired,
};
