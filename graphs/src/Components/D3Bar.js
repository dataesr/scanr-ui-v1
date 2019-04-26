import React, { Component } from 'react';
import * as d3 from 'd3';
import {scaleLinear} from 'd3-scale'
import {scaleBand} from 'd3-scale'

class Bar extends Component {
    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        var data = [{
            "name": "Apples",
            "value": 20,
        },
        {
            "name": "Bananas",
            "value": 12,
        },
        {
            "name": "Grapes",
            "value": 19,
        },
        {
            "name": "Lemons",
            "value": 5,
        },
        {
            "name": "Limes",
            "value": 16,
        },
        {
            "name": "Oranges",
            "value": 26,
        },
        {
            "name": "Pears",
            "value": 30,
        }];

        //sort bars based on value
        data = data.sort(function (a, b) {
            return d3.ascending(a.value, b.value);
        })

        //set up svg using margin conventions - we'll need plenty of room on the left for labels
        var margin = {
            top: 15,
            right: 25,
            bottom: 15,
            left: 60
        };

        var width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var svg = d3.select("#root").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = scaleLinear()
            .range([0, width])
            .domain([0, d3.max(data, function (d) {
                return d.value;
            })]);

        var y = scaleBand()
            .range([height, 0])
            .round(.1)
            .domain(data.map(function (d) {
                return d.name;
            }));

        //make y axis to show bar names
        var yAxis = d3.axisLeft(y)
            //no tick marks
            .tickSize(0)

        var gy = svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)

        var bars = svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("g")

        //append rects
        bars.append("rect")
            .attr("class", "bar")
            .attr("y", function (d) {
                return y(d.name);
            })
            .attr("height", y.bandwidth())
            .attr("x", 0)
            .attr("width", function (d) {
                return x(d.value);
            });

        //add a value label to the right of each bar
        bars.append("text")
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .attr("y", function (d) {
                return y(d.name) + y.bandwidth() / 2 + 4;
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", function (d) {
                return x(d.value) + 3;
            })
            .text(function (d) {
                return d.value;
            });
    }
    render() {
        return (<div id={"#" + this.props.id}></div>)
    }
}

Bar.defaultProps = {
    id: 123
}

export default Bar;