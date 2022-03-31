/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';
import classes from './GraphCard.scss';
import variablePieCss from './variablePie.scss';
import HighChartsVariablepie from '../../Shared/GraphComponents/Graphs/HighChartsVariablepie';
import GraphTitles from '../../Shared/GraphComponents/Graphs/GraphTitles';
import Loader from '../../Shared/LoadingSpinners/RouterSpinner';

import styles from '../../../style.scss';

// Traductions
import messagesFr from '../translations/fr.json';
import messagesEn from '../translations/en.json';

const msg = { fr: messagesFr, en: messagesEn };

const GRAPH_SLICES = 20;
const SELECT_RANDOM_ID_AMONG_TOP = 20;

const VariablePie = ({
  language,
  title,
  subtitle,
  tooltipEn,
  tooltipFr,
  lexicon,
}) => {
  const [data, setData] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [exporting] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [pilier, setPilier] = useState('all');
  const [program, setProgram] = useState('all');
  const [graphData, setGraphData] = useState([]);
  const [countryLevelPartBlackList, setCountryLevelPartBlackList] = useState([]);


  useEffect(() => {
    async function getNodes() {
      const { data: nodesFetched } = await Axios.get('https://storage.gra.cloud.ovh.net/v1/AUTH_32c5d10cb0fe4519b957064a111717e3/scanR/static/data/h2020/nodes_fr.json');
      setNodes(nodesFetched);
    }
    setIsLoading(true);
    getNodes();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (nodes.length) {
      setIsLoading(true);
      // SET INITIAL CURRENTID
      setCurrentId(nodes.slice(0, SELECT_RANDOM_ID_AMONG_TOP)[Math.floor(Math.random() * SELECT_RANDOM_ID_AMONG_TOP)].id);
      setIsLoading(false);
    }
  }, [nodes]);

  useEffect(() => {
    async function getData() {
      const { data: dataFetched } = await Axios.get(`https://storage.gra.cloud.ovh.net/v1/AUTH_32c5d10cb0fe4519b957064a111717e3/scanR/static/data/h2020/${currentId}.json`);
      setData({ ...dataFetched });
    }
    if (currentId) {
      setIsLoading(true);
      getData();
      setPilier('all');
      setProgram('all');
      setIsLoading(false);
    }
  }, [currentId]);

  useEffect(() => {
    if (data) {
      const currentPilier = data[pilier] ?? {};
      const currentProgram = currentPilier[program] ?? Object.values(currentPilier)[0];
      const currentProgramCopy = JSON.parse(JSON.stringify(currentProgram)); // deep copy

      const filteredData = currentProgramCopy.filter(el => !countryLevelPartBlackList.includes(el.country_level_part));

      setGraphData(filteredData.sort((a, b) => a.y < b.y).slice(0, GRAPH_SLICES));
    } else {
      setGraphData([]);
    }
  }, [data, pilier, program, countryLevelPartBlackList]);


  const getCountryLevelParts = (pil, prog) => {
    if (!data || !data[pil] || !data[pil][prog]) return [];

    const newSet = new Set(data[pil][prog].map(el => (el.country_level_part)));
    return [...newSet];
  };

  const updateCountryLevelPartBlackList = (el) => {
    const oldCountryLevelPart = [...countryLevelPartBlackList];
    const index = oldCountryLevelPart.indexOf(el);
    if (index !== -1) {
      oldCountryLevelPart.splice(index, 1);
      setCountryLevelPartBlackList(oldCountryLevelPart);
    } else {
      oldCountryLevelPart.push(el);
      setCountryLevelPartBlackList(oldCountryLevelPart);
    }
  };

  const VariablePieFilters = () => {
    const pilersOptions = data ? Object.keys(data) : [];
    const programOptions = data ? Object.keys(data[pilier]) : [];
    const pilersSelectorOptions = pilersOptions.map(el => (
      <option key={el} value={el}>
        {(el === 'all') ? msg[language]['Focus.piliers.all'] : el}
      </option>
    ));

    const programsSelectorOptions = programOptions.map(el => (
      <option key={el} value={el}>
        {(el === 'all') ? msg[language]['Focus.programs.all'] : el}
      </option>
    ));

    const firstProgram = (data) ? Object.keys(data[pilier])[0] : [];

    const countryLevelPartCheckbox = getCountryLevelParts(pilier, (!program) ? firstProgram : program)
      .map(el => (
        <div key={el}>
          <input
            type="checkbox"
            value={el}
            id={el}
            name={el}
            checked={!countryLevelPartBlackList.includes(el)}
            onChange={e => updateCountryLevelPartBlackList(e.target.value)}
          />
          <label htmlFor={el} className="ml-2">{el}</label>
        </div>
      ));

    const onPilierChangeHandler = (e) => {
      setPilier(e.target.value);
      setProgram(Object.keys(data[e.target.value])[0]);
    };

    return (
      <>
        <p className="pt-3">
          <FormattedHTMLMessage id="Focus.piliers.title" />
        </p>
        <select
          className="form-control"
          onChange={onPilierChangeHandler}
          value={pilier}
        >
          {pilersSelectorOptions}
        </select>

        <p className="mt-3">
          <FormattedHTMLMessage id="Focus.programs.title" />
        </p>
        <select
          className="form-control"
          onChange={e => setProgram(e.target.value)}
          value={program}
        >
          {programsSelectorOptions}
        </select>
        <p className="mt-3">
          {countryLevelPartCheckbox}
        </p>
      </>
    );
  };

  const uniqueProjects = [];
  if (data && data[pilier] && data[pilier][program]) {
    data[pilier][program].forEach((el) => {
      el.projects.forEach((idProject) => {
        if (uniqueProjects.indexOf(idProject) === -1) {
          uniqueProjects.push(idProject);
        }
      });
    });
  }

  return (
    <div>
      <Row>
        <Col className={variablePieCss.info}>
          <p>
            <FormattedHTMLMessage id="Focus.intro.1" />
          </p>
          <p>
            <FormattedHTMLMessage id="Focus.intro.2" />
          </p>
          <select
            className="form-control mb-2"
            onChange={e => setCurrentId(e.target.value)}
            defaultValue={null}
          >
            { !currentId && <option value={null}>Sélectionner une entité française pour voir ses principaux partenaires</option> }
            {
              nodes && nodes.map((el) => {
                let ret = <option key={el.id} value={el.id}>{el.full_name}</option>;
                if (el.id === currentId) {
                  ret = <option key={el.id} value={el.id} selected>{el.full_name}</option>;
                }
                return ret;
              })
            }
          </select>
        </Col>
      </Row>

      <Row className={classes.graphCard}>
        <Col md={3} className={variablePieCss.filters}>
          <VariablePieFilters />
        </Col>
        <Col>
          {
            (!isLoading && graphData.length > 0) ? (
              <>
                <GraphTitles
                  lexicon={lexicon}
                  language={language}
                  // title={`${subtitle} ${nodes.filter(el => el.id === currentId)[0].full_name}`}
                  title={`${subtitle}${nodes.filter(el => el.id === currentId)[0].full_name} - ${uniqueProjects.length} projets collaboratifs`}
                  subtitle={title}
                />
                <HighChartsVariablepie
                  data={graphData}
                  exporting={exporting}
                  filename={nodes.filter(el => el.id === currentId)[0].full_name || ''}
                  language={language}
                  tooltipText={language === 'fr' ? tooltipFr : tooltipEn}
                />
              </>
            ) : <Loader style={{ height: '500px', width: 'auto' }} color={styles.projectColor} />
          }
        </Col>
      </Row>

    </div>
  );
};

VariablePie.propTypes = {
  language: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  tooltipEn: PropTypes.string.isRequired,
  tooltipFr: PropTypes.string.isRequired,
  lexicon: PropTypes.string,
};

export default VariablePie;
