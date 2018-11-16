import moment from 'moment';
import {
  STATUS_ARRAY,
  ERREUR_NULL,
  ERREUR_STATUT,
  ERREUR_DATE,
  STATUS_RULE,
  DATE_RULE,
  NO_NULL_RULE,
} from '../config/config';

function mainValidation(content) {
  const mainItem = content.filter(item => item.status === 'main');
  if (mainItem.length > 1) {
    return false;
  }
  const emptyStatus = content.find(item => !STATUS_ARRAY.includes(item.status));
  if (emptyStatus) {
    return false;
  }
  return true;
}

function nullValidation(content, fieldDescription) {
  return content.reduce((tempNullValidation, dataRow) => (
    Boolean(dataRow[fieldDescription.key]) && tempNullValidation), true);
}

function dateValidation(content, fieldDescription) {
  return content.reduce((tempNullValidation, dataRow) => (
    dataRow[fieldDescription.key] && moment(dataRow[fieldDescription.key]).isValid() && tempNullValidation
  ), true);
}

const RULES = [
  {
    error: ERREUR_STATUT,
    ruleName: STATUS_RULE,
    function: mainValidation,
  },
  {
    error: ERREUR_NULL,
    ruleName: NO_NULL_RULE,
    function: nullValidation,
  },
  {
    error: ERREUR_DATE,
    ruleName: DATE_RULE,
    function: dateValidation,
  },
];

export default function validate(data, description) {
  const descriptionWithRules = description.filter(
    fieldDescription => fieldDescription.isShown && fieldDescription.rules,
  );
  /* eslint-disable */
  for (const fieldDescription of descriptionWithRules) {
    for (const rule of RULES) {
      if (fieldDescription.rules.includes(rule.ruleName)) {
        const ruleValidation = rule.function(data, fieldDescription);
        if (!ruleValidation) {
          return rule.error;
        }
      }
    }
  }
  /* eslint-enable */
  return true;
}
