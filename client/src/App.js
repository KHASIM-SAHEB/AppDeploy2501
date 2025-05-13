import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Tasks from './components/Tasks';
// import Signout from './components/Signout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path ="/" element={<Login/>}></Route>
        <Route path = "/signup" element={<Signup/>}></Route>
        <Route path = "/dashboard" element={<Dashboard/>}></Route>
        <Route path ="/tasks" element={<Tasks/>}></Route>
        {/* <Route path = "/" element ={<Signout/>}></Route> */}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
