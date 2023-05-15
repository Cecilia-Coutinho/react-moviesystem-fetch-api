import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home';
import CreatePerson from './components/CreatePerson';
import PersonDetails from './components/PersonDetails';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import NotFound from './components/NotFound';
import AllMovies from './components/AllMovies';

function App() {

  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />

        <div className='content'>
          {/* switch component allows only one route at a time*/}
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route path='/createperson' element={<CreatePerson />}></Route>
            <Route path='/person/:id' element={<PersonDetails />}></Route>
            <Route path='/allmovies/person/:id' element={<AllMovies />}></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  )
}

export default App
