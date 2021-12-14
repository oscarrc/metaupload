import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from './hooks/useThemeContext';
import { PWAProvider } from './hooks/usePWA';
import Header from './components/globals/Header';
import Footer from './components/globals/Footer';

import './App.css';

import Loading from './views/Loading';

const Home = lazy(() => import('./views/Home'));
const Download = lazy(() => import('./views/Download'));
const Manage = lazy(() => import('./views/Manage'));
const Privacy = lazy(() => import('./views/Privacy'));
const Terms = lazy(() => import('./views/Terms'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <ThemeProvider>
          <PWAProvider>
            <Header />
            <main>
              <Routes>        
                <Route exact path="/" element={<Home />} />
                <Route path="/download/:file" element={<Download />} />
                <Route path="/manage" element={<Manage />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
              </Routes>
            </main>
            <Footer />
          </PWAProvider>
        </ThemeProvider>
      </Suspense>
    </Router>
  )
}

export default App;
