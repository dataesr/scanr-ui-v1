import React from 'react';
import PropTypes from 'prop-types';

import classes from './ProjectList.scss';
import ProjectDetail from './ProjectDetail';
import getSelectKey from '../../../../../Utils/getSelectKey';
import CSVExporter from '../../../../Shared/CSVExporter/CSVExporter';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};
/**
 * ProjectList
 * Url : ex: /entite/200711886U
 * Description : Bloc identité visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const ProjectList = (props) => {
  let selectedProd = {};

  const dataCSVColumns = [
    { id: 'col1', displayName: messages[props.language]['dataCSVColumns.col1'] },
    { id: 'col2', displayName: messages[props.language]['dataCSVColumns.col2'] },
    { id: 'col3', displayName: messages[props.language]['dataCSVColumns.col3'] },
  ];
  const dataCSV = [];

  const content = props.data.map((item, i) => {
    let first = false;
    if (i > 0) {
      first = props.data[i - 1].value.year !== item.value.year;
    }
    let selected = '';
    if (item.value.id === props.selectedProject) {
      selected = classes.Selected;
      selectedProd = item.value;
    }

    const acronym = getSelectKey(item.value, 'acronym', props.language, 'default');
    const label = getSelectKey(item.value, 'label', props.language, 'default');
    const completeLabel = `${acronym}${(acronym ? ' - ' : '')}${label}`;

    dataCSV.push(
      {
        col1: item.value.id,
        col2: label.replace(/"/g, ''),
        col3: item.value.type,
      },
    );
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
          onClick={() => props.setSelectedProjectHandler(item.value.id)}
          onKeyPress={() => props.setSelectedProjectHandler(item.value.id)}
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
                language={props.language}
                columns={dataCSVColumns}
                data={dataCSV}
                fileName="fundings_export"
              />
            </div>
          ) : null}
        </div>
        <div className="col-lg-7">
          <ProjectDetail language={props.language} data={selectedProd} />
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
