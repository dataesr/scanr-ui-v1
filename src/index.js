import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalContextProvider } from './GlobalContext';
import App from './App';
import ErrorBoundary from './Components/Shared/ErrorBoundary/ErrorBoundary';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <GlobalContextProvider>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </GlobalContextProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
