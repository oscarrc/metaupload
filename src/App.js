import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.scss';

const Home = lazy(() => import('./views/Home'));
const Download = lazy(() => import('./views/Download'));

const App = () => {
  return (
    <Router>
      <Suspense>
        <Routes>        
          <Route path="/" component={Home} />
          <Route path="/download/:file" component={Download} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App;
