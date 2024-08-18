import NavBar from "./Components/NavBar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./Components/Pages/Home"
import Game from "./Components/Pages/Game"
import InfoProvider from "./Components/InfoProvider"
import Footer from "./Components/Footer"


function App() {

  return (
    <>
      <InfoProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/game" exact element={<Game />} />
          </Routes>
          <Footer />
        </Router>
      </InfoProvider>
    </>
  )
}

export default App
