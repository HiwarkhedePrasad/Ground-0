import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePgae"; // Make sure the file name is correct
import SearchBox from "./modules/searchbox";
import ProfilePage from "./pages/profilepage";
import Navbar from "./modules/Navbar";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchBox />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
