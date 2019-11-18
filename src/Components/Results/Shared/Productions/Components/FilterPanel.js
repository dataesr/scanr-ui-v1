import React from 'react';
import PropTypes from 'prop-types';
import YearRangeSlider from '../../../../Shared/YearRangeSlider/YearRangeSlider';
import classes from './FilterPanel.scss';

/**
 * FilterPanel
 * Url : ex: /entite/200711886U
 * Description : Bloc identité visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const messages = {
  fr: {
    thesis: 'Thèses',
    publication: 'Publications',
    patent: 'Brevets',
  },
  en: {
    thesis: 'Thesis',
    publication: 'Publications',
    patent: 'Patents',
  },
};

const FilterPanel = props => (
  <React.Fragment>
    <div className={`row align-items-center py-3 ${classes.Filters}`}>
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
              {
                Object.entries(props.totalPerType).map(([type, count]) => (
                  <option key={type} value={type}>{`${messages[props.language][type]} (${count})`}</option>
                ))
              }
            </select>
          </div>
        </div>
      </div>
      <YearRangeSlider
        language={props.language}
        data={props.data}
        min={props.lowSliderYear}
        max={props.highSliderYear}
        minBound={2012}
        maxBound={2020}
        handleSliderRange={props.handleSliderRange}
        handleSliderSelect={props.handleSliderSelect}
      />
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
  data: PropTypes.object.isRequired,
  currentQueryText: PropTypes.string,
  changeTypeHandler: PropTypes.func.isRequired,
  queryChangeHandler: PropTypes.func.isRequired,
  queryTextChangeHandler: PropTypes.func.isRequired,
  lowSliderYear: PropTypes.number,
  highSliderYear: PropTypes.number,
  handleSliderRange: PropTypes.func.isRequired,
  handleSliderSelect: PropTypes.func.isRequired,
};
