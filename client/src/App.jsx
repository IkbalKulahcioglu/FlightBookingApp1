
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import FlightSearch from './components/FlightSearch';
import Home from './pages/Home';
import MyFlights from './pages/MyFlights';


function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <FlightSearch/>
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/my-flights" element={<MyFlights />} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
