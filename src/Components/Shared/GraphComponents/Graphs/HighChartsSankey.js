import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HCAccessibility from 'highcharts/modules/accessibility';
import HCExporting from 'highcharts/modules/exporting';
import HCExportingData from 'highcharts/modules/export-data';
import HCRounded from 'highcharts-rounded-corners';
import addSankeyModule from 'highcharts/modules/sankey';
import classes from '../GraphComponents.scss';

addSankeyModule(Highcharts);

HCAccessibility(Highcharts);
HCExporting(Highcharts);
HCExportingData(Highcharts);
HCRounded(Highcharts);


/**
 * HighChartsSankey
 * Url : <br/>
 * Description : Composant HighCharts qui rend les barres horizontales <br/>
 * Responsive : . <br/>
 * Accessible : . <br/>
 * Tests unitaires : . <br/>.
*/

export default class HighChartsSankey extends Component {
  constructor(props) {
    super(props);
    this.chart = React.createRef();
    // this.data = this.props.data;
    this.state = {
      options: null,
    };
    this.exportChartPdf = this.exportChartPdf.bind(this);
    this.exportChartPng = this.exportChartPng.bind(this);
    this.exportChartCsv = this.exportChartCsv.bind(this);
  }

  componentDidMount() {
    this.loadAll();
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.loadAll();
    }
  }

  loadAll() {
    const options = {
      chart: {
        style: { 'font-family': 'Inter UI' },
      },
      credits: {
        enabled: false,
      },
      title: {
        text: '',
      },
      colors: [classes.sanKey1, classes.sanKey2],
      tooltip: {
        pointFormat: '{point.fromNode.name} → {point.toNode.name}: <b>{point.weight}',
      },
      series: [{
        keys: ['from', 'to', 'weight'],
        data: this.props.data,
        type: 'sankey',
      }],
      exporting: {
        filename: this.props.filename,
        buttons: {
          contextButton: {
            enabled: false,
          },
        },
        chartOptions: {
          title: {
            text: this.props.filename,
          },
          credits: {
            enabled: true,
            text: "Source : ScanR, Moteur de la Recherche et de l'Innovation",
          },
        },
      },
    };
    this.setState({ options });
  }

  exportChartPdf() {
    this.chart.current.chart.exportChart({
      type: 'application/pdf',
    });
  }

  exportChartPng() {
    this.chart.current.chart.exportChart({
      type: 'image/png',
    });
  }

  exportChartCsv() {
    this.chart.current.chart.downloadCSV();
  }

  render() {
    const ShareComponent = () => (
      <div className={`d-flex flex-wrap pl-4 pr-4 p-3 ${classes.ShareComponent}`}>
        <div className="mr-auto d-flex align-items-center">
          <div className="pr-1 d-flex align-items-center">
            <span className={`pr-2 ${classes.ShareTexts}`}>Partager</span>
            <button type="button" className={classes.Button}>
              <i className="fas fa-share-alt-square" />
            </button>
          </div>
          <div className="pr-1 d-flex align-items-center">
            <span className={`pr-2 pl-3 ${classes.ShareTexts}`}>Intégrer le code</span>
            <button type="button" className={classes.Button}>
              <i className="fas fa-code" />
            </button>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div className={`pr-2 ${classes.ShareTexts}`}>Télécharger:</div>
          <div className="pr-1 d-flex align-items-center">
            <button type="button" onClick={this.exportChartPdf} className={classes.Button}>
              <i className="fas fa-file-pdf" />
            </button>
            <span className={`pr-1 ${classes.ShareTexts}`}>.pdf</span>
          </div>
          <div className="pr-1 d-flex align-items-center">
            <button type="button" onClick={this.exportChartPng} className={classes.Button}>
              <i className="fas fa-image" />
            </button>
            <span className={`pr-1 ${classes.ShareTexts}`}>.png</span>
          </div>
          <div className="pr-1 d-flex align-items-center">
            <button type="button" onClick={this.exportChartCsv} className={classes.Button}>
              <i className="fas fa-table" />
            </button>
            <span className={classes.ShareTexts}>.csv</span>
          </div>
        </div>
      </div>
    );
    return (
      <div>
        {
          this.state.options !== null
            ? (
              <div>
                <hr className={classes.HorizontalBar} />
                <div className="pl-4">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={this.state.options}
                    ref={this.chart}
                  />
                </div>
                <hr className={classes.HorizontalBar} />
                <ShareComponent />
              </div>
            )
            : <div>Loading...</div>
        }
      </div>
    );
  }
}

HighChartsSankey.defaultProps = {
  data: [],
};

HighChartsSankey.propTypes = {
  filename: PropTypes.string.isRequired,
  data: PropTypes.object,
};
