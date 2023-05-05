import Navbar from './Navbar'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {

  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />

      </div>
    </BrowserRouter>
  )
}

export default App
