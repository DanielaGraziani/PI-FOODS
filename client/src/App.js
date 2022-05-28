import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Details from './components/Details';
import CreateForm from './components/CreateForm';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
  <Routes>
    <Route path="/" element={<LandingPage/>}/>
    <Route path="/recipes" element={<Home/>}/>
    <Route path="/recipes/:id" element={<Details/>}/>
    <Route path="/recipe" element={<CreateForm/>}/>
  </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
