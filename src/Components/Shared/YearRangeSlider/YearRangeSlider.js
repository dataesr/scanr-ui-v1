import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import classes from './YearRangeSlider.scss';

class YearRangeSlider extends Component {
  constructor(props) {
    super(props);
    this.slider = React.createRef();
    this.lowThumb = React.createRef();
    this.state = {
      // min: null,
      // max: null,
      sliderLowPosition: null,
      sliderHighPosition: null,
      mouseDown: false,
      shiftX: null,
      html: null,
    };
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      this.setHistogram();
    }
  }

  handleMouseUp = () => {
    console.log('i am up');
    this.setState({
      mouseDown: false,
      shiftX: null,
    });
  }

  handleOnDragStart = () => (false)

  handleLowMouseDown = (e) => {
    e.preventDefault();
    const { clientX } = e;
    const shiftX = clientX - this.lowThumb.current.getBoundingClientRect().left;
    this.setState({
      mouseDown: true,
      shiftX,
    });
  }

  handleHighMouseDown = ({ clientX }) => {
    const shiftX = clientX;
    this.setState({
      mouseDown: true,
      shiftX,
    });
  }


  handleLowMouseMove = (e) => {
    e.preventDefault();
    const { clientX } = e;
    const { mouseDown, shiftX } = this.state;
    const { left } = this.slider.current.getBoundingClientRect();
    if (!mouseDown) return;
    let sliderLowPosition = clientX - shiftX - left;
    console.log(clientX, shiftX, left);
    console.log(clientX - shiftX - left);
    if (sliderLowPosition < 0) {
      sliderLowPosition = 0;
    }
    const rightEdge = this.slider.current.offsetWidth - this.lowThumb.current.offsetWidth;
    if (sliderLowPosition > rightEdge) {
      sliderLowPosition = rightEdge;
    }
    this.lowThumb.current.style.left = `${sliderLowPosition}px`;
    // this.setState({ sliderLowPosition });
  }
  // handleHighMouseMove = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   const { clientX } = e
  //   const { mouseDown } = this.state;
  //   if (!mouseDown) return;
  //   let sliderHighPosition = 100 - (100 * (clientX - this.slider.current.getBoundingClientRect().left) / this.slider.current.getBoundingClientRect().width);
  //   console.log(sliderHighPosition);
  //   if (sliderHighPosition < 0) {
  //     this.setState({ sliderHighPosition: 0 });
  //   };
  //   if (sliderHighPosition > 100) {
  //     this.setState({ sliderHighPosition: 100 });
  //   };
  //   this.setState({ sliderHighPosition });
  // }

  fillMissingYears = () => {
    const data = [...this.props.data];
    const years = data.map(entry => parseInt(entry.value, 10));
    const maxBound = Math.max(...years);
    const minBound = Math.min(...years);
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
    console.log('SetHistogram');
    const html = [];
    const data = this.fillMissingYears();
    if (data.length > 0) {
      // const years = data.map(entry => entry.count)
      const maxCount = Math.max(...data.map(entry => entry.count));
      const width = this.slider.current.getBoundingClientRect().width;
      const sortedData = data.sort((a, b) => (parseInt(a.value, 10) - parseInt(b.value, 10)));
      const sliderLowPosition = 0;
      const sliderHighPosition = this.slider.current.getBoundingClientRect().right;
      sortedData.forEach((entry, index) => {
        const { min, max } = this.props;
        const color = (parseInt(entry.value, 10) >= parseInt(min, 10) && parseInt(entry.value, 10) <= parseInt(max, 10))
          ? 'Selection'
          : 'OutSelection';
        const height = Math.round((entry.count / maxCount) * 100);
        // if (parseInt(entry.value, 10) === parseInt(min, 10)) {
        //   sliderLowPosition = index * width + width / 2
        // }
        // if (parseInt(entry.value, 10) === parseInt(max, 10)) {
        //   sliderHighPosition = index * width - width / 2
        // }
        html.push(
          <React.Fragment>
            <div
              role="button"
              tabIndex={0}
              onClick={this.props.handleSingleYearSelection ? this.props.handleSingleYearSelection : null}
              onKeyPress={this.props.handleSingleYearSelection ? this.props.handleSingleYearSelection : null}
              key={height}
              data-tip
              data-for={entry.value}
              id={entry.value}
              className={`${classes.FullBar} ${classes[color]}`}
              style={{ width: `${width}px`, height: `${height}%` }}
            />
            <ReactTooltip id={entry.value} type="info">
              <span>{`${entry.count} publications -- ${entry.value}`}</span>
            </ReactTooltip>
          </React.Fragment>,
        );
      });
      this.setState({
        html,
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
                  onMouseUp={this.handleMouseUp}
                  onMouseMove={this.handleLowMouseMove}
                  onDragStart={this.handleOnDragStart}
                  ref={this.lowThumb}
                />
                <div
                  role="button"
                  tabIndex={0}
                  className={`${classes.sliderButton} ${classes.low}`}
                  style={{ left: `${this.state.sliderHighPosition}px` }}
                  onMouseDown={this.handleHighMouseDown}
                  onMouseUp={this.handleMouseUp}
                  onMouseMove={this.handleHighMouseMove}
                />
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
  handleSingleYearSelection: PropTypes.func,
};
YearRangeSlider.defaultProps = {
  data: [
    { value: '2012', count: 4 },
    { value: '2015', count: 7 },
  ],
};

export default YearRangeSlider;
