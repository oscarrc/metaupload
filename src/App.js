import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from './hooks/useThemeContext';
import Header from './components/globals/Header';
import Footer from './components/globals/Footer';

import './App.css';

import Loading from './views/Loading';

const Home = lazy(() => import('./views/Home'));
const Download = lazy(() => import('./views/Download'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <ThemeProvider>
          <Header />
          <main>
            <Routes>        
              <Route exact path="/" element={<Home />} />
              <Route path="/download/:cid" element={<Download />} />
            </Routes>
          </main>
          <Footer />
        </ThemeProvider>
      </Suspense>
    </Router>
  )
}

export default App;
