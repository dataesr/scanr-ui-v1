import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HC_more from 'highcharts/highcharts-more' //module
import HC_accessibility from 'highcharts/modules/accessibility'
HC_accessibility(Highcharts);
HC_more(Highcharts);

const options = {
    chart: {
        type: 'packedbubble',
        height: '100%'
    },
    accessibility: {
        description: 'This is a test, for accessibles packed bubbles'
    },
    title: {
        text: 'Carbon emissions around the world (2014) in million'
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}:</b> {point.y} M CO<sub>2</sub>'
    },
    plotOptions: {
        packedbubble: {
            minSize: '10%',
            maxSize: '60%',
            zMin: 0,
            zMax: 1000,
            layoutAlgorithm: {
                splitSeries: false,
                gravitationalConstant: 0.02
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                filter: {
                    property: 'y',
                    operator: '>',
                    value: 250
                },
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal'
                }
            }
        }
    },
    // colors: ['#FFFF00'], '#FFFF00', '#FF00FF', '#008000', '#00FFFF', '#151061'],
    colors: ['#ffd138'],
    type: 'packed-bubble',
    series: [{
        name: 'Europe',
        data: [{
            name: 'Germany',
            value: 767.1
        }, {
            name: 'Croatia',
            value: 20.7
        },
        {
            name: "Belgium",
            value: 97.2
        },
        {
            name: "Czech Republic",
            value: 111.7
        },
        {
            name: "Netherlands",
            value: 158.1
        },
        {
            name: "Spain",
            value: 241.6
        },
        {
            name: "Ukraine",
            value: 249.1
        },
        {
            name: "Poland",
            value: 298.1
        },
        {
            name: "France",
            value: 323.7
        },
        {
            name: "Romania",
            value: 78.3
        },
        {
            name: "United Kingdom",
            value: 415.4
        }, {
            name: "Turkey",
            value: 353.2
        }, {
            name: "Italy",
            value: 337.6
        },
        {
            name: "Greece",
            value: 71.1
        },
        {
            name: "Austria",
            value: 69.8
        },
        {
            name: "Belarus",
            value: 67.7
        },
        {
            name: "Serbia",
            value: 59.3
        },
        {
            name: "Finland",
            value: 54.8
        },
        {
            name: "Bulgaria",
            value: 51.2
        },
        {
            name: "Portugal",
            value: 48.3
        },
        {
            name: "Norway",
            value: 44.4
        },
        {
            name: "Sweden",
            value: 44.3
        },
        {
            name: "Hungary",
            value: 43.7
        },
        {
            name: "Switzerland",
            value: 40.2
        },
        {
            name: "Denmark",
            value: 40
        },
        {
            name: "Slovakia",
            value: 34.7
        },
        {
            name: "Ireland",
            value: 34.6
        },
        {
            name: "Croatia",
            value: 20.7
        },
        {
            name: "Estonia",
            value: 19.4
        },
        {
            name: "Slovenia",
            value: 16.7
        },
        {
            name: "Lithuania",
            value: 12.3
        },
        {
            name: "Luxembourg",
            value: 10.4
        },
        {
            name: "Macedonia",
            value: 9.5
        },
        {
            name: "Moldova",
            value: 7.8
        },
        {
            name: "Latvia",
            value: 7.5
        },
        {
            name: "Cyprus",
            value: 7.2
        }],
    }]
};

const HighChartsBubbles = () => <div>
  <HighchartsReact
    highcharts={Highcharts}
    options={options}
  />
</div>

export default HighChartsBubbles;
