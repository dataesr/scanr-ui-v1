// Skip to content
// Search or jump to…
//
// Pull requests
// Issues
// Marketplace
// Explore
//
// @dataesr
// Learn Git and GitHub without any code!
// Using the Hello World guide, you’ll start a branch, write comments, and open a pull request.
//
//
// 1
// 20jerem1508/scanr-v2 Private
//  Code Issues 0 Pull requests 0 Actions Projects 0 Wiki Security Insights
// scanr-v2/src/Components/Focus-pages/Focus.js
// @ericjeangirard ericjeangirard focus these
// 2e0e852 14 hours ago
// @ericjeangirard@Muffwin@jerem1508@folland87
// 393 lines (374 sloc)  14.9 KB
//
// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import axios from 'axios';
// import MetaTags from 'react-meta-tags';
//
// // Composants
// import Footer from '../Shared/Footer/Footer';
// import Header from '../Shared/Header/Header';
// // import LexiconPanel from '../../Shared/Lexicon/LexiconPanel';
// import GraphComponent from '../Shared/GraphComponents/GraphComponents';
// import HeaderTitle from '../Shared/HeaderTitle/HeaderTitle';
// import LastFocus from '../Shared/LastFocus/LastFocus';
// import getSelectKey from '../../Utils/getSelectKey';
//
// import classes from './Focus.scss';
//
// // const authorization = 'YWRtaW46ZGF0YUVTUjIwMTk=';
//
// /**
//  * Focus
//  * Url : /focus/$id <br/>
//  * Description : Page qui va charger GraphComponent <br/>
//  * Responsive : . <br/>
//  * Accessible : . <br/>
//  * Tests unitaires : . <br/>.
// */
//
// let params = '';
//
// export default class FocusList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       cData: [],
//       error: false,
//     };
//   }
//
//
//   componentDidMount() {
//     const filename = `./Focus-data/${this.props.match.params.id}.json`;
//     try {
//       // eslint-disable-next-line
//       params = require(`${filename}`);
//     } catch (error) {
//       return;
//     }
//
//     let componentsData = [];
//     params.components.forEach((component, position) => {
//       const queryField = component.queryField;
//       const filters = {};
//       filters[queryField] = {
//         type: 'MultiValueSearchFilter',
//         op: 'all',
//         values: component.queryValue,
//       };
//       if (component.yearMin && component.yearMax) {
//         filters.publicationDate = {
//           type: 'DateRangeFilter',
//           min: new Date(Date.UTC(component.yearMin, 1, 1)).toISOString(),
//           max: new Date(Date.UTC(component.yearMax, 11, 31)).toISOString(),
//           missing: false,
//         };
//       }
//       const aggregations = {};
//       let facets = [];
//       const regex = /\./gi;
//       if (component.facet !== undefined) {
//         facets = component.facet;
//       }
//       facets.forEach((facet) => {
//         const aggregId = facet.replace(regex, '_');
//         aggregations[aggregId] = {
//           field: facet,
//           filters: {},
//           min_doc_count: 1,
//           order: { direction: 'DESC', type: 'COUNT' },
//           size: component.facetSize ? component.facetSize : 50,
//         };
//       });
//       const pageSize = (component.pageSize) ? (component.pageSize) : 20;
//       let opendata = {};
//       if (component.dataType === 'opendata') {
//         const opendataFilename = `./Focus-data/${component.dataFile}`;
//         // eslint-disable-next-line
//         opendata = require(`${opendataFilename}`);
//       }
//       axios.post(component.url_api,
//         {
//           filters,
//           aggregations,
//           pageSize,
//           sourceFields: component.sourceFields,
//         })
//         .then((res) => {
//           let data = [];
//           let tooltipText = '';
//           if (component.dataType === 'opendata') {
//             if (component.type === 'map' && component.award === 'IUF') {
//               opendata.records.forEach((e) => {
//                 try {
//                   const dataElement = {
//                     id: e.fields.numero_national_de_structure_de_recherche.concat(' ', e.fields.nom, e.fields.prenom),
//                     position: [e.geometry.coordinates[1], e.geometry.coordinates[0]],
//                     infos: ['Etablissement : '.concat(e.fields.lib_uai), 'Structure : '.concat(e.fields.structure_recherche), 'Lauréat.e : '.concat(e.fields.prenom, ' ', e.fields.nom)],
//                   };
//                   data.push(dataElement);
//                 } catch (error) {
//                 // eslint-disable-no-empty
//                 }
//               });
//             } else if (component.type === 'treemap' && component.award === 'IUF') {
//               data = [{
//                 id: 'F',
//                 name: 'Femmes',
//                 color: '#f75f00',
//               }, {
//                 id: 'H',
//                 name: 'Hommes',
//                 color: '#43ab92',
//               }];
//               const typeNomination = { H: {}, F: {} };
//               opendata.records.forEach((e) => {
//                 const nomination = e.fields.type_nomination;
//                 const gender = e.fields.sexe.substring(0, 1).toUpperCase();
//                 if (typeNomination[gender][nomination] === undefined) {
//                   typeNomination[gender][nomination] = { count: 0 };
//                 }
//                 typeNomination[gender][nomination].count += 1;
//               });
//               Object.keys(typeNomination).forEach((g) => {
//                 Object.keys(typeNomination[g]).forEach((nomin) => {
//                   const subCount = typeNomination[g][nomin].count;
//                   data.push({ name: nomin, value: subCount, parent: g });
//                 });
//               });
//             } else if (component.type === 'packedbubble' && component.award === 'IUF') {
//               const disciplines = {};
//               opendata.records.forEach((e) => {
//                 const mainDiscipline = e.fields.arborescence_disciplinaire.split('>')[0];
//                 if (disciplines[mainDiscipline] === undefined) {
//                   disciplines[mainDiscipline] = {};
//                 }
//                 const subDiscipline = e.fields.arborescence_disciplinaire.split('>')[2];
//                 if (disciplines[mainDiscipline][subDiscipline] === undefined) {
//                   disciplines[mainDiscipline][subDiscipline] = { count: 0 };
//                 }
//                 disciplines[mainDiscipline][subDiscipline].count += 1;
//               });
//               Object.keys(disciplines).forEach((discipline) => {
//                 const subdata = [];
//                 Object.keys(disciplines[discipline]).forEach((subdiscipline) => {
//                   const subCount = disciplines[discipline][subdiscipline].count;
//                   subdata.push({ name: subdiscipline, value: subCount });
//                 });
//                 data.push({ name: discipline, data: subdata });
//               });
//               tooltipText = 'lauréat.e.s IUF en 2019';
//             }
//           } else if (component.type === 'map') {
//             res.data.results.forEach((e) => {
//               try {
//                 let geoElement = {};
//                 let infos = [];
//                 let ed = [];
//                 try {
//                   ed = e.value.affiliations.filter(item => item.nature === 'Ecole doctorale');
//                 } catch (error) {
//                   ed = [];
//                 }
//                 if (e.value.address !== undefined) {
//                   geoElement = e.value;
//                   infos = [getSelectKey(geoElement, 'label', this.props.language, 'default')];
//                 } else if (ed.length > 0) {
//                   geoElement = ed[0];
//                   infos = ['ED : '.concat(getSelectKey(geoElement, 'label', this.props.language, 'default')), 'Thèse : '.concat(e.value.title.default)];
//                 }
//
//                 const dataElement = {
//                   id: e.id,
//                   position: [geoElement.address[0].gps.lat, geoElement.address[0].gps.lon],
//                   infos,
//                 };
//                 data.push(dataElement);
//               } catch (error) {
//                 // eslint-disable-no-empty
//               }
//             });
//           } else if (component.type === 'packedbubble' && component.dataType === 'these') {
//             // eslint-disable-next-line
//             const deweydata = require('./Focus-data/dewey.json');
//             const domainsCount = {};
//             res.data.facets[0].entries.forEach((e) => {
//               let discipline = 'exclude';
//               let subDiscipline = 'exclude';
//               let subDisciplineCount = 0;
//               const code = e.value;
//               const label = deweydata[code] ? deweydata[code].fr : 'exclude';
//               if (code.indexOf('00') !== -1) {
//                 discipline = label.split('(')[0];
//               } else {
//                 subDiscipline = label.split('(')[0];
//                 discipline = deweydata[code.substring(0, 1).concat('00')].fr.split('(')[0];
//                 subDisciplineCount = e.count;
//               }
//
//               if (discipline !== 'exclude') {
//                 if (domainsCount[discipline] === undefined) {
//                   domainsCount[discipline] = { TOTALCount: 0 };
//                 }
//                 if (subDiscipline !== 'exclude') {
//                   if (domainsCount[discipline][subDiscipline] === undefined) {
//                     domainsCount[discipline][subDiscipline] = { count: subDisciplineCount };
//                   }
//                   domainsCount[discipline].TOTALCount += subDisciplineCount;
//                 }
//               }
//             });
//
//             Object.keys(domainsCount).forEach((discipline) => {
//               const subdata = [];
//               Object.keys(domainsCount[discipline]).forEach((subdiscipline) => {
//                 if (subdiscipline !== 'TOTALCount' && subdiscipline !== 'discipline') {
//                   const subCount = domainsCount[discipline][subdiscipline].count;
//                   if (subCount > 4) {
//                     subdata.push({ name: subdiscipline, value: subCount });
//                   }
//                 }
//               });
//               data.push({ name: discipline, data: subdata, total: domainsCount[discipline].TOTALCount });
//             });
//             data = data.sort((a, b) => b.total - a.total).slice(0, 9);
//             tooltipText = 'thèses soutenues en 2018';
//           } else if (component.type === 'wordcloud') {
//             const dataEn = res.data.facets.find(item => item.id === 'domains_label_fr') || { entries: [] };
//             const dataFr = res.data.facets.find(item => item.id === 'domains_label_en') || { entries: [] };
//             data = { entries: dataEn.entries.concat(dataFr.entries) };
//           } else if (component.type === 'bar') {
//             data = res.data.facets[0];
//           }
//           const text = (component.href) ? 'Explorer dans ScanR' : null;
//           const textExt = (component.hrefExt) ? 'Explorer le jeu opendata' : null;
//           componentsData.push({
//             data,
//             tooltipText,
//             position,
//             type: component.type,
//             buttonText: text,
//             buttonTextExt: textExt,
//             href: component.href,
//             hrefExt: component.hrefExt,
//             title: component.title,
//             subtitle: component.subtitle,
//             label: component.label,
//             style: { height: '60vh' },
//           });
//           componentsData = componentsData.sort((a, b) => a.position - b.position);
//           this.setState({ cData: componentsData });
//         })
//         .catch(() => {
//           this.setState({ error: true });
//         });
//     });
//   }
//
//   render() {
//     const pageTitle = 'Scanr | Focus | '.concat(params.title);
//     const pageDescription = "ScanR est un outil d'aide à l'exploration, au suivi et à la caractérisation des activités de recherche et d'innovation des acteurs français (publics et privés) de la recherche";
//     const pageImage = '../Shared/svg/logo-scanr-blue.svg';
//     const exporting = true;
//     const href1 = './';
//     const href2 = './focus';
//     const href3 = './focus/'.concat(this.props.match.params.id);
//     const TextComponent = () => (
//       <div>
//         <p className={`${classes.Title}`}>
//           {params.title}
//         </p>
//         <p className={`${classes.Text}`}>
//           {params.text}
//         </p>
//         <div className="container">
//           <div className="row">
//             <p className={`col-md-12 ${classes.Subtext}`}>
//               {params.subtext}
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//     return (
//       <div className={`container-fluid ${classes.HomePage}`} style={{ backgroundColor: '#EBEEF0' }}>
//         <Header
//           language={this.props.language}
//           switchLanguage={this.props.switchLanguage}
//         />
//         <HeaderTitle
//           language={this.props.language}
//           labelkey="focus"
//           url1="/"
//           url2="/focus"
//         />
//         <MetaTags>
//           <title>{pageTitle}</title>
//           <meta id="meta-description" name="description" content={pageDescription} />
//           <meta id="og-title" property="og:title" content={pageTitle} />
//           <meta id="og-image" property="og:image" content={pageImage} />
//           <meta name="twitter:card" content="summary" />
//           <meta name="twitter:title" content={pageTitle} />
//           <meta name="twitter:description" content={pageDescription} />
//           <meta name="twitter:image" content={pageImage} />
//           <ol itemScope itemType="http://schema.org/BreadcrumbList">
//             <li
//               itemProp="itemListElement"
//               itemScope
//               itemType="http://schema.org/ListItem"
//             >
//               <a itemProp="item" href={href1}>
//                 {/* eslint-disable-next-line */}
//                <span itemProp="name">ScanR</span></a>
//               <meta itemProp="position" content="1" />
//             </li>
//             <li
//               itemProp="itemListElement"
//               itemScope
//               itemType="http://schema.org/ListItem"
//             >
//               <a itemProp="item" href={href2}>
//                 {/* eslint-disable-next-line */}
//                <span itemProp="name">Focus</span></a>
//               <meta itemProp="position" content="2" />
//             </li>
//             <li
//               itemProp="itemListElement"
//               itemScope
//               itemType="http://schema.org/ListItem"
//             >
//               <a itemProp="item" href={href3}>
//                 {/* eslint-disable-next-line */}
//                <span itemProp="name">{params.title}</span></a>
//               <meta itemProp="position" content="3" />
//             </li>
//           </ol>
//         </MetaTags>
//
//         {/* <LastFocus language={props.language} /> */}
//
//         {/* } <DiscoverDataEsr language={props.language} /> */}
//         <div className="container">
//           <div className="row" key="text">
//             <div className="col-lg-12">
//               {this.state.error ? null : <TextComponent />}
//             </div>
//           </div>
//           {
//             this.state.cData.map(component => (
//               <div className="row" key={component.label}>
//                 <div className="col-lg-12">
//                   <GraphComponent
//                     title={component.title}
//                     subtitle={component.subtitle}
//                     type={component.type}
//                     data={component.data}
//                     tooltipText={component.tooltipText}
//                     style={component.style}
//                     exporting={exporting}
//                     href={component.href}
//                     hrefExt={component.hrefExt}
//                     buttonText={component.buttonText}
//                     buttonTextExt={component.buttonTextExt}
//                     language={this.props.language}
//                   />
//                 </div>
//               </div>
//             ))
//           }
//         </div>
//
//         <LastFocus />
//
//         <Footer language={this.props.language} />
//       </div>
//     );
//   }
// }
//
//
// FocusList.propTypes = {
//   match: PropTypes.string.isRequired,
//   language: PropTypes.string.isRequired,
//   switchLanguage: PropTypes.func.isRequired,
// };
//
//
