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

const SLICE_NUMBER = 2;

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


  useEffect(() => {
    async function getNodes() {
      const { data: nodesFetched } = await Axios.get('https://storage.gra.cloud.ovh.net/v1/AUTH_32c5d10cb0fe4519b957064a111717e3/scanR/static/data/h2020/nodes_fr.json');
      setNodes(nodesFetched);
    }
    setIsLoading(true);
    getNodes();
    // SET INITIAL CURRENTID
    // setCurrentId('m7K6T');
    setIsLoading(false);
  }, []);

  useEffect(() => {
    async function getData() {
      const { data: dataFetched } = await Axios.get(`https://storage.gra.cloud.ovh.net/v1/AUTH_32c5d10cb0fe4519b957064a111717e3/scanR/static/data/h2020/${currentId}.json`);
      setData({ ...dataFetched });
    }
    if (currentId) {
      setIsLoading(true);
      getData();
      setIsLoading(false);
    }
  }, [currentId]);

  useEffect(() => {
    if (data) {
      const currentPilier = data[pilier] ?? {};
      const currentProgram = currentPilier[program] ?? Object.values(currentPilier)[0];
      const currentProgramCopy = JSON.parse(JSON.stringify(currentProgram));
      setGraphData(currentProgramCopy.sort((a, b) => a.y < b.y).slice(0, SLICE_NUMBER));
    } else {
      setGraphData([]);
    }
  }, [data, pilier, program]);

  const renderFilters = () => {
    const pilersOptions = data ? Object.keys(data) : [];
    const programOptions = data ? Object.keys(data[pilier]) : [];
    const pilersSelectorOptions = pilersOptions.map(el => (
      <option key={el} value={el}>
        {(el === 'all') ? msg[language]['Focus.piliers.all'] : el}
      </option>
    ));

    const programsSelectorOptions = programOptions.map(el => (
      <option key={el} value={el}>
        {(el === 'all') ? msg[language]['Focus.piliers.all'] : el}
      </option>
    ));

    return (
      <>
        <p className="pt-3">
          <FormattedHTMLMessage id="Focus.piliers.title" />
        </p>
        <select
          className="form-control"
          onChange={e => setPilier(e.target.value)}
        >
          {pilersSelectorOptions}
        </select>

        <p className="mt-3">
          <FormattedHTMLMessage id="Focus.programs.title" />
        </p>
        <select
          className="form-control"
          onChange={e => setProgram(e.target.value)}
        >
          {programsSelectorOptions}
        </select>

      </>
    );
  };
  return (
    <div>
      <Row>
        <Col className={variablePieCss.info}>
          <p>
            Au premier chargement scanR vous propose de visualier aléatoirement le réseau de coopération via
            {' '}
            <span title="Horizon 2020">H2020</span>
            {' '}
            des 20 plus importants acteurs, publics ou privés français de ce programme.
          </p>
          <p>
            Utilisez le menu déroulant ci-dessous pour visualiser le réseau de collaboration au sein d&lsquo;H2020 de l&lsquo;ensemble des acteurs français actifs dans ce programme.
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
          {renderFilters()}
        </Col>
        <Col>
          {
            (!isLoading && graphData.length > 0) ? (
              <>
                <GraphTitles
                  lexicon={lexicon}
                  language={language}
                  title={`${subtitle} ${nodes.filter(el => el.id === currentId)[0].full_name}`}
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
