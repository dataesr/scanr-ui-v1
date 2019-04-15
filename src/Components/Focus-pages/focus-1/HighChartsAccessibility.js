import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HC_rounded from 'highcharts-rounded-corners'

HC_rounded(Highcharts)

const options = {
    chart: {
        type: 'bar'
    },
    // labels: {
    //     align: 'right',
    //     x: -1,
    //     y: 0
    // },
    title: {
        text: ''
    },
    xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
        labels:
        {
            // enabled: false
            align: 'left',
            x: 0
        }
    },
    yAxis: {
        min: 0,
        gridLineWidth: 0,
        minorGridLineWidth: 0,
        title: {
            text: ''
            // text: 'Total fruit consumption'
        },
        labels:
        {
            enabled: false
        }
    },
    legend: {
        hide: true
        // reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    series: [{
        name: 'John',
        data: [5, 3, 4, 7, 2],
        borderRadiusTopLeft: '80%',
        borderRadiusTopRight: '80%'
    }, {
        name: 'Jane',
        data: [2, 2, 3, 2, 1]
    }, {
        name: 'Joe',
        data: [3, 4, 4, 2, 5]
    }]
}

const HighChartsBar = () => <div>
  <HighchartsReact
    highcharts={Highcharts}
    options={options}
  />
</div>

export default HighChartsBar