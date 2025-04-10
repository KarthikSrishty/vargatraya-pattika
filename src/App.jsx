import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Addform from './components/Addform';
import Print from './components/Print';
import Login from './components/Login';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={'/'} element={<Login/>}/>
          <Route path={'/home'} element={<Landing/>}/>
          <Route path={'/addform/:userid'} element={<Addform/>}/>
          <Route path={'/print/:userid'} element={<Print/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
