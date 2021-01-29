import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import classes from './ProjectList.scss';
import ProjectDetail from './ProjectDetail';
import getSelectKey from '../../../../../Utils/getSelectKey';
import CSVExporter from '../../../../Shared/CSVExporter/CSVExporter';
import projectCsvExporter from '../projectCsvExporter/projectCsvExporter';
/**
 * ProjectList
 * Url : ex: /entite/200711886U
 * Description : Bloc identité visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const ProjectList = ({
  language,
  selectedProject,
  setSelectedProjectHandler,
  data,
}) => {
  let selectedProd = {};

  const [csvColumns, setCsvColumns] = useState();
  const [csvData, setCsvData] = useState();
  useEffect(() => {
    const {
      csvColumns: cols,
      csvData: dataCsv,
    } = projectCsvExporter(data, language);
    setCsvData(dataCsv);
    setCsvColumns(cols);
  }, [data, language]);

  const content = data.map((item, i) => {
    let first = false;
    if (i > 0) {
      first = data[i - 1].value.year !== item.value.year;
    }
    let selected = '';
    if (item.value.id === selectedProject) {
      selected = classes.Selected;
      selectedProd = item.value;
    }

    const acronym = getSelectKey(item.value, 'acronym', language, 'default');
    const label = getSelectKey(item.value, 'label', language, 'default');
    const completeLabel = `${acronym}${(acronym ? ' - ' : '')}${label}`;

    return (
      <React.Fragment key={item.value.id}>
        {
          (i === 0 || first)
            ? (
              <div className={classes.TitleYear}>
                {item.value.year}
              </div>
            )
            : null
        }
        <div
          className={`${classes.Item} ${selected}`}
          onClick={() => setSelectedProjectHandler(item.value.id)}
          onKeyPress={() => setSelectedProjectHandler(item.value.id)}
          role="button"
          tabIndex={0}
        >
          <p className={classes.Title} title={completeLabel}>
            {completeLabel}
          </p>
          <div className={`d-flex align-items-center ${classes.Type}`}>
            <div className="mr-auto" />
            <span className={classes[item.value.type]} />
            <p className="m-0">{item.value.type}</p>
          </div>
        </div>
      </React.Fragment>
    );
  });

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-5">
          <div className={classes.ListOfProjects}>
            {(content.length > 0) ? content : 'Aucun résultat'}
          </div>
          {(content.length > 0) ? (
            <div className="pt-2">
              <CSVExporter
                language={language}
                columns={csvColumns}
                data={csvData}
                fileName="fundings_export"
              />
            </div>
          ) : null}
        </div>
        <div className="col-lg-7">
          <ProjectDetail language={language} data={selectedProd} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProjectList;

ProjectList.propTypes = {
  language: PropTypes.string.isRequired,
  selectedProject: PropTypes.string.isRequired,
  setSelectedProjectHandler: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};
