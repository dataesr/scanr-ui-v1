import React from 'react';
import PropTypes from 'prop-types';
import CsvDownloader from 'react-csv-downloader';

import classes from './CSVExporter.scss';

const CSVExporter = (props) => {
  if (!props.data || props.data.length === 0) {
    return null;
  }
  return (
    <div className={`d-flex align-items-center ${classes.CSVExporter}`}>
      <div className={`pr-2 ${classes.Label}`}>
        {(props.language === 'fr') ? 'Télécharger' : 'Download'}
      </div>
      <div className="pr-1 d-flex align-items-center">
        <CsvDownloader
          filename={props.fileName}
          separator=";"
          columns={props.columns}
          datas={props.data}
          wrapColumnChar='"'
        >
          <button type="button" className={`btn ${classes.btn_scanrBlue} ${classes.Button}`}>
            <i className="fas fa-table" title="export CSV" />
          </button>
        </CsvDownloader>
      </div>
    </div>
  );
};

export default CSVExporter;

CSVExporter.propTypes = {
  language: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array,
  fileName: PropTypes.string,
};
