import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Cursor from './components/Cursor';

function App() {
  return (
    <Router>
      <NavBar />
      <Cursor /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact-me" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
