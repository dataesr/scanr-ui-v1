import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';

const App = () => (
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
);

export default App;
