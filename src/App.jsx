import { useState } from 'react'
import Navbar from './Navbar'
import Home from './Home';
import CreatePerson from './CreatePerson';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import NotFound from './NotFound';


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
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  )
}

export default App
