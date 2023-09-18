import logo from './logo.svg';
import './App.css';
import Login from '../src/components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/Signup';
import Location from './components/Location';
import Front from './components/Front';
import Modal from './components/Modal';
import Profile from './components/Profile';
import Bank from './components/Bank';
import Side from './components/Side'
import  Pdetail from './components/Pdetail'
import Bankdetail from './components/Bankdetail'
import Punchin from './components/Punchin'
import Attendance from './components/Attendance'
import History from './components/History'
import Document from './components/Document'


function App() {
  return (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/location" element={<Location/>} />
        <Route path="/front" element={<Front />} />
        <Route path="/modal" element={<Modal />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bank" element={<Bank />} />
        <Route path="/side" element={<Side/>} />
        <Route path="/pdetail" element={<Pdetail/>} />
        <Route path="/bankdetail" element={<Bankdetail/>} />
        <Route path="/punchin" element={<Punchin/>} />
        <Route path="/attendance" element={<Attendance/>} />
        <Route path="/history" element={<History/>} />
        <Route path="/document" element={<Document/>} />
        
                
      </Routes>
  </BrowserRouter>
  );
}

export default App;
