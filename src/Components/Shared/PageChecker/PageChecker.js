import React from 'react';
import Errors from '../Errors/Errors';

export default function PageChecker({
  children, id, type, config,
}) {
  if (config[type].indexOf(id) !== -1) {
    return <Errors error={404} />;
  }
  return children;
}
