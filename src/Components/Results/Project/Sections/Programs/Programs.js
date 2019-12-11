import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';

import EmptySection from '../../../Shared/EmptySection/EmptySection';
import SimpleCard from '../../../../Shared/Ui/SimpleCard/SimpleCard';

import classes from './Programs.scss';
/**
 * Programs
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

const Programs = (props) => {
  if (!props.data) return <EmptySection />;
  let priorities = '';
  if (props.data.domains) {
    props.data.domains.filter(dom => (
      dom.type === 'priorities'
    )).forEach((prio) => {
      if (priorities && prio.label.default) {
        priorities += ` / ${prio.label.default}`;
      }
      priorities += (prio.label.default);
    });
  }
  const pretopics = (props.data.domains)
    ? props.data.domains.filter(dom => (
      dom.type === 'topic'
    ))
    : [];
  const topics = (pretopics.length > 0) ? pretopics[0].label.default : null;
  const call = (props.data.call && props.data.call.label) ? props.data.call.label : { label: null };
  if (!topics && !priorities && !call.label) return <EmptySection />;
  return (
    <div className="row">
      <div className={`col-6 ${classes.CardContainer}`}>
        <SimpleCard
          language={props.language}
          logo="fas fa-calendar-day"
          title={<FormattedHTMLMessage id="Project.Programs.call" value={{ year: props.data.year }} />}
          label={
            (props.data.call)
              ? props.data.call.label
              : null
          }
        />
      </div>
      <div className={`col-6 ${classes.CardContainer}`}>
        <SimpleCard
          language={props.language}
          logo="fas fa-calendar-day"
          title={<FormattedHTMLMessage id="Project.Programs.action" />}
          label={
            (props.data.action && props.data.action.label)
              ? props.data.action.label.default
              : null
          }
        />
      </div>
      <div className={`col-6 ${classes.CardContainer}`}>
        <SimpleCard
          language={props.language}
          logo="fas fa-calendar-day"
          title={<FormattedHTMLMessage id="Project.Programs.topic" />}
          label={topics}
        />
      </div>
      <div className={`col-6 ${classes.CardContainer}`}>
        <SimpleCard
          language={props.language}
          logo="fas fa-calendar-day"
          title={<FormattedHTMLMessage id="Project.Programs.priorities" />}
          label={priorities}
        />
      </div>
    </div>
  );
};

export default Programs;

Programs.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
};

// id: PropTypes.string.isRequired,
