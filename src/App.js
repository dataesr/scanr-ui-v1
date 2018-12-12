import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

/* Composants */
import HomePage from './Components/Home-page/Home-page';
import SearchPage from './Components/Search-page/Search-page';


const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={HomePage} />
      <Route path="/search" component={SearchPage} />
    </div>
  </Router>
);

export default App;
