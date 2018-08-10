import React from 'react';

/*CSS*/
import classes from './StructureList.scss';
//import main_classes from '../../../App.css';

const StructureList = (props) => {
  return (
    <section className="container is-fluid">
      <ul className={classes.structureList_ul}>
        {
          props.structuresList.map((structure) => {
            return (
              <li key={structure.id}
                className={classes.structureList_li}>

                <div className="columns">
                  <div className={`column is-four-fifths ${classes.link} hvr-icon-forward`}
                    onClick={() => props.structureSelected({structure})}>
                    <i className="fa fa-chevron-circle-right hvr-icon"></i>
                    &nbsp;
                    &nbsp;
                    {structure.label[0].value}
                  </div>
                  <div className={`column ${classes.structuresList_id}`}>
                    {structure.id}
                  </div>
                </div>
              </li>
            )
          })// /map
        }
      </ul>
    </section>

  );
};

export default StructureList;
