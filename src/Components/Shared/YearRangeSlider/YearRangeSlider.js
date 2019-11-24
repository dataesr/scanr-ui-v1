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
      touchDown: null,
      touchIdentifier: null,
      shiftX: null,
      html: null,
      years: null,
      lowYear: null,
      highYear: null,
    };
  }

  componentDidMount = () => {
    this.setHistogram();
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.data !== this.props.data || prevProps.min !== this.props.min || prevProps.max !== this.props.max) {
      this.setHistogram();
    }
  }

  handleActionEnd = (clientX, thumb) => {
    const {
      positions,
      shiftX,
      years,
    } = this.state;
    const { left } = this.slider.current.getBoundingClientRect();
    const sliderPosition = clientX - shiftX - left;
    const absPosition = positions.map(position => (
      Math.abs((position - sliderPosition - this[thumb].current.offsetWidth / 2))));
    const newPosition = positions[
      absPosition.indexOf(Math.min(...absPosition))]
      - this[thumb].current.offsetWidth / 2;
    const newYear = years[absPosition.indexOf(Math.min(...absPosition))];
    return { newYear, newPosition };
  }

  handleLowTouchStart = (e) => {
    e.preventDefault();
    const { touches } = e;
    window.addEventListener('touchmove', this.handleLowTouchMove);
    window.addEventListener('touchend', this.handleLowEnd);
    const { mouseDown } = this.state;
    if (mouseDown) return;
    if (touches.length > 1) return;
    const { clientX, identifier } = touches[0];
    const shiftX = clientX - this.lowThumb.current.getBoundingClientRect().left;
    this.setState({
      lowYear: null,
      mouseDown: null,
      touchDown: 'low',
      touchIdentifier: identifier,
      shiftX,
    });
  }

  handleHighTouchStart = (e) => {
    e.preventDefault();
    const { touches } = e;
    window.addEventListener('touchmove', this.handleHighTouchMove);
    window.addEventListener('touchend', this.handleHighEnd);
    const { mouseDown } = this.state;
    if (mouseDown) return;
    if (touches.length > 1) return;
    const { clientX, identifier } = touches[0];
    const shiftX = clientX - this.highThumb.current.getBoundingClientRect().left;
    this.setState({
      highYear: null,
      mouseDown: null,
      touchDown: 'high',
      touchIdentifier: identifier,
      shiftX,
    });
  }

  handleLowTouchMove = (e) => {
    e.preventDefault();
    const { changedTouches } = e;
    const {
      mouseDown,
      touchDown,
      touchIdentifier,
      shiftX,
    } = this.state;
    const { left } = this.slider.current.getBoundingClientRect();
    if (mouseDown) return;
    if (touchDown !== 'low') return;
    for (let i = 0; i < changedTouches.length; i += 1) {
      const { identifier, clientX } = changedTouches[i];
      if (identifier === touchIdentifier) {
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
    }
  }

  handleHighTouchMove = (e) => {
    e.preventDefault();
    const { changedTouches } = e;
    const {
      mouseDown,
      touchDown,
      touchIdentifier,
      shiftX,
    } = this.state;
    const { left } = this.slider.current.getBoundingClientRect();
    if (mouseDown) return;
    if (touchDown !== 'high') return;
    for (let i = 0; i < changedTouches.length; i += 1) {
      const { identifier, clientX } = changedTouches[i];
      if (identifier === touchIdentifier) {
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
    }
  }

  handleLowMouseDown = (e) => {
    e.preventDefault();
    const { touchDown } = this.state;
    if (touchDown) return;
    window.addEventListener('mousemove', this.handleLowMouseMove);
    window.addEventListener('mouseup', this.handleLowEnd);
    const { clientX } = e;
    const shiftX = clientX - this.lowThumb.current.getBoundingClientRect().left;
    this.setState({
      mouseDown: 'low',
      lowYear: null,
      shiftX,
    });
  }

  handleHighMouseDown = (e) => {
    e.preventDefault();
    const { touchDown } = this.state;
    if (touchDown) return;
    window.addEventListener('mousemove', this.handleHighMouseMove);
    window.addEventListener('mouseup', this.handleHighEnd);
    const { clientX } = e;
    const shiftX = clientX - this.highThumb.current.getBoundingClientRect().left;
    this.setState({
      mouseDown: 'high',
      highYear: null,
      shiftX,
    });
  }

  handleLowMouseMove = (e) => {
    e.preventDefault();
    const { clientX } = e;
    const { mouseDown, touchDown, shiftX } = this.state;
    const { left } = this.slider.current.getBoundingClientRect();
    if (touchDown) return;
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
    e.preventDefault();
    const { clientX } = e;
    const { mouseDown, touchDown, shiftX } = this.state;
    const { left } = this.slider.current.getBoundingClientRect();
    if (touchDown) return;
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

  handleLowEnd = (e) => {
    e.preventDefault();
    const { highYear, touchDown, touchIdentifier } = this.state;
    let clientX = null;
    if (touchDown) {
      const { changedTouches } = e;
      if (changedTouches[changedTouches.length - 1].identifier !== touchIdentifier) return;
      clientX = changedTouches[changedTouches.length - 1].clientX;
      window.removeEventListener('touchend', this.handleLowEnd);
      window.removeEventListener('touchmove', this.handleLowTouchMove);
    } else {
      clientX = e.clientX;
      window.removeEventListener('mousemove', this.handleLowMouseMove);
      window.removeEventListener('mouseup', this.handleLowEnd);
    }
    const { newYear, newPosition } = this.handleActionEnd(clientX, 'lowThumb');
    this.setState({
      mouseDown: null,
      touchDown: null,
      touchIdentifier: null,
      shiftX: null,
      lowYear: newYear,
      sliderLowPosition: newPosition,
    });
    this.props.handleSliderRange(
      Math.min(highYear, newYear),
      Math.max(highYear, newYear),
    );
  }

  handleHighEnd = (e) => {
    e.preventDefault();
    const { lowYear, touchDown, touchIdentifier } = this.state;
    let clientX = null;
    if (touchDown) {
      const { changedTouches } = e;
      if (changedTouches[changedTouches.length - 1].identifier !== touchIdentifier) return;
      clientX = changedTouches[changedTouches.length - 1].clientX;
      window.removeEventListener('touchmove', this.handleHighTouchMove);
      window.removeEventListener('touchend', this.handleHighEnd);
    } else {
      clientX = e.clientX;
      window.removeEventListener('mousemove', this.handleHighMouseMove);
      window.removeEventListener('mouseup', this.handleHighEnd);
    }
    const { newYear, newPosition } = this.handleActionEnd(clientX, 'highThumb');
    this.setState({
      mouseDown: null,
      touchDown: null,
      touchIdentifier: null,
      shiftX: null,
      highYear: newYear,
      sliderHighPosition: newPosition,
    });
    this.props.handleSliderRange(
      Math.min(lowYear, newYear),
      Math.max(lowYear, newYear),
    );
  }

  range = (start, end) => (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);

  fillMissingYears = () => {
    const data = [...this.props.data];
    const years = data.map(entry => parseInt(entry.value, 10));
    const maxBound = (this.props.maxBound) ? this.props.maxBound : Math.max(...years);
    const minBound = (this.props.minBound) ? this.props.minBound : Math.min(...years);
    const allYears = this.range(minBound, maxBound);
    const diffYears = allYears.filter(year => !years.includes(year));
    diffYears.forEach((year) => {
      data.push({
        value: `${year}`,
        count: 0,
      });
    });
    return data.filter(year => (year.value <= maxBound && year.value >= minBound));
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
        const backgroundColor = (parseInt(entry.value, 10) >= parseInt(min, 10) && parseInt(entry.value, 10) <= parseInt(max, 10))
          ? this.props.barColor || '#003259'
          : this.props.unselectedBarColor || '#4c6f8b';
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
              onClick={() => this.props.handleSliderRange(entry.value, entry.value)}
              onKeyPress={() => this.props.handleSliderRange(entry.value, entry.value)}
              key={entry.value}
              id={entry.value}
              data-for={entry.value}
              data-tip
              className={`d-flex align-items-end ${classes.histogramBar}`}
              style={{ width: `${width / data.length}px` }}
            >
              <div
                role="button"
                tabIndex={0}
                className={classes.histogramBar}
                style={{ width: `${width / data.length}px`, height: `${height}%`, backgroundColor }}
                onClick={() => this.props.handleSliderRange(entry.value, entry.value)}
                onKeyPress={() => this.props.handleSliderRange(entry.value, entry.value)}
                id={entry.value}
                data-for={entry.value}
                data-tip
              />
            </div>
            <ReactTooltip id={entry.value} type="info">
              <span>{(entry.tooltip) ? entry.tooltip : `${entry.value}: ${entry.count}`}</span>
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
    const height = (this.props.height) ? `${this.props.height}px` : '40px';
    return (
      <div className="w-100 my-4">
        <div className="d-flex flex-column">
          <div className={classes.label} htmlFor="slider">
            {this.props.label}
          </div>
          <div className="d-flex align-items-end w-100" style={{ height }}>
            {(this.state.html) ? this.state.html.map(bar => bar) : null}
          </div>
          <div className={classes.slider} ref={this.slider}>
            <div
              ref={this.slider}
              className={classes.slider}
              style={{
                backgroundColor: `${this.props.barColor}`,
                marginLeft: `calc(${this.state.sliderLowPosition}px + 10px)`,
                marginRight: `calc(100% - ${this.state.sliderHighPosition}px - 10px)`,
              }}
            />
          </div>
          <div
            role="button"
            id="thumbLow"
            tabIndex={0}
            className={`${classes.thumb} ${classes.thumbLow}`}
            style={{ left: `${this.state.sliderLowPosition}px` }}
            onMouseDown={this.handleLowMouseDown}
            onTouchStart={this.handleLowTouchStart}
            ref={this.lowThumb}
          >
            {/* eslint-disable-next-line */}
            <label htmlFor="thumbLow" className={classes.thumbLabel}>
              {this.state.lowYear}
            </label>
          </div>
          <div
            role="button"
            id="thumbHigh"
            tabIndex={0}
            className={`${classes.thumb} ${classes.thumbHigh}`}
            style={{ left: `${this.state.sliderHighPosition}px` }}
            onMouseDown={this.handleHighMouseDown}
            onTouchStart={this.handleHighTouchStart}
            ref={this.highThumb}
          >
            {/* eslint-disable-next-line */}
            <label htmlFor="thumbHigh" className={classes.thumbLabel}>
              {this.state.highYear}
            </label>
          </div>
        </div>
      </div>
    );
  }
}

YearRangeSlider.propTypes = {
  height: PropTypes.number,
  barColor: PropTypes.string,
  unselectedBarColor: PropTypes.string,
  label: PropTypes.string,
  data: PropTypes.array,
  min: PropTypes.number,
  max: PropTypes.number,
  minBound: PropTypes.number,
  maxBound: PropTypes.number,
  handleSliderRange: PropTypes.func.isRequired,
};
YearRangeSlider.defaultProps = {
  data: [],
};

export default YearRangeSlider;
