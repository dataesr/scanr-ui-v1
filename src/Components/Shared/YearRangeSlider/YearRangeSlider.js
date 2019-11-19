import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import classes from './YearRangeSlider.scss';

class YearRangeSlider extends Component {
  constructor(props) {
    super(props);
    this.slider = React.createRef();
    this.lowThumb = React.createRef();
    this.highThumb = React.createRef();
    this.state = {
      sliderLowPosition: null,
      sliderHighPosition: null,
      mouseDown: null,
      shiftX: null,
      html: null,
      years: null,
      lowYear: null,
      highYear: null,
    };
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      this.setHistogram();
    }
  }

  handleLowMouseUp = (e) => {
    const { clientX } = e;
    const {
      positions,
      shiftX,
      years,
      highYear,
    } = this.state;
    const { left } = this.slider.current.getBoundingClientRect();
    const sliderLowPosition = clientX - shiftX - left;
    const absPosition = positions.map(position => Math.abs((position - sliderLowPosition - this.lowThumb.current.offsetWidth / 2)));
    const newPosition = positions[absPosition.indexOf(Math.min(...absPosition))] - this.lowThumb.current.offsetWidth / 2;
    const newYear = years[absPosition.indexOf(Math.min(...absPosition))];
    this.setState({
      mouseDown: null,
      shiftX: null,
      lowYear: newYear,
      sliderLowPosition: newPosition,
    });
    window.removeEventListener('mousemove', this.handleLowMouseMove);
    window.removeEventListener('mouseup', this.handleLowMouseUp);
    this.props.handleSliderRange(newYear, highYear);
  }

  handleHighMouseUp = (e) => {
    const { clientX } = e;
    const {
      positions,
      shiftX,
      years,
      lowYear,
    } = this.state;
    const { left } = this.slider.current.getBoundingClientRect();
    const sliderHighPosition = clientX - shiftX - left;
    const absPosition = positions.map(position => Math.abs((position - sliderHighPosition - this.highThumb.current.offsetWidth / 2)));
    const newPosition = positions[absPosition.indexOf(Math.min(...absPosition))] - this.highThumb.current.offsetWidth / 2;
    const newYear = years[absPosition.indexOf(Math.min(...absPosition))];
    this.setState({
      mouseDown: null,
      shiftX: null,
      highYear: newYear,
      sliderHighPosition: newPosition,
    });
    window.removeEventListener('mousemove', this.handleHighMouseMove);
    window.removeEventListener('mouseup', this.handleHighMouseUp);
    this.props.handleSliderRange(lowYear, newYear);
  }

  handleOnDragStart = () => (false)

  handleLowMouseDown = (e) => {
    window.addEventListener('mousemove', this.handleLowMouseMove);
    window.addEventListener('mouseup', this.handleLowMouseUp);
    const { clientX } = e;
    const shiftX = clientX - this.lowThumb.current.getBoundingClientRect().left;
    this.setState({
      mouseDown: 'low',
      lowYear: null,
      shiftX,
    });
  }

  handleHighMouseDown = (e) => {
    window.addEventListener('mousemove', this.handleHighMouseMove);
    window.addEventListener('mouseup', this.handleHighMouseUp);
    const { clientX } = e;
    const shiftX = clientX - this.highThumb.current.getBoundingClientRect().left;
    this.setState({
      mouseDown: 'high',
      highYear: null,
      shiftX,
    });
  }


  handleLowMouseMove = (e) => {
    const { clientX } = e;
    const { mouseDown, shiftX } = this.state;
    const { left } = this.slider.current.getBoundingClientRect();
    if (mouseDown !== 'low') return;
    let sliderLowPosition = clientX - shiftX - left;
    if (sliderLowPosition < 0 - this.lowThumb.current.offsetWidth / 2) {
      sliderLowPosition = 0 - this.lowThumb.current.offsetWidth / 2;
    }
    const rightEdge = this.slider.current.offsetWidth - this.lowThumb.current.offsetWidth / 2;
    if (sliderLowPosition > rightEdge) {
      sliderLowPosition = rightEdge;
    }
    this.lowThumb.current.style.left = `${sliderLowPosition}px`;
  }

  handleHighMouseMove = (e) => {
    const { clientX } = e;
    const { mouseDown, shiftX } = this.state;
    const { left } = this.slider.current.getBoundingClientRect();
    if (mouseDown !== 'high') return;
    let sliderHighPosition = clientX - shiftX - left;
    if (sliderHighPosition < 0 - this.highThumb.current.offsetWidth / 2) {
      sliderHighPosition = 0 - this.highThumb.current.offsetWidth / 2;
    }
    const rightEdge = this.slider.current.offsetWidth - this.highThumb.current.offsetWidth / 2;
    if (sliderHighPosition > rightEdge) {
      sliderHighPosition = rightEdge;
    }
    this.highThumb.current.style.left = `${sliderHighPosition}px`;
  }

  fillMissingYears = () => {
    const data = [...this.props.data];
    const years = data.map(entry => parseInt(entry.value, 10));
    const maxBound = (this.props.maxBound) ? this.props.maxBound : Math.max(...years);
    const minBound = (this.props.minBound) ? this.props.minBound : Math.min(...years);
    const allYears = [...Array(maxBound).keys()].filter(year => ![...Array(minBound).keys()].includes(year));
    const diffYears = allYears.filter(year => !years.includes(year));
    diffYears.forEach((year) => {
      data.push({
        value: `${year}`,
        count: 0,
      });
    });
    return data;
  }

  setHistogram = () => {
    const html = [];
    const data = this.fillMissingYears();
    if (data.length > 0) {
      const years = data.map(entry => parseInt(entry.value, 10)).sort((a, b) => (a - b));
      const maxCount = Math.max(...data.map(entry => entry.count));
      const width = this.slider.current.getBoundingClientRect().width;
      const sortedData = data.sort((a, b) => (parseInt(a.value, 10) - parseInt(b.value, 10)));
      let sliderLowPosition = 0 - this.lowThumb.current.offsetWidth / 2;
      let sliderHighPosition = this.slider.current.getBoundingClientRect().width - this.highThumb.current.offsetWidth / 2;
      let { min, max } = this.props;
      if (!min) {
        min = years[0];
      }
      if (!max) {
        max = years[years.length - 1];
      }
      const positions = data.map((entry, index) => (index * width / data.length + (width / data.length) / 2));
      let lowYear = years[0];
      let highYear = years[years.length - 1];
      sortedData.forEach((entry, index) => {
        const color = (parseInt(entry.value, 10) >= parseInt(min, 10) && parseInt(entry.value, 10) <= parseInt(max, 10))
          ? 'Selection'
          : 'OutSelection';
        const height = Math.round((entry.count / maxCount) * 100);
        if (parseInt(entry.value, 10) === parseInt(min, 10)) {
          lowYear = years[index];
          sliderLowPosition = positions[index] - this.lowThumb.current.offsetWidth / 2;
        }
        if (parseInt(entry.value, 10) === parseInt(max, 10)) {
          highYear = years[index];
          sliderHighPosition = positions[index] - this.highThumb.current.offsetWidth / 2;
        }
        html.push(
          <React.Fragment>
            <div
              role="button"
              tabIndex={0}
              onClick={this.props.handleSliderSelect ? this.props.handleSliderSelect : null}
              onKeyPress={this.props.handleSliderSelect ? this.props.handleSliderSelect : null}
              key={entry.value}
              id={entry.value}
              data-for={entry.value}
              data-tip
              className={`d-flex align-items-end ${classes.transparent}`}
              style={{ width: `${width / data.length}px` }}
            >
              <div
                role="button"
                tabIndex={0}
                className={`${classes.FullBar} ${classes[color]}`}
                style={{ width: `${width / data.length}px`, height: `${height}%` }}
                onClick={this.props.handleSliderSelect ? this.props.handleSliderSelect : null}
                onKeyPress={this.props.handleSliderSelect ? this.props.handleSliderSelect : null}
                id={entry.value}
                data-for={entry.value}
                data-tip
              />
            </div>
            <ReactTooltip id={entry.value} type="info">
              <span>{`${entry.count} publications -- ${entry.value}`}</span>
            </ReactTooltip>
          </React.Fragment>,
        );
      });
      this.setState({
        html,
        positions,
        years,
        lowYear,
        highYear,
        sliderLowPosition,
        sliderHighPosition,
      });
    }
    return null;
  }

  render() {
    return (
      <div className={`col-lg-4 ${classes.RangeSlider}`}>
        <div className="d-flex flex-column">
          <div className={classes.TitleFilter} htmlFor="slider">
            {this.props.language === 'fr' ? 'Sélectionner une période' : 'Select a period'}
            <div className={`d-flex align-items-end ${classes.RangeBox}`}>
              {(this.state.html) ? this.state.html.map(bar => bar) : null}
            </div>
            <div className={classes.sliderS}>
              <div ref={this.slider} className={`${classes.slider}`}>
                <div
                  role="button"
                  tabIndex={0}
                  className={`${classes.thumb} ${classes.low}`}
                  style={{ left: `${this.state.sliderLowPosition}px` }}
                  onMouseDown={this.handleLowMouseDown}
                  ref={this.lowThumb}
                >
                  <div className={classes.Years}>{this.state.lowYear}</div>
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  className={`${classes.thumb} ${classes.high}`}
                  style={{ left: `${this.state.sliderHighPosition}px` }}
                  onMouseDown={this.handleHighMouseDown}
                  ref={this.highThumb}
                >
                  <div className={classes.Years}>{this.state.highYear}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

YearRangeSlider.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.array,
  min: PropTypes.number,
  max: PropTypes.number,
  minBound: PropTypes.number,
  maxBound: PropTypes.number,
  handleSliderRange: PropTypes.func.isRequired,
  handleSliderSelect: PropTypes.func.isRequired,
};
YearRangeSlider.defaultProps = {
  data: [
    { value: '2012', count: 4 },
    { value: '2015', count: 7 },
  ],
};

export default YearRangeSlider;
