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
        min={props.sliderYear.min}
        max={props.sliderYear.max}
        handleSingleYearSelection={props.handleSingleYearSelection}
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
  // sliderBounds: PropTypes.object.isRequired,
  sliderYear: PropTypes.object.isRequired,
  // sliderChangeHandler: PropTypes.func.isRequired,
  // sliderChangeCompleteHandler: PropTypes.func.isRequired,
  currentQueryText: PropTypes.string,
  changeTypeHandler: PropTypes.func.isRequired,
  handleSingleYearSelection: PropTypes.func.isRequired,
  queryChangeHandler: PropTypes.func.isRequired,
  queryTextChangeHandler: PropTypes.func.isRequired,
};

// <div id="slider" className={classes.Slider}>
//
// </div>
// <InputRange
//   minValue={props.sliderBounds.min}
//   maxValue={props.sliderBounds.max}
//   formatLabel={value => ''}
//   value={props.sliderYearPrint}
//   onChange={value => props.sliderChangeHandler(value)}
//   onChangeComplete={value => props.sliderChangeCompleteHandler(value)}
// />
