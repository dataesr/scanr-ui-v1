import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalContextProvider } from './GlobalContext';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <GlobalContextProvider><App /></GlobalContextProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
