import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalContextProvider } from './GlobalContext';
import App from './App';
import ErrorBoundary from './Components/Shared/ErrorBoundary/ErrorBoundary';

import { unregister } from './registerServiceWorker';

ReactDOM.render(
  <GlobalContextProvider>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </GlobalContextProvider>,
  document.getElementById('root'),
);

unregister();
