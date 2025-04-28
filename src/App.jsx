import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/navbar";
import { SearchByLocation } from "./components/SearchByLocation";
import Home from "./components/home";
import Profile from "./components/Profile";  // Make sure to import your Profile component

function App() {
  return (
    <Router>
      <Navbar />

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-location" element={<SearchByLocation />} />
          <Route path="/profile/:userId" element={<Profile />} /> 
        </Routes>
      </main>
    </Router>
  );
}

export default App;
