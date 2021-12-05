import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Header from './components/globals/Header';
import Footer from './components/globals/Footer';

const Home = lazy(() => import('./views/Home'));
const Download = lazy(() => import('./views/Download'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<article aria-busy="true"></article>}>
        <Header />
        <main>
          <Routes>        
            <Route exact path="/" element={<Home />} />
            <Route path="/download/:file" element={<Download />} />
          </Routes>
        </main>
        <Footer />
      </Suspense>
    </Router>
  )
}

export default App;
