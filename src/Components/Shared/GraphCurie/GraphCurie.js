import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import HighChartsBar from './Graphs/HighChartsBar';
import GraphHeader from './Shared/GraphHeader';

const params = require('./GraphCurie-data/indicateurs.json');
const isoList = require('./GraphCurie-data/iso3.json');

const url = 'http://10.243.98.74/datastore/curie';

class GraphCurie extends Component {
  constructor(props) {
    super(props);
    this.country = null;
    this.countryList = [this.props.countryCode];
    this.graphIndex = 0;
    this.indic = 0;
    this.state = {
      isMissing: true,
      allData: [],
      filterData: null,
      indicator: '',
    };
    this.getGraphValues = this.getGraphValues.bind(this);
    this.toggleCountry = this.toggleCountry.bind(this);
    this.getData = this.getData.bind(this);
    this.handleIndic = this.handleIndic.bind(this);
  }

  componentDidMount() {
    let i = 0;

    this.country = this.props.countryCode;
    for (i = 0; i < isoList.length; i += 1) {
      if (isoList[i]['alpha-3'] === this.country) {
        this.setState({ isMissing: false });
        break;
      }
    }
    if (i === 249) {
      this.setState({ isMissing: true });
      return;
    }
    this.getGraphValues(this.props.graphType, this.graphIndex);
  }

  async getData(i, label, index) {
    const res = await axios.get(url, {
      params: {
        where: `{"country_code":"${this.countryList[i]}","code":"${params[label][this.indic].unit[index].code}"}`,
      },
    });
    return (res.data);
  }

  async getGraphValues(label, index) {
    // On vérifie si le label existe pour la récupération des indicateurs et des codes
    if (params[label] == null) {
      this.setState({ isMissing: true });
      return;
    }

    // On créé tempData qui va contenir les différentes données
    let tempData = [];
    for (let i = 0; i < this.countryList.length; i += 1) {
      tempData.push(null);
    }

    // On met à jour l'index (définit quel code choisir pour l'indicateur choisi)
    this.graphIndex = index;

    // On reset les données
    this.setState({ filterData: null });

    // On vérifie si la data est dispo afin d'éviter les requêtes inutiles
    // todo: on boucle sur chaque element et si pas dispo on met null, et on le remplace après (il faut [FRA, code, requete where])
    for (let i = 0; i < this.countryList.length; i += 1) {
      for (let j = 0; j < this.state.allData.length; j += 1) {
        if ((this.state.allData[j][0] === this.countryList[i]) && (this.state.allData[j][1] === params[label][0].unit[index].code)) {
          tempData[i] = this.state.allData[2];
        }
      }
    }

    const results = [];
    for (let i = 0; i < tempData.length; i += 1) {
      if (tempData[i] === null) {
        results.push(this.getData(i, label, index));
        // eslint-disable-next-line
        // tempData[i] = await this.getData(i, label, index);
      }

    // alert(params[label][0].unit[index].code);
    // for (let i = 0; i < this.countryList.length; i += 1) {
    //   tempData.push();
    // }
    }
    tempData = await Promise.all(results);
    this.setState({ filterData: tempData });
  }


  // getGraphValues(label, index) {
  //   this.graphIndex = index;
  //   // alert('graph Index: ' + this.graphIndex);
  //   if (params[label] == null) {
  //     this.setState({ isMissing: true });
  //     return;
  //   }
  //   // alert(params[label][0].unit[index].label);
  //   this.setState({ data: null });
  //   // for (let i = 0; i < this.countryList.length; i += 1) {
  //   axios.get(url, {
  //     params: {
  //       where: `{"country_code":"${this.countryList[i]}","code":"${params[label][0].unit[index].code}"}`,
  //     },
  //   })
  //     .then((res) => {
  //       this.data.push(res.data);
  //       // alert(this.data);
  //       this.setState({ data: res.data });
  //     })
  //     .catch(() => {
  //       this.setState({ error: true });
  //     });
  //   // }
  //   // this.setState({ data: this.data });
  // }

  toggleCountry(id) {
    if (!this.countryList.includes(id)) {
      this.countryList.push(id);
    } else {
      const index = this.countryList.indexOf(id);
      if (index > -1) {
        this.countryList.splice(index, 1);
      }
    }
    this.getGraphValues(this.props.graphType, this.graphIndex);
  }

  handleIndic(event) {
    alert(event.target.value);
    if (event.target.value === 'pop') {
      this.indic = 1;
    } else {
      this.indic = 0;
    }
    this.indic = Number(this.indic);
    alert(this.indic);
    this.setState({ indicator: event.target.value });
  }

  render() {
    return (
      <div>
        { this.country === null ? <div>Initializing</div>
          : [this.state.isMissing ? <div>Ce graph est indisponible pour le moment.</div>
            : (
              <div>
                <GraphHeader handleIndic={this.handleIndic} value={this.state.label} />
                <div style={{ width: '100%' }}>
                  <div style={{ float: 'left', width: '97%' }}>Norvège</div>
                  <div style={{ float: 'right', width: '3%', marginTop: '10px' }}><i className="fas fa-info-circle fa-lg" /></div>
                </div>
                <div>
                  {'Welcome to my world ! I can see that you are from '}
                  { this.country }
                </div>
                {this.state.filterData ? <HighChartsBar data={this.state.filterData} /> : null
              }
                <button type="button" onClick={() => this.getGraphValues(this.props.graphType, 0)}>Monnaies locales</button>
                <button type="button" onClick={() => this.getGraphValues(this.props.graphType, 1)}>$PPA</button>
                <input type="checkbox" name="love" value="love" id="FRA" onChange={e => this.toggleCountry(e.target.id)} />
                  FRA
                <input type="checkbox" name="love" value="love" id="CAN" onChange={e => this.toggleCountry(e.target.id)} />
                  CAN
              </div>
            ),
          ]
        }
      </div>
    );
  }
}

export default GraphCurie;

GraphCurie.propTypes = {
  countryCode: PropTypes.string.isRequired,
  graphType: PropTypes.string.isRequired,
  // language: PropTypes.string.isRequired,
  // switchLanguage: PropTypes.func.isRequired,
};
