import React from 'react';
import PropTypes from 'prop-types';

import classes from './ProjectList.scss';
import ProjectDetail from './ProjectDetail';
import getSelectKey from '../../../../../../Utils/getSelectKey';

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
          <p className={classes.Title}>
            {getSelectKey(item.value, 'acronym', props.language, 'default')}
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
