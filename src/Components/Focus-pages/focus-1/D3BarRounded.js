import React, { Component } from 'react';
import * as d3 from 'd3';

class RoundedBar extends Component {
    componentDidMount() {
        this.drawChart();
    }

    drawChart() {

const data = [
    { name: "Richards", value: 40},
    { name: "Sue",      value: 25 },
    { name: "Johnny",   value: 15 },
    { name: "Ben",      value: 10}
  ];
  
  const margin = { top: 20, right: 20, bottom: 40, left: 45 }
  const svgWidth = 960;
  const svgHeight = 500;
  const width = svgWidth - margin.left - margin.right
  const height = svgHeight - margin.top - margin.bottom
  
  const svg = d3
    .select('#d3')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight);
  
  const graphArea = svg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  const x = d3.scaleBand()
    .rangeRound([0, width])
    .domain(data.map(d => d.name))
    .padding(0.4);
  
  const y = d3.scaleLinear()
    .range([height, 0])
    .domain([
      d3.min(data, d => d.value) - 5,
      d3.max(data, d => d.value) + 5
    ])
    .nice();
  
  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y).ticks(5);;
  
  graphArea
    .append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis);
  
  graphArea
    .append('g')
    .attr('class', 'axis')
    .call(yAxis);
  
  const rx = 50;
  const ry = 50;
  
  graphArea
     .selectAll("bar")
     .data(data)
     .enter().append("path")
        .style("fill", "#c51b8a") 
        .attr("d", item => `
          M${x(item.name)},${y(item.value) + ry}
          a${rx},${ry} 0 0 1 ${rx},${-ry}
          h${x.bandwidth() - 2 * rx}
          a${rx},${ry} 0 0 1 ${rx},${ry}
          v${height - y(item.value) - ry}
          h${-(x.bandwidth())}Z
        `);
    }
    render() {
        return (<div id={"#" + this.props.id}></div>)
    }
}

RoundedBar.defaultProps = {
    id: 123
}

export default RoundedBar;