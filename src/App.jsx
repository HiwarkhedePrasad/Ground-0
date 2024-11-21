import Navbar from "./components/navbar";
import { SearchByLocation } from "./components/SearchByLocation";
import Home from "./components/home";
function App() {
  return (
    <Router>
      
      <Navbar/>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search-location" element={<SearchByLocation />} />
            {/* <Route path="/profile/:userId" element={<Profile />} /> */}
          </Routes>
        </main>
   
    </Router>
  );
}
export default App;