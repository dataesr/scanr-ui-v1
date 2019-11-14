import React from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';

import classes from './FilterPanel.scss';

/**
 * FilterPanel
 * Url : ex: /entite/200711886U
 * Description : Bloc identité visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

const FilterPanel = props => (
  <React.Fragment>
    <div className={`row align-items-end py-3 ${classes.Filters}`}>
      <div className="col-lg-4">
        <div className="d-flex flex-column">
          <div className={classes.TitleFilter} htmlFor="type-select">
            {props.language === 'fr' ? 'Type de productions' : 'Production type'}
            <select
              name="type"
              id="type-select"
              className={`form-control ${classes.Select}`}
              onChange={e => props.changeTypeHandler(e)}
              defaultValue={props.selectedType}
            >
              <option key="all" value="all">
                {(props.language === 'fr') ? 'Tous' : 'All'}
              </option>
              {
                Object.entries(props.totalPerType).map(([type, count]) => (
                  <option key={type} value={type}>{`${type} (${count})`}</option>
                ))
              }
            </select>
          </div>
        </div>
      </div>
      <div className={`col-lg-4 ${classes.RangeSlider}`}>
        <div className="d-flex flex-column">
          <div className={classes.TitleFilter} htmlFor="slider">
            {props.language === 'fr' ? 'Sélectionner une période' : 'Select a period'}
            <div id="slider" className={classes.Slider}>
              <InputRange
                minValue={props.sliderBounds.min}
                maxValue={props.sliderBounds.max}
                formatLabel={value => value}
                value={props.sliderYear}
                onChange={value => props.sliderChangeHandler(value)}
              />
            </div>
          </div>
        </div>
      </div>
      <form className="col-lg-4" onSubmit={props.queryChangeHandler}>
        <label className={classes.TitleFilter} htmlFor="inputFilter">
          {props.language === 'fr' ? 'Rechercher dans les publications' : 'Search in publications'}
          <input
            type="text"
            autoComplete="off"
            id="inputFilter"
            value={props.currentQueryText}
            className={`pl-2 ${classes.SearchBar}`}
            onChange={props.queryTextChangeHandler}
          />
          <button
            className={classes.SearchButton}
            type="submit"
          >
            <i className={`fas fa-search ${classes.SearchIcon}`} />
          </button>
        </label>
      </form>
    </div>
  </React.Fragment>
);

export default FilterPanel;

FilterPanel.propTypes = {
  language: PropTypes.string.isRequired,
  totalPerType: PropTypes.object.isRequired,
  selectedType: PropTypes.string.isRequired,
  sliderBounds: PropTypes.object.isRequired,
  sliderYear: PropTypes.object.isRequired,
  sliderChangeHandler: PropTypes.func.isRequired,
  currentQueryText: PropTypes.string,
  changeTypeHandler: PropTypes.func.isRequired,
  queryChangeHandler: PropTypes.func.isRequired,
  queryTextChangeHandler: PropTypes.func.isRequired,
};
