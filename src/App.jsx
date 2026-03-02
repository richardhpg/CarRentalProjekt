import { useState } from 'react'
import AdvertisementCard from './components/AdvertisementCard'
import Advertisements from './components/Advertisements'
import DefaultProfile from './components/DefaultProfile';
import LessorProfile from './components/LessorProfile';
import Main from './components/Main';
import Menu from './components/Menu';
import RegLogPage from './components/RegLogPage';
import Search from './components/Search';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';


function App() {


  return (
    <>
    <AuthProvider>
       <Router>
      <Menu/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/kereses' element={<Search/>}/>
        <Route path='/login' element={<RegLogPage/>}/>
      </Routes>
    </Router>
    </AuthProvider>
    </>
  )
}

export default App
