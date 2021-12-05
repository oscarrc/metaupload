import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Header from './components/globals/Header';
import Footer from './components/globals/Footer';
import { ThemeProvider } from './contexts/themeContext';

const Home = lazy(() => import('./views/Home'));
const Download = lazy(() => import('./views/Download'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<article aria-busy="true"></article>}>
        <ThemeProvider>
          <Header />
          <main>
            <Routes>        
              <Route exact path="/" element={<Home />} />
              <Route path="/download/:file" element={<Download />} />
            </Routes>
          </main>
          <Footer />
        </ThemeProvider>
      </Suspense>
    </Router>
  )
}

export default App;
